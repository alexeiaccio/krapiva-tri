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
  const page = await getArticleBySlug('pervaya', context.params.uid)

  return {
    props: { page },
  }
}

function PervayaPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <ArticlePage page={page} />
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

PervayaPage.getLayout = getLayout

export default PervayaPage
