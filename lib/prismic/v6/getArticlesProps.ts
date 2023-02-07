import { BuildQueryURLArgs, Ordering, predicate } from '@prismicio/client'
import type {
  DateField,
  FilledLinkToDocumentField,
  GroupField,
  ImageField,
  PrismicDocument,
  Query,
  TitleField,
} from '@prismicio/types'
import fetch from 'cross-fetch'
import { chunk, flowRight, map, reverse, size, sortBy, uniqBy } from 'lodash/fp'
import pMapSeries from 'p-map-series'
import type { Nullable } from 'tsdef'
import { getCached } from '../../getWithCache'
import { parseDate, parseLocalDate } from '../../parseDate'
import { makePath, translite } from '../makePath'
import { parseImageUrl } from '../parseImageUrl'
import { ClientKeys, CLIENTS, TEXT_API } from './constants'
import { getAuthorBySlug } from './getAuthorProps'
import { getRichText } from './getRichText'
import { getCategoryTagBySlug, getTimeTagBySlug } from './getTagsProps'
import type { Article, ColorPalette } from './types'

/**
 * getArticlesProps
 * list of articles
 * */
export async function getArticlesProps(
  client: ClientKeys,
  options?: Options,
): Promise<ArticlesListProps> {
  const articles = await CLIENTS[client]?.getByType<PrismicArticle>(
    'articles',
    getOptions(options),
  )

  return parseArticles(articles, client)
}

/**
 * getArticlesByTagProps
 * list of articles by tag
 * */
export async function getArticlesByTagProps(
  client: ClientKeys,
  tag: string,
  options?: Options,
): Promise<ArticlesListProps> {
  const articles = await CLIENTS[client]?.getByTag<PrismicArticle>(
    tag,
    getOptions(options),
  )

  return parseArticles(articles, client)
}

/**
 * getArticlesByTagProps
 * list of articles by author
 * */
export async function getArticlesByAuthorProps(
  client: ClientKeys,
  author: string,
  options?: Options,
): Promise<ArticlesListProps> {
  const articles = await CLIENTS[client]?.getByType<PrismicArticle>(
    'articles',
    {
      predicates: [predicate.any('my.articles.authors.author', [author || ''])],
      ...getOptions(options),
    },
  )

  return parseArticles(articles, client)
}

type PrismicArticle = PrismicDocument<{
  title: TitleField
  image: ImageField
  releasedate: DateField
  authors: GroupField<{
    author: FilledLinkToDocumentField<
      'authors',
      'filled',
      { name: Nullable<string> }
    >
  }>
}>

export type ArticlesListProps = {
  page: number
  totalPages: number
  total: number
  items: Article[]
} | null

const graphQuery = /* GraphQL */ `
  {
    articles {
      title
      image
      releasedate
      authors {
        author {
          name
        }
      }
    }
  }
`

interface Options {
  pageSize?: number | undefined
  page?: number | undefined
  ordering?: Ordering['direction']
}

function getOptions(options: Options | undefined): Partial<BuildQueryURLArgs> {
  return {
    orderings: {
      field: 'document.first_publication_date',
      direction: options?.ordering || 'desc',
    },
    fetchLinks: 'author.name',
    lang: 'ru',
    graphQuery,
    pageSize: options?.pageSize || 10,
    page: options?.page || 1,
  }
}

async function parseArticles(
  articles: Query<PrismicArticle>,
  client: ClientKeys,
): Promise<ArticlesListProps> {
  if (!articles) return null

  let palettes: Array<Nullable<string>> = []
  try {
    const promises = (articles.results || []).map(async ({ data }) => {
      if (data?.image?.url) {
        const palette: ColorPalette = await fetch(
          `${parseImageUrl(data?.image.url)}?palette=json&colors=1`,
        ).then((res) => res.json())
        return palette?.colors?.[0]?.hex || null
      }
      return null
    })

    palettes = (await Promise.all(promises)) as Array<Nullable<string>>
  } catch {}

  return {
    page: articles.page,
    totalPages: articles.total_pages,
    total: articles.total_results_size,
    items: articles.results.map(
      ({ id, data, first_publication_date, tags }, idx) => {
        const title = getRichText(data.title, 'text')?.text || null
        return {
          id,
          title,
          image: data.image?.url ? parseImageUrl(data.image.url) : null,
          palette: palettes[idx] || null,
          date: parseLocalDate(
            parseDate(data.releasedate || first_publication_date),
          ),
          publicationDate: first_publication_date || null,
          tags: tags || [],
          authors: (data.authors || [])
            .map(({ author }) => author.data?.name || '')
            .filter(Boolean) as string[],
          slug:
            title && first_publication_date
              ? makePath(title, first_publication_date)
              : null,
          client,
        }
      },
    ),
  }
}

