import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { config } from 'site.config'
import { ArticlesGridSection } from 'components/ArticlesSections'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import { getArticlesByCategoryTagPagedProps } from 'lib/prismic/v6/getArticlesProps'
import { getCategoryTagBySlug } from 'lib/prismic/v6/getTagsProps'
import { Article } from 'lib/prismic/v6/types'

export async function getStaticProps(
  context: GetStaticPropsContext<{
    uid: string
  }>,
) {
  const category = await getCategoryTagBySlug(context.params?.uid)
  const props = {
    category: {
      title: category?.key || null,
      description:
        config.categories.find((cat) => cat.slug === context.params?.uid)
          ?.description || null,
    },
    total: 0,
    links: [] as string[],
    pages: [] as { items: Article[] }[],
  }
  const pagesProps = await getArticlesByCategoryTagPagedProps(
    context.params?.uid,
  )

  return {
    props: {
      ...props,
      ...pagesProps,
    },
  }
}

function CategoryPage({
  category,
  total,
  links,
  pages,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO title={category?.title || undefined} links={links} />
      <ArticlesGridSection
        title={category.title}
        description={category.description}
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

CategoryPage.getLayout = getLayout

export default CategoryPage
