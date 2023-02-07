import { capitalize } from 'lodash'
import path from 'path'
import type { PromisedType, Return } from 'tsdef'
import { getCached, getWithCacheByUID } from '../../getWithCache'
import { translite } from '../makePath'
import { ClientKeys, CLIENTS, TEXT_API, TextApiKeys } from './constants'

export const FOLDER_PATH = path.resolve(process.cwd(), 'site.config')

export const MONTHS = {
  mart: 'январь',
  fevral: 'февраль',
  yanvar: 'март',
  aprel: 'апрель',
  mai: 'май',
  iyun: 'июнь',
  iyul: 'июль',
  avgust: 'август',
  sentyabr: 'сентябрь',
  noyabr: 'октябрь',
  oktyabr: 'ноябрь',
  dekabr: 'декабрь',
}

export async function getTagsProps(client: ClientKeys) {
  const tags = await CLIENTS[client].getTags()

  const structeredTags = tags.reduce<{
    timeTags: { [key: number]: Record<number, string> }
    categoriesTags: string[]
  }>(
    (res, tag) => {
      const match = tag.match(/([а-яА-Я]+)\s(\d{4})/)
      if (match) {
        if (!res.timeTags[match[2]]) {
          res.timeTags[match[2]] = {}
        }
        const index = Object.values(MONTHS).indexOf(match[1].toLowerCase())
        res.timeTags[match[2]][index] = tag
      } else {
        res.categoriesTags.push(tag)
      }
      return res
    },
    { timeTags: {}, categoriesTags: [] },
  )

  return {
    raw: structeredTags.timeTags,
    timeTags: Object.entries(structeredTags.timeTags)
      .sort(sortDescendant)
      .map(([year, tags]) => ({
        year,
        tags: Object.entries(tags)
          .sort(sortDescendant)
          .map(([, tag]) => tag),
      })),
    categoriesTags: structeredTags.categoriesTags,
  }
}

export type TagProps = PromisedType<Return<typeof getTagsProps>>

function sortDescendant(
  [a]: [string, Record<number, string>],
  [b]: [string, Record<number, string>],
): number {
  return Number(b) - Number(a)
}

export type TagClient = {
  client: TextApiKeys
  tag: string
  slug?: string
}

export type TagWithClients = {
  key: string
  slug?: string
  clients: TagClient[]
}

type TimeTags = {
  year: string
  tags: TagWithClients[]
}[]

type CategoriesTags = TagWithClients[]

export async function getAllTags(): Promise<{
  timeTags: TimeTags
  categoriesTags: CategoriesTags
}> {
  const allTags = await Promise.all(
    TEXT_API.map(async (client) => ({
      client: client as TextApiKeys,
      tags: await getTagsProps(client),
    })),
  )

  const tTags = allTags.reduce<{
    [key: number]: {
      year: string
      tags: {
        [key: number]: {
          key: string
          slug: string
          clients: { client: TextApiKeys; tag: string; slug: string }[]
        }
      }
    }
  }>((res, { client, tags }) => {
    Object.entries(tags.raw).forEach(([year, tags]) => {
      if (!res[year]) {
        res[year] = { year, tags: {} }
      }
      Object.entries(tags).forEach(([idx, tag]) => {
        if (!res[year].tags[idx]) {
          res[year].tags[idx] = {}
        }
        res[year].tags[idx].key = capitalize(Object.values(MONTHS)[idx])
        res[year].tags[idx].slug = translite(tag)
        if (!res[year].tags[idx].clients) {
          res[year].tags[idx].clients = []
        }
        res[year].tags[idx].clients.push({
          client,
          tag,
          slug: translite(tag.trim()),
        })
      })
    })
    return res
  }, {})
  const timeTags: TimeTags = Object.entries(tTags)
    .sort(sortDescendant)
    .map(([, { year, tags }]) => ({
      year,
      tags: Object.entries(tags)
        .sort(sortDescendant)
        .map(([, tag]) => tag),
    }))
  const cTags = allTags.reduce<{
    [key: string]: TagClient[]
  }>((res, { client, tags }) => {
    tags.categoriesTags.forEach((tag) => {
      const key = tag.trim().toLowerCase()
      if (!res[key]) {
        res[key] = []
      }
      res[key].push({
        client,
        tag,
        slug: translite(tag.trim()),
      })
    })
    return res
  }, {})
  return {
    timeTags,
    categoriesTags: Object.entries(cTags).map(([key, clients]) => ({
      key: capitalize(key),
      slug: translite(key),
      clients,
    })),
  }
}

export const getAllCachedTags = getCached(getAllTags, 'rubriki', 'tags')

export function getCategoryTagBySlug(uid?: string) {
  return getWithCacheByUID({
    fn: getAllCachedTags,
    find: (tags) =>
      tags?.categoriesTags?.find((tag) => tag.slug === uid) || null,
    uid,
  })
}

export function getTimeTagBySlug(uid?: string) {
  return getWithCacheByUID({
    fn: getAllCachedTags,
    find: (tags) =>
      tags?.timeTags?.reduce<TagWithClients | null>((res, item) => {
        if (!res) {
          item.tags.forEach((tag) => {
            if (tag.slug === uid) {
              tag.key = `${tag.key} ${item.year}`
              res = tag
            }
          })
        }
        return res
      }, null),
    uid,
  })
}
