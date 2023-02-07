import type { InferGetStaticPropsType } from 'next'
import { ArticlesGridSection } from 'components/ArticlesSections'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import { getArticlesPagedProps } from 'lib/prismic/v6/getArticlesProps'
import { Article } from 'lib/prismic/v6/types'

export async function getStaticProps() {
  const client = 'rodina' as const
  const props = {
    rodina: {
      title: 'Родина',
    },
    total: 0,
    links: [] as string[],
    pages: [] as { items: Article[] }[],
  }
  const pagesProps = await getArticlesPagedProps(client)

  return {
    props: {
      ...props,
      ...pagesProps,
    },
  }
}

function RodinaPage({
  rodina,
  total,
  links,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO title={rodina?.title || undefined} links={links} />
      <ArticlesGridSection title={rodina.title} total={total} pages={pages} />
    </>
  )
}

RodinaPage.getLayout = getLayout

export default RodinaPage
