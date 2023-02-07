import { redirectToPreviewURL, setPreviewData } from '@prismicio/next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createPrismicClient } from 'lib/prismic/prismic-config'
import { linkResolver } from 'lib/prismic/v6/htmlSerializer'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = createPrismicClient(
    process.env.VTORAYA_REPOSITORY_NAME!,
    process.env.VTORAYA_API_TOKEN!,
    {
      req,
    },
  )

  await setPreviewData({ req, res })

  await redirectToPreviewURL({ req, res, client, linkResolver })
}
