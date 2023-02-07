import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from 'site.config'
import { getAllArticles } from 'lib/prismic/v6/getArticlesProps'
import { getAllCachedAuthors } from 'lib/prismic/v6/getAuthorProps'
import { getAllCachedTags } from 'lib/prismic/v6/getTagsProps'

interface CanonicalPageMap {
  [canonicalPageId: string]: string
}

interface SiteMap {
  canonicalPageMap: CanonicalPageMap
}

export default async function SitemapXml(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  if (process.env.SEO !== 'allowed') {
    return res.status(404).send({ error: 'not allowed' })
  }

  const siteMaps: SiteMap = {
    canonicalPageMap: {
      '/o-nas': '/o-nas',
      '/arhiv': '/arhiv',
      '/rubriki': '/rubriki',
      // '/afisha': '/afisha',
      '/krasnoe-znamya': '/krasnoe-znamya',
      '/prevaya': '/prevaya',
      '/publkacii': '/publkacii',
      '/rodina': '/rodina',
      '/veschdok': '/veschdok',
    },
  }

  const { categoriesTags, timeTags } = await getAllCachedTags()
  categoriesTags?.forEach((category) => {
    siteMaps.canonicalPageMap[
      `/rubriki/${category.slug}`
    ] = `/rubriki/${category.slug}`
  })
  timeTags?.forEach(({ tags }) => {
    tags?.forEach((tag) => {
      siteMaps.canonicalPageMap[`/arhiv/${tag.slug}`] = `/arhiv/${tag.slug}`
    })
  })
  const authors = await getAllCachedAuthors()
  authors?.forEach((author) => {
    siteMaps.canonicalPageMap[`/o-nas/${author.slug}`] = `/o-nas/${author.slug}`
  })
  const articles = await getAllArticles()
  articles?.forEach((article) => {
    siteMaps.canonicalPageMap[article] = article
  })

  // cache sitemap for up to one day
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=86400',
  )
  res.setHeader('Content-Type', 'text/xml')
  res.write(createSitemap(siteMaps))
  res.end()
}

const createSitemap = (
  siteMap: SiteMap,
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${config.siteURL}</loc>
      </url>
      ${Object.keys(siteMap.canonicalPageMap)
        .map((canonicalPagePath) =>
          `
            <url>
              <loc>${config.siteURL}${canonicalPagePath}</loc>
            </url>
          `.trim(),
        )
        .join('')}
    </urlset>
    `
