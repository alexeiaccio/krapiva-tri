import { Client } from '@prismicio/client'
import { FilledLinkToDocumentField, PrismicDocument } from '@prismicio/types'
import { makePath, translite } from '../makePath'
import { getRichText } from './getRichText'

export async function getDocumentProps(
  client: Client,
  ref: string,
  id: string,
) {
  const document = await client.getByID<PrismicDocument>(id, {
    graphQuery,
    ref,
  })
  const data = document?.data

  if (document?.type === 'authors') {
    const name = data.name

    return name
      ? {
          name,
          type: document.type,
          slug: translite(name),
        }
      : null
  }

  if (document?.type === 'articles') {
    const title = getRichText(data.title, 'text')?.text || null

    return title
      ? {
          title,
          type: document.type,
          publicationDate: document.first_publication_date,
          slug: makePath(title, document.first_publication_date),
          tags: document.tags || [],
          authors: (
            (data.authors as {
              author: FilledLinkToDocumentField<
                'authors',
                'filled',
                {
                  name: string | null
                }
              >
            }[]) || []
          ).reduce<string[]>((res, { author }) => {
            if (author.data?.name) {
              res.push(author.data.name)
            }
            return res
          }, []),
        }
      : null
  }

  return null
}

const graphQuery = /* GraphQL */ `
  {
    articles {
      title
      authors {
        author {
          name
        }
      }
    }
    authors {
      name
    }
  }
`
