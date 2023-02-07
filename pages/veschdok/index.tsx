import type { InferGetStaticPropsType } from 'next'
import { ArticlesGridSection } from 'components/ArticlesSections'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import { getArticlesPagedProps } from 'lib/prismic/v6/getArticlesProps'
import { Article } from 'lib/prismic/v6/types'

export async function getStaticProps() {
  const client = 'veschdok' as const
  const props = {
    veschdok: {
      title: 'Вещдок',
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

function VeschdokPage({
  veschdok,
  total,
  links,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO title={veschdok?.title || undefined} links={links} />
      <ArticlesGridSection title={veschdok.title} total={total} pages={pages} />
    </>
  )
}

VeschdokPage.getLayout = getLayout

export default VeschdokPage
