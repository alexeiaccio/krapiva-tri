import { cx } from 'class-variance-authority'
import { uniqueId } from 'lodash'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { NonNull } from 'tsdef'
import type { ArticleProps } from 'lib/prismic/v6/getArticleProps'
import { ArticleCard } from './ArticleCard'
import { ArticleHeader } from './ArticleHeader'
import { Divider } from './Divider'
import { HeaderBlock } from './HeaderBlock'
import { HTML } from './HTML'
import { IfElse } from './IfElse'
import { ImageWithZoom } from './Image'
import { List } from './List'
import { MediaLink } from './MediaLink'
import { ArticleSEO } from './SEO'
import { Share } from './Share'
import { Slider } from './Slider'

interface Props {
  page: ArticleProps
}

export function ArticlePage({ page }: Props) {
  const { pathname, asPath } = useRouter()
  const client = pathname?.match(/\/(.+)\//)?.[1]

  if (!page) return null

  return (
    <>
      <IfElse
        condition={client !== 'dev'}
        fallback={<NextSeo nofollow={true} />}
      >
        {() => (
          <ArticleSEO
            title={page.title || undefined}
            image={
              page.image?.image.url
                ? `${page.image.image.url}?fit=clamp&w=1200&h=630`
                : undefined
            }
            publishedTime={page.publicationDate || undefined}
            modifiedTime={page.modifiedDate || undefined}
            authors={page.authors}
            tags={page.tags}
          />
        )}
      </IfElse>
      <article
        className={cx(
          'pb-12 grid gap-4 col-span-full bg-white md:gap-8',
          'dark:bg-black grid-cols-[inherit]',
        )}
      >
        <ArticleHeader page={page} />
        <>
          {page?.body.map((item) => {
            switch (item?.__type) {
              case 'lead': {
                return (
                  <HTML key={item.id} className="col-[2] prose-xl md:prose-2xl">
                    {item.text?.html}
                  </HTML>
                )
              }
              case 'quote': {
                return (
                  <div key={item.id} className="col-[2] grid gap-4">
                    <blockquote>
                      <HTML className="prose-xl md:prose-2xl">
                        {item.quote?.html}
                      </HTML>
                    </blockquote>
                    <cite>
                      <HTML className="text-right">{item.cite?.html}</HTML>
                    </cite>
                  </div>
                )
              }
              case 'text': {
                return (
                  <HTML
                    key={item.id}
                    className={cx(
                      'relative prose-lg md:prose-xl md:prose-p:text-justify',
                      'col-[2] prose-p:[hyphens:auto]',
                    )}
                  >
                    {item.text?.html}
                  </HTML>
                )
              }
              case 'youtube': {
                return (
                  <div
                    key={item.id}
                    className={cx(
                      'py-2 grid gap-y-2 gap-x-4 col-span-full md:py-4',
                      'grid-cols-[inherit]',
                    )}
                  >
                    {item.youtubeID ? (
                      <LiteYouTubeEmbed
                        id={item.youtubeID}
                        title={item.title ?? ''}
                        params="modestbranding=1&rel=0&iv_load_policy=3&controls=1&disablekb=1"
                        wrapperClass="col-[2] flex gap-2 md:gap-4 yt-lite"
                        poster="hqdefault"
                      />
                    ) : (
                      <HTML key={item.id} className="col-[2] embed">
                        {item.embed}
                      </HTML>
                    )}
                    <HTML
                      key={item.id}
                      className={cx(
                        'text-sm text-slate-800 mt-2 dark:text-slate-200',
                        'col-[2]',
                      )}
                    >
                      {item.caption?.html}
                    </HTML>
                  </div>
                )
              }
              case 'slider': {
                if (item.data.length === 1 && item.data[0]) {
                  return (
                    <ImageBlock
                      item={{
                        ...item.data[0],
                        __type: 'image',
                        id: uniqueId(),
                      }}
                    />
                  )
                }
                return (
                  <div className="grid grid-cols-[inherit] col-span-full">
                    <Slider
                      data={item.data}
                      className="col-span-full"
                      key={item.id}
                    >
                      {(image) => (
                        <figure>
                          <IfElse
                            condition={image?.image.url ? image.image : null}
                            fallback={null}
                          >
                            {(image) => (
                              <ImageWithZoom
                                src={`${image.url}?fit=clamp&w=720`}
                                width={image.dimensions?.width ?? 720}
                                height={image.dimensions?.height ?? 448}
                                alt={image.alt ?? ''}
                                quality={90}
                                layout="intrinsic"
                                loading="lazy"
                              />
                            )}
                          </IfElse>
                          <IfElse condition={image?.caption} fallback={null}>
                            {(caption) => (
                              <figcaption className="mt-2 text-sm text-slate-800 dark:text-slate-200">
                                <HTML>{caption.html}</HTML>
                              </figcaption>
                            )}
                          </IfElse>
                        </figure>
                      )}
                    </Slider>
                  </div>
                )
              }
              case 'list_of_articles': {
                return (
                  <Slider data={item.data}>
                    {(article) => (
                      <ArticleCard key={article.id} article={article} />
                    )}
                  </Slider>
                )
              }
              case 'image': {
                return (
                  <IfElse key={item.id} condition={item} fallback={null}>
                    {(itm) => <ImageBlock item={itm} />}
                  </IfElse>
                )
              }
              case 'medialink': {
                return (
                  <section key={item.id} className="col-[2]">
                    <MediaLink item={item} />
                  </section>
                )
              }
              case 'references_list': {
                return (
                  <section key={item.id} className="col-[2]">
                    <List data={page.references}>
                      {(reference) => (
                        <div
                          key={reference.id}
                          className="flex items-baseline text-base no-underline"
                        >
                          <a
                            href={`#reference-${reference.anchor}`}
                            className="mb-2 reference-label"
                          >
                            {reference.anchor}
                          </a>
                          &nbsp;
                          <HTML>{reference.text}</HTML>
                        </div>
                      )}
                    </List>
                  </section>
                )
              }

              default:
                return null
            }
          })}
        </>
      </article>
      <HeaderBlock className="grid items-center md:grid-cols-[min-content,min-content] gap-4 md:p-8 md:gap-6">
        <Share
          title={page.title ?? ''}
          pathname={asPath}
          hashtags={page.tags}
        />
      </HeaderBlock>
      <Divider size="full" className="h-12" />
    </>
  )
}

function ImageBlock({
  item,
}: {
  item: Extract<NonNull<ArticleProps>['body'][number], { __type: 'image' }>
}) {
  return (
    <figure
      className={cx(
        'py-2 grid gap-y-2 gap-x-4 col-span-full md:py-4',
        'grid-cols-[inherit]',
      )}
    >
      <IfElse condition={item.image.url} fallback={null}>
        {(url) => (
          <div className="col-[2]">
            <ImageWithZoom
              src={url}
              blurDataURL={`${url}?w=16`}
              width={item.image.dimensions?.width ?? 720}
              height={item.image.dimensions?.height ?? 448}
              alt={item.image.alt ?? ''}
              quality={90}
              layout="intrinsic"
              loading="lazy"
            />
          </div>
        )}
      </IfElse>
      <IfElse condition={item.caption} fallback={null}>
        {(caption) => (
          <figcaption
            className={cx(
              'text-sm text-slate-800 dark:text-slate-200',
              'col-[2]',
            )}
          >
            <HTML>{caption.html}</HTML>
          </figcaption>
        )}
      </IfElse>
    </figure>
  )
}
