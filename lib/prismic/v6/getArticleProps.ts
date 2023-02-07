import type {
  DateField,
  EmbedField,
  FilledLinkToDocumentField,
  FilledLinkToMediaField,
  GroupField,
  ImageField,
  KeyTextField,
  PrismicDocument,
  PrismicDocumentHeader,
  RichTextField,
  Slice,
  SliceZone,
  TitleField,
} from '@prismicio/types'
import fetch from 'cross-fetch'
import { uniqueId } from 'lodash'
import type { Nullable, PromisedType, Return } from 'tsdef'
import { parseDate, parseLocalDate } from '../../parseDate'
import { makePath } from '../makePath'
import { parseImageUrl } from '../parseImageUrl'
import { ClientKeys, CLIENTS } from './constants'
import { getRichText } from './getRichText'
import type { Article, ColorPalette } from './types'

type PrismicArticle = PrismicDocument<{
  title: TitleField
  image: ImageField
  caption: RichTextField
  releasedate?: DateField
  authors: GroupField<{
    author: FilledLinkToDocumentField<
      'authors',
      'filled',
      { name: KeyTextField }
    >
  }>
  body: SliceZone<
    | Slice<
        'lead',
        {
          text: RichTextField
        }
      >
    | Slice<
        'text',
        {
          text: RichTextField
        }
      >
    | Slice<
        'quote',
        {
          quote: RichTextField
          cite: RichTextField
        }
      >
    | Slice<
        'youtube',
        {
          youtubeid: EmbedField
          videoresource: RichTextField
        }
      >
    | Slice<
        'image',
        {
          imageimage: ImageField
          imagecaption: RichTextField
        }
      >
    | Slice<
        'medialink',
        {
          mediacover: ImageField
          mediacaption: RichTextField
          medialink: FilledLinkToMediaField
        }
      >
    | Slice<
        'reference',
        {
          referenceanchor: KeyTextField
          referencetext: RichTextField
        }
      >
    | Slice<'references_list', {}>
    | Slice<
        'slider',
        {},
        {
          sliderimage: ImageField
          slidercaptions: RichTextField
        }
      >
    | Slice<
        'list_of_articles',
        {},
        {
          articlelink: PrismicDocumentHeader &
            FilledLinkToDocumentField<
              'articles',
              'ru',
              { title: TitleField; image: ImageField; releasedate: DateField }
            >
        }
      >,
    'filled'
  >
}>

type ArticleBody = PrismicArticle['data']['body'][number][]

