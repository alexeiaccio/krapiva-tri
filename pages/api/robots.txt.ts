import type { NextApiRequest, NextApiResponse } from 'next'
import { config } from 'site.config'

export default async function RobotsTxt(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  // cache robots.txt for up to one day
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=86400',
  )
  res.setHeader('Content-Type', 'text/plain')
  res.write(
    process.env.SEO === 'allowed'
      ? `# Allow all user agents.
User-agent: *
Allow: /
# Disallow all user agents.
Disallow: /api/
Disallow: /dev/
Disallow: /_error
Disallow: /404
Disallow: /500
  
Sitemap: ${config.siteURL}/api/sitemap.xml
`
      : `# Disallow all user agents.
User-agent: *
Disallow: /
`,
  )
  res.end()
}
