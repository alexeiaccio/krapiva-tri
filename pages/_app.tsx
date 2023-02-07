// import { PrismicPreview } from '@prismicio/next'
import { withTRPC } from '@trpc/next'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
// import getConfig from 'next/config'
import { ReactNode, Suspense } from 'react'
import { config } from 'site.config'
import 'styles/index.css'
import { MediaContextProvider } from 'lib/media'
import { transformer } from 'lib/trpc/trpc'

// const { publicRuntimeConfig } = getConfig()

function MyApp({
  Component,
  pageProps,
}: AppProps & {
  Component: AppProps['Component'] & {
    getLayout: ((comp: ReactNode) => ReactNode) | undefined
  }
}) {
  const getLayout = Component.getLayout || (() => (page: ReactNode) => page)

  return (
    // <PrismicPreview
    //   repositoryName={publicRuntimeConfig.VTORAYA_REPOSITORY_NAME}
    // >
    <>
      <DefaultSeo
        title={config.title}
        defaultTitle={config.title}
        titleTemplate={`${config.title} | %s`}
        description={config.about.lead}
        canonical={config.siteURL}
        openGraph={{
          type: 'website',
          locale: 'ru_RU',
          url: config.siteURL,
          site_name: config.title,
          title: config.title,
          description: config.about.lead,
          images: [
            {
              url: `${config.about.image}?fit=clamp&w=1200&h=630`,
              width: 1200,
              height: 630,
              alt: config.title,
            },
          ],
        }}
        facebook={{
          appId: config.facebookAppId,
        }}
      />
      <Suspense fallback={null}>
        {/* @ts-ignore */}
        <MediaContextProvider>
          {/* @ts-ignore */}
          {getLayout(<Component {...pageProps} />) as ReactNode}
        </MediaContextProvider>
      </Suspense>
    </>
    // </PrismicPreview>
  )
}

export default withTRPC({
  config() {
    return {
      url: '/api/trpc',
      transformer,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            cacheTime: 60 * 60,
            staleTime: 60 * 60,
            refetchOnWindowFocus: false,
          },
        },
      },
    }
  },
  ssr: false,
})(MyApp)
