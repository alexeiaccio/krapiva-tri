import type { InferGetStaticPropsType } from 'next'
import { ArticlesGridSection } from 'components/ArticlesSections'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import { getArticlesPagedProps } from 'lib/prismic/v6/getArticlesProps'
import { Article } from 'lib/prismic/v6/types'

export async function getStaticProps() {
  const client = 'pervaya' as const
  const props = {
    pervaya: {
      title: 'Первая ·К·Р·А·П·И·В·А·',
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

function PervayaPage({
  pervaya,
  total,
  links,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO title={pervaya?.title || undefined} links={links} />
      <ArticlesGridSection title={pervaya.title} total={total} pages={pages} />
    </>
  )
}

PervayaPage.getLayout = getLayout

export default PervayaPage
