import { z } from 'zod'
import {
  getArticlesByCategoryTagPagedPropsCache,
  getArticlesByTimeTagPagedPropsCache,
  getArticlesProps,
} from 'lib/prismic/v6/getArticlesProps'
import { getTagsProps } from 'lib/prismic/v6/getTagsProps'
import { Article } from 'lib/prismic/v6/types'
import { createRouter } from 'server/createRouter'

const client = z.union([
  z.literal('afisha'),
  z.literal('dev'),
  z.literal('krasnoeZnamya'),
  z.literal('pervaya'),
  z.literal('meta'),
  z.literal('rodina'),
  z.literal('veschdok'),
  z.literal('vtoraya'),
])

export const prismicRouter = createRouter()
  .query('getArticlesByTag', {
    input: z.object({
      path: z.string(),
      uid: z.string().nullish(),
      cursor: z.number().min(1).nullish(),
    }),
    async resolve({ input, ctx }) {
      ctx.res?.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400',
      )
      const emptyResult = { items: [] as Article[], nextPage: null, total: 0 }
      if (!input.uid) return emptyResult
      const cacheFn =
        input.path === '/rubriki'
          ? getArticlesByCategoryTagPagedPropsCache
          : getArticlesByTimeTagPagedPropsCache
      const data = await cacheFn(input.uid)
      if (!data) return emptyResult

      return {
        items: (data?.pages || [])[(input?.cursor || 1) - 1]?.items || [],
        total: data.total,
        nextPage:
          (data?.pages.length || 0) > (input?.cursor || 1)
            ? (input?.cursor || 1) + 1
            : null,
      }
    },
  })
  .query('getArticles', {
    input: z.object({
      client,
      pageSize: z.number().min(1).max(100).nullish(),
      cursor: z.number().min(1).nullish(),
    }),
    async resolve({ input, ctx }) {
      ctx.res?.setHeader(
        'Cache-Control',
        'public, s-maxage=3600, stale-while-revalidate=86400',
      )

      const articles = await getArticlesProps(input.client, {
        pageSize: input.pageSize || 6,
        page: input.cursor || 1,
      })

      return {
        items: articles?.items || [],
        nextPage:
          (articles?.totalPages || 0) > (articles?.page || 1)
            ? (articles?.page || 1) + 1
            : null,
      }
    },
  })
  .query('getTags', {
    input: z.object({
      client,
    }),
    async resolve({ input, ctx }) {
      const tags = await getTagsProps(input.client)

      return tags
    },
  })
