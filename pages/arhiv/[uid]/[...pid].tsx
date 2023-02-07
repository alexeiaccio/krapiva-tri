import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { ArticlesPagedGridSection } from 'components/ArticlesSections'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import {
  ArticlesListProps,
  getArticlesByTagProps,
} from 'lib/prismic/v6/getArticlesProps'
import { getTimeTagBySlug } from 'lib/prismic/v6/getTagsProps'

export async function getStaticProps(
  context: GetStaticPropsContext<{
    uid: string
    pid: string[]
  }>,
) {
  const month = await getTimeTagBySlug(context.params?.uid)
  const client =
    month?.clients?.find(
      (client) => client.client === context.params?.pid[0],
    ) || null
  const props = {
    month: {
      title: month?.key || null,
    },
    uid: context.params?.uid || null,
    client: client?.client || null,
    articles: null as ArticlesListProps,
    total: 0,
  }

  if (!context.params?.pid || !client) return { props }

  const articles = await getArticlesByTagProps(client.client, client.tag, {
    pageSize: 6,
    page: Number(context.params.pid[1]),
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

function MonthPagedPage({
  month,
  uid,
  client,
  articles,
  total,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO
        title={month?.title || undefined}
        links={(articles?.items || []).map((item) => item.slug || '')}
      />
      <ArticlesPagedGridSection
        title={month?.title}
        total={total}
        pathname="/arhiv/[uid]/[...pid]"
        uid={uid}
        client={client}
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

MonthPagedPage.getLayout = getLayout

export default MonthPagedPage
