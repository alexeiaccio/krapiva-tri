import type { InferGetStaticPropsType } from 'next'
// import { lazy } from 'react'
import { AboutExcerpt } from 'components/AboutPage'
import { Categories } from 'components/Categories'
import { Divider, MediaDevider } from 'components/Divider'
import { NewArticles } from 'components/NewArticles'
import { PageSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import { getHomepageProps } from 'lib/prismic/v6/getHomepageProps'

// const Banner = lazy(() => import('components/Banner'))

export async function getStaticProps() {
  const homepage = await getHomepageProps()

  return {
    props: {
      homepage,
    },
  }
}

function IndexPage({
  homepage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title="Главная" />
      <NewArticles articles={homepage?.articles} />
      <MediaDevider greaterThan="sm" size="full" className="h-12" />
      {/* <Banner banner={homepage.banners[1]} /> */}
      <Categories categories={homepage?.categories} />
      <Divider size="full" className="h-12" />
      {/* <Banner banner={homepage.banners[0]} /> */}
      <Divider size="full" className="h-12" />
      <AboutExcerpt about={homepage?.about} />
      <Divider size="full" className="h-12" />
    </>
  )
}

IndexPage.getLayout = getLayout

export default IndexPage
