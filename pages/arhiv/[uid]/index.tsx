import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { config } from 'site.config'
import { ArticlesGridSection } from 'components/ArticlesSections'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import { getArticlesByTimeTagPagedProps } from 'lib/prismic/v6/getArticlesProps'
import { getTimeTagBySlug } from 'lib/prismic/v6/getTagsProps'
import { Article } from 'lib/prismic/v6/types'

export async function getStaticProps(
  context: GetStaticPropsContext<{
    uid: string
  }>,
) {
  const month = await getTimeTagBySlug(context.params?.uid)
  const props = {
    month: {
      title: month?.key || null,
      description:
        config.categories.find((cat) => cat.slug === context.params?.uid)
          ?.description || null,
    },
    total: 0,
    links: [] as string[],
    pages: [] as { items: Article[] }[],
  }
  const pagesProps = await getArticlesByTimeTagPagedProps(context.params?.uid)

  return {
    props: {
      ...props,
      ...pagesProps,
    },
  }
}

function MonthPage({
  month,
  total,
  links,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO title={month?.title || undefined} links={links} />
      <ArticlesGridSection
        title={month.title}
        description={month.description}
        total={total}
        pages={pages}
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

MonthPage.getLayout = getLayout

export default MonthPage
