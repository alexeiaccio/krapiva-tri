import { cx } from 'class-variance-authority'
import { NextSeo } from 'next-seo'
import { lazy, useState } from 'react'
// import { config } from 'site.config'
import { ArticleCard } from 'components/ArticleCard'
import { InfiniteSlider } from 'components/ArticlesSliders'
import { Divider, MediaDevider } from 'components/Divider'
import { Glow } from 'components/Glow'
import { Header } from 'components/Header'
import { HeaderBlock } from 'components/HeaderBlock'
import { Slider } from 'components/Slider'
import { getLayout } from 'layouts/UIKitLayout'
import { Article } from 'lib/prismic/v6/types'

const Footer = lazy(() => import('components/Footer'))
// const Banner = lazy(() => import('components/Banner'))

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    return {
      notFound: true,
    }
  }

  return {
    props: {},
  }
}

function UIKitPage() {
  const [pages, setPages] = useState<Array<{ items: Array<Article> }>>([
    {
      items: getItems(),
    },
  ])

  return (
    <>
      <NextSeo nofollow={true} />
      <Glow />
      <Header />
      <main
        className={cx(
          'relative min-h-screen grid glow gap-px bg-slate-200',
          'dark:text-slate-50',
          'dark:bg-slate-800 dark:after:from-black',
          'after:w-full',
          'after:translate-y-full after:to-transparent',
          'after:h-16 after:from-white after:bottom-0',
          'after:block',
          'after:bg-gradient-to-b after:backdrop-blur-sm',
          'after:absolute z-[1]',
          'grid-cols-[1fr,minmax(0,80ch),1fr]',
        )}
      >
        <MediaDevider greaterThan="sm" size="full" className="h-12" />
        <Slider data={Array.from({ length: 6 }, (_, i) => i)}>
          {() => <ArticleCard article={null} />}
        </Slider>
        <Divider size="full" className="h-12" />
        <Slider
          data={Array.from({ length: 6 }, (_, i) => String(i))}
          mode="grid"
        >
          {() => <ArticleCard article={null} />}
        </Slider>
        <Divider size="full" className="h-12" />
        <HeaderBlock>
          <h1>Content</h1>
        </HeaderBlock>
        <Divider size="full" className="h-12" />
        <InfiniteSlider
          pages={pages}
          mode="grid"
          fetchNextPage={
            pages.length < 3
              ? () => setPages((pages) => [...pages, { items: getItems() }])
              : undefined
          }
        />
        <MediaDevider greaterThan="sm" size="full" className="h-12" />
        {/* <Banner banner={config.banners?.[0]} /> */}
        <Divider size="full" className="h-12" />
        {/* <Banner banner={config.banners?.[1]} /> */}
        <Divider size="full" className="h-12" />
      </main>
      <Footer />
    </>
  )
}

UIKitPage.getLayout = getLayout

export default UIKitPage

function getItems(): Article[] {
  return Array.from(
    { length: 6 },
    (_, i) =>
      ({
        id: String(i),
      } as Article),
  )
}