export const URLS = {
  vtoraya: 'publikacii',
  krasnoeZnamya: 'krasnoe-znamya',
  veschdok: 'veschdok',
  rodina: 'rodina',
  pervaya: 'pervaya',
} as const

export async function getAllArticles() {
  const allArticles = await Promise.all(
    TEXT_API.map((api) =>
      CLIENTS[api].getAllByType<PrismicArticle>('articles', {
        graphQuery: /* GraphQL */ `
          {
            articles {
              title
            }
          }
        `.trim(),
      }),
    ),
  )

  return allArticles.reduce<string[]>((res, articles, idx) => {
    articles.forEach((item) => {
      const title = getRichText(item.data.title, 'text')?.text || null
      if (title) {
        res.push(
          `/${URLS[TEXT_API[idx]]}/${makePath(
            title,
            item.first_publication_date,
          )}`,
        )
      }
    })
    return res
  }, [])
}

export const getCachedArticlesByTagProps = (
  client: ClientKeys,
  tag: string = '',
  { page, pageSize, ordering }: Options = {},
) =>
  getCached(
    () =>
      getArticlesByTagProps(client, tag, {
        pageSize,
        page,
        ordering,
      }),
    `/${tag.match(/([а-яА-Я]+)\s(\d{4})/) ? 'arhiv' : 'rubriki'}/${translite(
      tag,
    )}/${client}/${page}`,
    'articles',
  )()

export const getCachesArticlesByTagPagedProps = (
  client: ClientKeys,
  tag: string = '',
  { page, pageSize, ordering }: Options = {},
) =>
  getCached(
    () =>
      getArticlesByTagProps(client, tag, {
        pageSize,
        page,
        ordering,
      }),
    `/${tag.match(/([а-яА-Я]+)\s(\d{4})/) ? 'arhiv' : 'rubriki'}/${translite(
      tag,
    )}`,
    'pages',
  )()

export const getCachedArticlesByAuthorProps = (
  client: ClientKeys,
  author: string = '',
  { page, pageSize, ordering }: Options = {},
) =>
  getCached(
    () =>
      getArticlesByAuthorProps(client, author, {
        pageSize,
        page,
        ordering,
      }),
    `/o-nas/${translite(author)}/${client}/${page}`,
    'articles',
  )()

export const getCachedArticlesProps = (
  client: ClientKeys,
  { page, pageSize, ordering }: Options = {},
) =>
  getCached(
    () =>
      getArticlesProps(client, {
        pageSize,
        page,
        ordering,
      }),
    `/${client}/pages/${page}`,
    'articles',
  )()

export async function getArticlesByCategoryTagPagedProps(uid?: string) {
  if (!uid) return
  const category = await getCategoryTagBySlug(uid)
  const articles: Article[] = []

  await pMapSeries(
    (category?.clients || []).map((client, idx) =>
      idx === 0
        ? getArticlesByTagProps(client?.client, client.tag, {
            pageSize: 6,
            page: 1,
          })
        : getCachedArticlesByTagProps(client?.client, client.tag, {
            pageSize: 6,
            page: 1,
            ordering: 'asc',
          }),
    ),
    async (item, idx) => {
      articles.push(...(item?.items || []))
      if (item && item.totalPages > 1) {
        await pMapSeries(
          Array.from({ length: item.totalPages }, (_, i) => i + 1).map((page) =>
            category?.clients?.[idx]
              ? getCachedArticlesByTagProps(
                  category.clients[idx].client,
                  category.clients[idx].tag,
                  {
                    pageSize: 6,
                    ordering: 'asc',
                    page,
                  },
                )
              : null,
          ),
          async (res) => {
            articles.push(...(res?.items || []))
            return true
          },
        )
      }
      return true
    },
  )

  return parsePagedProps(articles)
}

