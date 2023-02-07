import * as prismic from '@prismicio/client'
import type { PrismicDocument, TitleField } from '@prismicio/types'
import { format, parse } from 'date-fns'
import { makePath } from '../makePath'
import { ClientKeys, CLIENTS } from './constants'
import { getArticleProps } from './getArticleProps'
import { getRichText } from './getRichText'

type ArticleByType = PrismicDocument<{
  title: TitleField
}>

export async function getArticleBySlug(client: ClientKeys, slug: string) {
  const match = slug.match(/\d{2}-\d{2}-\d{4}$/)
  if (!match?.[0]) return null

  const date = format(parse(match[0], 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
  const articles = await CLIENTS[client].getByType<ArticleByType>('articles', {
    predicates: [
      prismic.predicate.dateBetween(
        'document.first_publication_date',
        `${date}T00:00:00Z`,
        `${date}T23:59:59Z`,
      ),
    ],
    graphQuery,
  })
  const article = articles.results?.find((item) => {
    const title = getRichText(item.data?.title, 'text')?.text || null
    if (!title || !item.first_publication_date) return false

    return makePath(title!, item.first_publication_date) === slug
  })
  if (!article?.id) return null

  const result = await getArticleProps(client, article.id)

  return result
}

export async function getArticlesBySlug(client: ClientKeys, slug: string) {
  const match = slug.match(/\d{2}-\d{2}-\d{4}$/)
  if (!match?.[0]) return null

  const date = format(parse(match[0], 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
  const articles = await CLIENTS[client].getByType<ArticleByType>('articles', {
    predicates: [
      prismic.predicate.dateBetween(
        'document.first_publication_date',
        `${date}T00:00:00Z`,
        `${date}T23:59:59Z`,
      ),
    ],
    graphQuery,
  })

  return articles.results
}

const graphQuery = /* GraphQL */ `
  {
    articles {
      title
    }
  }
`
