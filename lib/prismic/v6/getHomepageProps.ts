import { uniqueId } from 'lodash'
import { config } from 'site.config'
import type { PromisedType, Return } from 'tsdef'
import { translite } from '../makePath'
import { getAboutProps } from './getAboutProps'
import { getArticlesByTagProps, getArticlesProps } from './getArticlesProps'
import { getAllTags } from './getTagsProps'
import type { Article, Category } from './types'

export async function getHomepageProps() {
  const tags = await getAllTags()
  const timeTags = tags?.timeTags.slice(0, 2)

  let articles = [] as Article[]
  const categories = (config.categories || [])
    ?.map((category) => {
      const title = category.title
      if (!title) return null
      return {
        title,
        description: category.description,
        slug: translite(title),
      }
    })
    .filter(Boolean) as Category[]
  await Promise.all([
    ...[null].map(async () => {
      const articlesResult = await getArticlesProps('vtoraya', {
        pageSize: 6,
      })
      articles = articlesResult?.items || []
      return null
    }),
    ...categories.map(async ({ title }, idx) => {
      if (title === 'Архив') {
        categories[idx].articles = (timeTags || [])
          .flatMap((item) => item.tags)
          .slice(0, 5)
          .map((item) => ({
            id: uniqueId(),
            title: item.clients[0].tag,
            image: null,
            date: null,
            publicationDate: null,
            tags: [item.clients[0].tag],
            authors: [],
            slug: `/arhiv/${item.clients[0].slug}`,
            client: 'vtoraya',
          }))
      } else {
        const categoryArticles = title
          ? await getArticlesByTagProps('vtoraya', title, {
              pageSize: 6,
            })
          : null
        categories[idx].articles = categoryArticles?.items || []
      }
      return null
    }),
  ])
  const about = await getAboutProps()

  return await {
    title: config.title,
    articles,
    categories,
    banners: config.banners,
    about,
  }
}

export type HeaderProps = PromisedType<Return<typeof getHomepageProps>>
