import type { NextApiRequest, NextApiResponse } from 'next'
import { translite } from 'lib/prismic/makePath'
import { ClientByRepoKeys, CLIENTS_BY_REPO } from 'lib/prismic/v6/constants'
import { getDocumentProps } from 'lib/prismic/v6/getDocumentProps'

const URLS: Record<Exclude<ClientByRepoKeys, 'krapiva-meta'>, string> = {
  'afisha-2019': 'afisha',
  'krapiva-dev': 'dev',
  krasnoeznamya: 'krasnoe-znamya',
  'krapiva-org': 'pervaya',
  'rodina-konf': 'rodina',
  veschdok: 'veschdok',
  'krapiva-2019': 'publikacii',
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = req.body as PrismicWebhook
  const isNew = body.domain === 'krapiva-2019'

  if (body.secret !== process.env.PRISMIC_WEBHOOK_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const revalidate: Promise<unknown>[] = [
    res.revalidate(`/${URLS[body.domain]}`),
  ]
  if (isNew) {
    revalidate.push(res.revalidate('/'))
    revalidate.push(res.revalidate('/arhiv'))
    revalidate.push(res.revalidate('/rubriki'))
  }
  const documents = await Promise.all(
    (body.documents || []).map((id) =>
      getDocumentProps(CLIENTS_BY_REPO[body.domain], body.masterRef, id),
    ),
  )
  documents.forEach((doc) => {
    if (doc?.type === 'authors') {
      revalidate.push(res.revalidate('/o-nas'))
      revalidate.push(res.revalidate(`/o-nas/${doc?.slug}`))
    } else if (doc?.type === 'articles') {
      revalidate.push(res.revalidate(`/${URLS[body.domain]}/${doc?.slug}`))
      doc.authors?.forEach((author) => {
        revalidate.push(res.revalidate(`/o-nas/${translite(author)}`))
      })
      if (isNew) {
        doc?.tags?.forEach((tag) => {
          revalidate.push(
            res.revalidate(
              `/${
                tag.match(/([а-яА-Я]+)\s(\d{4})/) ? 'arhiv' : 'rubriki'
              }/${translite(tag)}/*`,
            ),
          )
        })
      }
    }
  })

  try {
    const revalidated = await Promise.allSettled(revalidate)
    return res.json({ revalidated })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}

interface PrismicWebhook {
  type: string
  secret: string
  masterRef: string
  domain: string
  apiUrl: string
  releases?: Releases
  bookmarks?: Bookmarks
  collection?: Bookmarks
  tags?: Tags
  documents?: string[]
}

interface Tags {
  addition: Addition2[]
  deletion: Addition2[]
}

interface Addition2 {
  id: string
}

interface Bookmarks {}

interface Releases {
  addition: Addition[]
  update: Addition[]
  deletion: Addition[]
}

interface Addition {
  id: string
  ref: string
  label: string
  documents: string[]
}
