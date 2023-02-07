import fetch from 'cross-fetch'
import crypto from 'crypto'
import fs from 'fs/promises'
import path from 'path'

export const hash = (str: string) =>
  crypto.createHash('md5').update(str).digest('hex')

export const CACHE_FOLDER_PATH = path.resolve(process.cwd(), '.next/cache')

export async function fetchWithMock(
  info: RequestInfo,
  init?: RequestInit,
  filename = 'cache',
) {
  const hashedUrl = hash(typeof info === 'string' ? info : info.url)
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.TEST_NODE_ENV === 'development'
  ) {
    try {
      const cache = await fs.readFile(
        path.join(CACHE_FOLDER_PATH, `${filename}_${hashedUrl}.json`),
        { encoding: 'utf8' },
      )

      if (cache) {
        console.log('Read from cache for', hashedUrl)
        return new Response(cache)
      }
    } catch {
      console.log('There is not cache for this query yet')
    }

    try {
      const res = await fetch(info, init)
      if (res) {
        const json = await res.json()
        await fs.writeFile(
          path.join(CACHE_FOLDER_PATH, `${filename}_${hashedUrl}.json`),
          JSON.stringify(json),
          'utf-8',
        )
      }
    } catch {}
  }

  return fetch(info, init)
}

export default fetchWithMock
