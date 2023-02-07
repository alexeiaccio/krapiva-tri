import type {
  ImageField,
  KeyTextField,
  PrismicDocument,
  RichTextField,
  SelectField,
} from '@prismicio/types'
import fetch from 'cross-fetch'
import { getCached, getWithCacheByUID } from '../../getWithCache'
import { translite } from '../makePath'
import { parseImageUrl } from '../parseImageUrl'
import { CLIENTS, TEXT_API } from './constants'
import { getRichText } from './getRichText'
import { Author, ColorPalette } from './types'

type AuthorType = PrismicDocument<{
  name: KeyTextField
  statement: RichTextField
  avatar: ImageField
  type: SelectField<'author' | 'redsovet' | 'link', 'filled'>
}>

export async function getAllAuthors() {
  const allAuthors = await Promise.all(
    TEXT_API.map((api) =>
      CLIENTS[api].getAllByType<AuthorType>('authors', {
        graphQuery,
      }),
    ),
  )

  const structuredAuthors = allAuthors.reduce<Record<string, Author>>(
    (res, authors, idx) => {
      authors.forEach((author) => {
        if (!author.data.name) return

        const slug = translite(author.data.name)
        const authorInRes = res[slug]
        const clients = authorInRes?.clients || []
        const avatars = authorInRes?.avatars || []
        clients.push({ client: TEXT_API[idx], id: author.id })
        if (author.data.avatar?.url) {
          avatars.push({ src: parseImageUrl(author.data.avatar.url) })
        }

        if (authorInRes) {
          res[slug] = {
            ...authorInRes,
            avatars,
            clients,
            type:
              authorInRes.type === 'redsovet' ? 'redsovet' : author.data.type,
          }
        } else {
          res[slug] = {
            id: author.id,
            name: author.data.name.trim(),
            description:
              getRichText(author.data.statement, 'text')?.text || null,
            statement: getRichText(author.data.statement, 'html')?.html || null,
            type: author.data.type,
            slug,
            avatars,
            clients,
          }
        }
      })

      return res
    },
    {},
  )
  const authors = Object.values(structuredAuthors)

  let palettes: Record<number, Array<string>> = []
  try {
    const promises = (authors || []).flatMap(({ avatars }, idx) =>
      avatars.map(async (avatar) => {
        if (!avatar?.src) return null
        const palette: ColorPalette = await fetch(
          `${parseImageUrl(avatar.src)}?palette=json&colors=1`,
        ).then((res) => res.json())
        palettes[idx] = [...(palettes[idx] || []), palette?.colors?.[0]?.hex]
        return null
      }),
    )

    await Promise.all(promises)
  } catch {}

  return authors.map((author, idx) => {
    author.avatars = author.avatars.map((avatar, i) => ({
      ...avatar,
      palette: palettes[idx]?.[i] || null,
    }))
    return author
  })
}

export const getAllCachedAuthors = getCached(getAllAuthors, 'o-nas', 'authors')

export async function getAuthorBySlug(uid?: string) {
  const author = await getWithCacheByUID({
    fn: getAllCachedAuthors,
    find: (authors) => authors?.find((author) => author.slug === uid) || null,
    uid,
  })

  return author
}

const graphQuery = /* GraphQL */ `
  {
    authors {
      name
      statement
      avatar
      type
    }
  }
`
