import type {
  GroupField,
  LinkField,
  PrismicDocument,
  TitleField,
} from '@prismicio/types'
import type { PromisedType, Return } from 'tsdef'
import { metaClient } from './clients'
import { getRichText } from './getRichText'

type Homepage = PrismicDocument<{
  title: TitleField
  pagelinks: GroupField<{
    pagelinktitle: TitleField
    pagelink: LinkField
  }>
  links: GroupField<{
    linktitle: TitleField
    link: LinkField
  }>
}>

export async function getHeaderProps() {
  const home = await metaClient().getByType<Homepage>('index', {
    graphQuery,
  })

  const data = home?.results?.[0]?.data

  if (!data) return null

  return {
    title: getRichText(data?.title, 'text')?.text || null,
    pageLinks: (data?.pagelinks || []).map((item) => ({
      title: getRichText(item.pagelinktitle, 'text'),
      link: item.pagelink,
    })),
    links: (data?.links || []).map((item) => ({
      title: getRichText(item.linktitle, 'text'),
      link: item.link,
    })),
  }
}

export type HeaderProps = PromisedType<Return<typeof getHeaderProps>>

const graphQuery = /* GraphQL */ `
  {
    index {
      title
      pagelinks {
        pagelinktitle
        pagelink
      }
      links {
        linktitle
        link
      }
    }
  }
`
