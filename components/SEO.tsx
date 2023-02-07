import { ArticleJsonLd, CarouselJsonLd, NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { config } from 'site.config'

type ArticleSEOProps = {
  title: string | undefined
  description?: string | undefined
  publishedTime: string | undefined
  modifiedTime: string | undefined
  image?: string | undefined
  authors?: string[]
  tags?: string[]
}

export function ArticleSEO({
  title,
  description,
  publishedTime,
  modifiedTime,
  image,
  authors,
  tags,
}: ArticleSEOProps) {
  const { asPath } = useRouter()

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url: `${config.siteURL}${asPath}`,
          type: 'article',
          article: {
            publishedTime,
            modifiedTime,
            authors,
            tags,
          },
          images: image
            ? [
                {
                  url: image,
                  width: 1200,
                  height: 630,
                  alt: title || undefined,
                },
              ]
            : undefined,
        }}
      />
      <ArticleJsonLd
        url={`${config.siteURL}${asPath}`}
        title={title || ''}
        description={description || ''}
        images={image ? [image] : []}
        datePublished={publishedTime || ''}
        dateModified={modifiedTime}
        authorName={authors || []}
        publisherName={config.title}
        publisherLogo={`${config.siteURL}/favicon.png`}
      />
    </>
  )
}

type ListSEOProps = {
  title: string | undefined
  description?: string | undefined
  image?: string | undefined
  links: Array<string>
}

export function ListSEO({ title, description, image, links }: ListSEOProps) {
  const { asPath } = useRouter()

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url: `${config.siteURL}${asPath}`,
          type: 'website',
          images: image
            ? [
                {
                  url: image,
                  width: 1200,
                  height: 630,
                  alt: title || undefined,
                },
              ]
            : undefined,
        }}
      />
      <CarouselJsonLd
        type="default"
        ofType="default"
        data={links.map((item) => ({
          url: `${config.siteURL}${asPath}${item}`,
        }))}
      />
    </>
  )
}

type PageSEOProps = {
  title: string | undefined
  description?: string | undefined
}

export function PageSEO({ title, description }: PageSEOProps) {
  const { asPath } = useRouter()

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title,
          description,
          url: `${config.siteURL}${asPath}`,
          type: 'website',
        }}
      />
    </>
  )
}
