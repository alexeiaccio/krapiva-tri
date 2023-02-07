import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { ArticlesPagedGridSection } from 'components/ArticlesSections'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import {
  ArticlesListProps,
  getArticlesProps,
} from 'lib/prismic/v6/getArticlesProps'

export async function getStaticProps(
  context: GetStaticPropsContext<{
    pid: string
  }>,
) {
  const client = 'pervaya' as const
  const props = {
    pervaya: {
      title: 'Первая ·К·Р·А·П·И·В·А·',
    },
    articles: null as ArticlesListProps,
    total: 0,
  }

  if (!context.params?.pid || !client) return { props }

  const articles = await getArticlesProps(client, {
    pageSize: 6,
    page: Number(context.params.pid),
    ordering: 'asc',
  })

  return {
    props: {
      ...props,
      articles,
      total: articles?.total ?? 0,
    },
  }
}

function PervayaPagedPage({
  pervaya,
  articles,
  total,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO
        title={pervaya?.title || undefined}
        links={(articles?.items || []).map((item) => item.slug || '')}
      />
      <ArticlesPagedGridSection
        title={pervaya?.title}
        total={total}
        pathname="/pervaya/pages/[pid]"
        client="no"
        articles={articles}
      />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

PervayaPagedPage.getLayout = getLayout

export default PervayaPagedPage