export async function getArticlesByTimeTagPagedProps(uid?: string) {
  if (!uid) return
  const month = await getTimeTagBySlug(uid)
  const articles: Article[] = []

  await pMapSeries(
    (month?.clients || []).map((client, idx) =>
      idx === 0
        ? getArticlesByTagProps(client?.client, client.tag, {
            pageSize: 6,
            page: 1,
          })
        : getCachedArticlesByTagProps(client?.client, client.tag, {
            pageSize: 6,
            page: 1,
            ordering: 'asc',
          }),
    ),
    async (item, idx) => {
      articles.push(...(item?.items || []))
      if (item && item.totalPages > 1) {
        await pMapSeries(
          Array.from({ length: item.totalPages }, (_, i) => i + 1).map((page) =>
            month?.clients?.[idx]
              ? getCachedArticlesByTagProps(
                  month.clients[idx].client,
                  month.clients[idx].tag,
                  {
                    pageSize: 6,
                    ordering: 'asc',
                    page,
                  },
                )
              : null,
          ),
          async (res) => {
            articles.push(...(res?.items || []))
            return true
          },
        )
      }
      return true
    },
  )

  return parsePagedProps(articles)
}

export const getArticlesByCategoryTagPagedPropsCache = (
  uid: string | undefined,
) =>
  getCached(() => getArticlesByCategoryTagPagedProps(uid), `/rubriki/${uid}`)()

export const getArticlesByTimeTagPagedPropsCache = (uid: string | undefined) =>
  getCached(() => getArticlesByTimeTagPagedProps(uid), `/arhiv/${uid}`)()

export async function getArticlesByAuthorPagedProps(uid?: string) {
  if (!uid) return
  const author = await getAuthorBySlug(uid)
  const articles: Article[] = []

  await pMapSeries(
    (author?.clients || []).map((client, idx) =>
      idx === 0
        ? getArticlesByAuthorProps(client?.client, client.id, {
            pageSize: 6,
            page: 1,
          })
        : getCachedArticlesByAuthorProps(client?.client, client.id, {
            pageSize: 6,
            page: 1,
            ordering: 'asc',
          }),
    ),
    async (item, idx) => {
      articles.push(...(item?.items || []))
      if (item && item.totalPages > 1) {
        await pMapSeries(
          Array.from({ length: item.totalPages }, (_, i) => i + 1).map((page) =>
            author?.clients?.[idx]
              ? getCachedArticlesByAuthorProps(
                  author.clients[idx].client,
                  author.clients[idx].id,
                  {
                    pageSize: 6,
                    ordering: 'asc',
                    page,
                  },
                )
              : null,
          ),
          async (res) => {
            articles.push(...(res?.items || []))
            return true
          },
        )
      }
      return true
    },
  )

  return parsePagedProps(articles)
}

export async function getArticlesPagedProps(client: ClientKeys) {
  const articles: Article[] = []

  await pMapSeries(
    [
      client === 'vtoraya'
        ? getArticlesProps(client, {
            pageSize: 6,
            page: 1,
          })
        : getCachedArticlesProps(client, {
            pageSize: 6,
            ordering: 'asc',
            page: 1,
          }),
    ],
    async (item) => {
      articles.push(...(item?.items || []))
      if (item && item.totalPages > 1) {
        await pMapSeries(
          Array.from({ length: item.totalPages }, (_, i) => i + 1).map((page) =>
            getCachedArticlesProps(client, {
              pageSize: 6,
              ordering: 'asc',
              page,
            }),
          ),
          async (res) => {
            articles.push(...(res?.items || []))
            return true
          },
        )
      }
      return true
    },
  )

  return parsePagedProps(articles)
}

function parsePagedProps(articles: Article[]) {
  const uniqArticles = uniqBy('id', articles)

  return {
    total: size(uniqArticles),
    links: articles.reduce<string[]>((res, item) => {
      if (item.slug) res.push(item.slug)
      return res
    }, []),
    pages: flowRight(
      map((items) => ({ items })),
      chunk(6),
      reverse,
      sortBy('publicationDate'),
      uniqBy('id'),
    )(uniqArticles) as { items: Article[] }[],
  }
}
