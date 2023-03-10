import { execSync } from 'child_process'
import fetch from 'cross-fetch'
import fs from 'fs/promises'
import path from 'path'
import { Nilable, ValueOf } from 'tsdef'

const CACHE_FOLDER_PATH = path.resolve(process.cwd(), '.next/cache')

export async function getWithCacheByUID<InputType, ResultType>({
  fn,
  find,
  uid,
  skipCache,
}: {
  fn: (skipCache?: boolean) => Promise<InputType>
  find: (item: InputType) => ResultType | null
  uid: Nilable<string>
  skipCache?: boolean
}): Promise<ResultType | null> {
  if (!uid) return null

  const xs = await fn(skipCache)
  let x = find(xs)

  if (!x && !skipCache) {
    x = await getWithCacheByUID({ fn, find, uid, skipCache: true })
  }

  return x
}

export function getCached<PageProps, DataType = ValueOf<PageProps>>(
  fn: () => Promise<DataType>,
  pathname: string,
  propKey?: keyof PageProps,
) {
  return async function getWithCache(skipCache?: boolean): Promise<DataType> {
    if (!skipCache) {
      if (
        process.env.NODE_ENV === 'development' ||
        process.env.TEST_NODE_ENV === 'development'
      ) {
        try {
          await fs.stat(CACHE_FOLDER_PATH)
        } catch {
          await fs.mkdir(CACHE_FOLDER_PATH)
        }
        try {
          const cache = await fs.readFile(
            path.join(CACHE_FOLDER_PATH, `${pathname.replace(/\//g, '_')}`),
            { encoding: 'utf8' },
          )

          if (cache) {
            console.log(`Read from ${pathname.replace(/\//g, '_')} cache`)
            return JSON.parse(cache) as DataType
          }
        } catch {
          console.log('There is not cache for this query yet')
        }
      } else {
        try {
          let cache
          const res = await fetch(
            `${`${
              process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : 'http://localhost:3000'
            }/_next/data/${
              process.env.VERCEL_GIT_COMMIT_SHA ||
              execSync('git rev-parse HEAD').toString().trim()
            }`}/${pathname}.json`,
          )
          cache = await res.json()

          console.log(`Fetched from ${pathname}.json`)
          if (propKey) {
            return (cache?.pageProps as PageProps)?.[
              propKey
            ] as unknown as DataType
          } else {
            return cache?.pageProps as DataType
          }
        } catch {
          console.log('There is not this page yet', pathname)
        }
      }
    }

    const data = await fn()

    if (
      process.env.NODE_ENV === 'development' ||
      process.env.TEST_NODE_ENV === 'development'
    ) {
      try {
        await fs.writeFile(
          path.join(CACHE_FOLDER_PATH, `${pathname.replace(/\//g, '_')}`),
          JSON.stringify(data),
          { encoding: 'utf8' },
        )
        console.log(
          `Wrote to ${pathname} cache at`,
          path.join(CACHE_FOLDER_PATH, `${pathname.replace(/\//g, '_')}`),
        )
      } catch (error) {
        console.error(error)
      }
    }

    return data
  }
}
