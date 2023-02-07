import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import invariant from 'tiny-invariant'
import { ArticlePage } from 'components/ArticlePage'
import { getLayout } from 'layouts/IndexLayout'
import { getArticleBySlug } from 'lib/prismic/v6/getArticleBySlug'

export async function getStaticProps(
  context: GetStaticPropsContext<{
    uid: string
  }>,
) {
  invariant(context.params)
  const page = await getArticleBySlug('rodina', context.params.uid)

  return {
    props: { page },
  }
}

function RodinaPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <ArticlePage page={page} />
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

RodinaPage.getLayout = getLayout

export default RodinaPage
