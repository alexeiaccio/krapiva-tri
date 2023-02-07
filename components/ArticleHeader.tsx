import { cx } from 'class-variance-authority'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { ReactNode, useMemo } from 'react'
import { translite } from 'lib/prismic/makePath'
import type { ArticleProps } from 'lib/prismic/v6/getArticleProps'
import type { Color } from 'lib/prismic/v6/types'
import { HTML } from './HTML'
import { IfElse } from './IfElse'
import { Link } from './Link'

const MeshGradient = dynamic(import('./MeshGradient'))

interface Props {
  page: ArticleProps
}

export function ArticleHeader({ page }: Props) {
  const palette = useMemo<[Color, Color, Color, Color] | null>(
    () =>
      page?.image?.palette
        ? [
            page.image.palette.colors[0],
            page.image.palette.dominant_colors.muted,
            page.image.palette.dominant_colors.muted_dark,
            page.image.palette.dominant_colors.vibrant_dark,
          ]
        : null,
    [page?.image?.palette],
  )
  const description = useMemo(() => {
    const res: ReactNode[] = ['· ']
    // page?.authors?.forEach((author) => {
    //   if (author)
    //     res.push(
    //       <Link key={author} href={`/o-nas/${translite(author)}`}>
    //         <a className="whitespace-nowrap">{author}</a>
    //       </Link>,
    //     )
    //   res.push(' · ')
    // })
    if (page?.date) {
      res.push(
        <span key={page.date} className="whitespace-nowrap">
          {page.date}
        </span>,
      )
      res.push(' · ')
    }
    page?.tags?.forEach((tag) => {
      if (tag) {
        res.push(
          <Link
            key={tag}
            href={`/${
              tag.match(/([а-яА-Я]+)\s(\d{4})/) ? 'arhiv' : 'rubriki'
            }/${translite(tag)}`}
          >
            <a className="whitespace-nowrap">{tag}</a>
          </Link>,
        )
        res.push(' · ')
      }
    })

    return res
  }, [page])

  return (
    <header
      className={cx(
        'text-white relative pt-6 pb-3 overflow-hidden',
        'grid gap-8 col-span-full bg-black md:pt-12 md:pb-6',
        'grid-cols-[inherit]',
      )}
    >
      <MeshGradient palette={palette} className="opacity-75" />
      <div className="col-[2] relative grid gap-8">
        <h1
          className={cx(
            'text-4xl leading-tight font-montserrat font-bold',
            'md:text-6xl',
          )}
        >
          {page?.title}
        </h1>
        <div className="text-base font-medium font-cormorant-garamond">
          {description}
        </div>
      </div>
      <IfElse condition={page?.image} fallback={null}>
        {(image) => (
          <figure
            className={cx(
              'relative col-span-full',
              'grid gap-y-2 gap-x-4 grid-cols-[inherit]',
            )}
          >
            <IfElse condition={image.image.url} fallback={null}>
              {(url) => (
                <div className="col-[2] relative pb-[62.218%]">
                  <div className="absolute inset-0 grid object-cover">
                    <Image
                      objectFit="cover"
                      src={`${url}?fit=clamp&w=720`}
                      width={image.image.dimensions?.width ?? 720}
                      height={image.image.dimensions?.height ?? 448}
                      alt={image.image.alt ?? ''}
                      blurDataURL={`${url}?w=16`}
                      quality={90}
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </IfElse>
            <IfElse condition={image?.caption} fallback={null}>
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
        )}
      </IfElse>
    </header>
  )
}
