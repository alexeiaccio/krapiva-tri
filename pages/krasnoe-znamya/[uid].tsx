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
  const page = await getArticleBySlug('krasnoeZnamya', context.params.uid)

  return {
    props: { page },
  }
}

function KrasnoeZnamyaPage({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <ArticlePage page={page} />
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

KrasnoeZnamyaPage.getLayout = getLayout

export default KrasnoeZnamyaPage
