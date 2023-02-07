import {
  createClient,
  FetchLike,
  getRepositoryEndpoint,
} from '@prismicio/client'
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next'
import fetch from '../fetchWithMock'

export const createPrismicClient = (
  repo: string,
  accessToken: string,
  config?: CreateClientConfig,
) => {
  const apiEndpoint = getRepositoryEndpoint(repo)
  const client = createClient(apiEndpoint, {
    accessToken,
    fetch: fetch as FetchLike,
  })

  enableAutoPreviews({
    client,
    previewData: config?.previewData,
    req: config?.req,
  })

  return client
}
