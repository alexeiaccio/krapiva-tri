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
  const client = 'krasnoeZnamya' as const
  const props = {
    krasnoeZnamya: {
      title: 'Красное знамя',
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

function KkrasnoeZnamyaPagedPage({
  krasnoeZnamya,
  articles,
  total,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO
        title={krasnoeZnamya?.title || undefined}
        links={(articles?.items || []).map((item) => item.slug || '')}
      />
      <ArticlesPagedGridSection
        title={krasnoeZnamya?.title}
        total={total}
        pathname="/krasnoeZnamya/pages/[pid]"
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

KkrasnoeZnamyaPagedPage.getLayout = getLayout

export default KkrasnoeZnamyaPagedPage