export async function getArticleProps(client: ClientKeys, id: string) {
  const article = await CLIENTS[client].getByID<PrismicArticle>(id, {
    graphQuery,
  })

  const data = article?.data
  const referencesList = [] as {
    id: string
    anchor: string
    text: Nullable<string>
  }[]
  const references = (data.body as ArticleBody).reduce<
    Record<number, { id: string; anchor: string; text: Nullable<string> }>
  >((res, item) => {
    if (
      item.slice_type === 'reference' &&
      item.primary.referenceanchor &&
      item.primary.referencetext
    ) {
      const reference = {
        id: uniqueId(),
        anchor: item.primary.referenceanchor,
        text: getRichText(item.primary.referencetext, 'html')?.html || null,
      }
      res[item.primary.referenceanchor] = reference
      referencesList.push(reference)
    }
    return res
  }, {})

  if (!data) return null

  const title = getRichText(data.title, 'text')?.text || null
  const body = (data.body as ArticleBody)
    .map((item) => {
      switch (item.slice_type) {
        case 'lead': {
          if (!item.primary.text) return null
          return {
            __type: item.slice_type,
            id: uniqueId(),
            text: getRichText(item.primary.text, 'html', { references }),
          }
        }
        case 'text': {
          if (!item.primary.text) return null
          return {
            __type: item.slice_type,
            id: uniqueId(),
            label: item.slice_label,
            text: getRichText(item.primary.text, 'html', { references }),
          }
        }
        case 'quote': {
          if (!item.primary.quote) return null
          return {
            __type: item.slice_type,
            id: uniqueId(),
            quote: getRichText(item.primary.quote, 'html', { references }),
            cite: getRichText(item.primary.cite, 'html', { references }),
          }
        }
        case 'youtube': {
          if (!item.primary.youtubeid) return null
          return {
            __type: item.slice_type,
            id: uniqueId(),
            embed: item.primary.youtubeid.html,
            title: item.primary.youtubeid.title,
            youtubeID:
              item.primary.youtubeid.provider_name === 'YouTube'
                ? item.primary.youtubeid.embed_url.match(/\?v=(.+)$/)?.[1] ||
                  null
                : null,
            caption: getRichText(item.primary.videoresource, 'html'),
          }
        }
        case 'image': {
          const { url, ...rest } = item.primary.imageimage
          if (!url) return null
          return {
            __type: item.slice_type,
            id: uniqueId(),
            image: { url: parseImageUrl(url), ...rest },
            caption: getRichText(item.primary.imagecaption, 'html'),
          }
        }
        case 'medialink': {
          return {
            __type: item.slice_type,
            id: uniqueId(),
            image: item.primary.mediacover?.url
              ? parseImageUrl(item.primary.mediacover.url)
              : null,
            caption:
              getRichText(item.primary.mediacaption, 'html')?.html || null,
            file: item.primary.medialink,
          }
        }
        case 'references_list': {
          return {
            __type: item.slice_type,
            id: uniqueId(),
          }
        }
        case 'slider': {
          if (!item.items?.length) return null
          return {
            __type: item.slice_type,
            id: uniqueId(),
            data: item.items
              .map((slide) => {
                const { url, ...rest } = slide?.sliderimage
                if (!url) return null

                return {
                  image: {
                    url: parseImageUrl(url),
                    ...rest,
                  },
                  caption: getRichText(slide.slidercaptions, 'html'),
                }
              })
              .filter(Boolean),
          }
        }
        case 'list_of_articles': {
          if (!item.items?.length) return null
          return {
            __type: item.slice_type,
            id: uniqueId(),
            data: item.items.reduce<Article[]>((res, article) => {
              if (article?.articlelink.link_type === 'Document') {
                res.push({
                  id: article?.articlelink.id || uniqueId(),
                  title:
                    getRichText(article?.articlelink.data?.title, 'text')
                      ?.text || null,
                  image: article?.articlelink.data?.image?.url
                    ? parseImageUrl(article?.articlelink.data?.image.url)
                    : null,
                  date: parseLocalDate(
                    parseDate(
                      article?.articlelink?.data ||
                        article?.articlelink?.first_publication_date,
                    ),
                  ),
                  publicationDate: article?.articlelink?.first_publication_date,
                  tags: [],
                  authors: [],
                  slug:
                    title && article?.articlelink?.first_publication_date
                      ? makePath(
                          title,
                          article.articlelink.first_publication_date,
                        )
                      : null,
                  client,
                })
              }
              return res
            }, []),
          }
        }

        default:
          return null
      }
    })
    .filter(Boolean)
  const paletteRes = data?.image.url
    ? ((await fetch(
        `${parseImageUrl(
          data?.image.url,
        )}?auto=compress,format&w=16&h=16&fit=scale&palette=json&colors=1`,
      ).then((res) => res.json())) as ColorPalette)
    : null

  const result = {
    title,
    image: data.image?.url
      ? {
          image: { ...data.image, url: parseImageUrl(data.image.url) },
          caption: getRichText(data.caption, 'html'),
          palette: paletteRes || null,
        }
      : null,
    date: parseLocalDate(
      parseDate(data.releasedate || article.first_publication_date),
    ),
    publicationDate: article.first_publication_date || null,
    modifiedDate: article.last_publication_date || null,
    tags: article.tags || null,
    authors: (
      (data.authors as {
        author: FilledLinkToDocumentField<
          'authors',
          'filled',
          {
            name: string | null
          }
        >
      }[]) || []
    ).reduce<string[]>((res, { author }) => {
      if (author.data?.name) {
        res.push(author.data.name)
      }
      return res
    }, []),
    slug:
      title && article.first_publication_date
        ? makePath(title, article.first_publication_date)
        : null,
    body,
    references: referencesList,
  }

  return result
}

export type ArticleProps = PromisedType<Return<typeof getArticleProps>>

const graphQuery = /* GraphQL */ `
  {
    articles {
      title
      image
      caption
      releasedate
      authors {
        author {
          name
        }
      }
      body {
        ...on lead {
          non-repeat {
            text
          }
        }
        ...on text {
          non-repeat {
            text
          }
        }
        ...on quote {
          non-repeat {
            quote
            cite
          }
        }
        ...on youtube {
          non-repeat {
            youtubeid
            videoresource
          }
        }
        ...on image {
          non-repeat {
            imageimage
            imagecaption
          }
        }
        ...on medialink {
          non-repeat {
            mediacover
            mediacaption
            medialink
          }
        }
        ...on reference {
          non-repeat {
            referenceanchor
            referencetext
          }
        }
        ...on slider {
          repeat {
            sliderimage
            slidercaptions
          }
        }
        ...on list_of_articles {
          repeat {
            articlelink {
              title
              releasedate
              image
            }
          }
        }
        ...on references_list {
          repeat {
            ...repeatFields
          }
        }
      }
    }
  }
`
