import type { InferGetStaticPropsType } from 'next'
import { ArticlesGridSection } from 'components/ArticlesSections'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import { getArticlesPagedProps } from 'lib/prismic/v6/getArticlesProps'
import { Article } from 'lib/prismic/v6/types'

export async function getStaticProps() {
  const client = 'dev' as const
  const props = {
    dev: {
      title: 'Dev ·К·Р·А·П·И·В·А·',
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

function DevPage({
  dev,
  total,
  links,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO title={dev?.title || undefined} links={links} />
      <ArticlesGridSection title={dev.title} total={total} pages={pages} />
    </>
  )
}

DevPage.getLayout = getLayout

export default DevPage
