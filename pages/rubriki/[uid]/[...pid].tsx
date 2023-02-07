import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { config } from 'site.config'
import { ArticlesPagedGridSection } from 'components/ArticlesSections'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import {
  ArticlesListProps,
  getArticlesByTagProps,
} from 'lib/prismic/v6/getArticlesProps'
import { getCategoryTagBySlug } from 'lib/prismic/v6/getTagsProps'

export async function getStaticProps(
  context: GetStaticPropsContext<{
    uid: string
    pid: string[]
  }>,
) {
  const category = await getCategoryTagBySlug(context.params?.uid)
  const client =
    category?.clients?.find(
      (client) => client.client === context.params?.pid[0],
    ) || null
  const props = {
    category: {
      title: category?.key || null,
      description:
        config.categories.find((cat) => cat.slug === context.params?.uid)
          ?.description || null,
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

function CategoryPagedPage({
  category,
  uid,
  client,
  articles,
  total,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO
        title={category?.title || undefined}
        description={category?.description || undefined}
        links={(articles?.items || []).map((item) => item.slug || '')}
      />
      <ArticlesPagedGridSection
        title={category?.title}
        description={category.description}
        total={total}
        pathname="/rubriki/[uid]/[...pid]"
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

CategoryPagedPage.getLayout = getLayout

export default CategoryPagedPage
