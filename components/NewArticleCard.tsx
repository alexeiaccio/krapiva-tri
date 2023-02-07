import { cx } from 'class-variance-authority'
import Image from 'next/image'
import Link from 'next/link'
import type { Article } from 'lib/prismic/v6/types'
import { IfElse } from './IfElse'

type Props = {
  article: Article
}

export function NewArticleCard({ article }: Props) {
  if (!article) return null

  return (
    <>
      <Link href={`/publikacii/${article.slug}`} passHref>
        <a className="inline-block w-full h-full group">
          <figure className="relative w-full h-full">
            <IfElse condition={article.image} fallback={<div />}>
              {(url) => (
                <div
                  className="grid object-cover w-full h-full overflow-hidden"
                  style={{ backgroundColor: article.palette || 'transparent' }}
                >
                  <Image
                    objectFit="cover"
                    src={`${url}?fit=clamp&w=1200`}
                    width={1024}
                    height={720}
                    alt={article.title ?? ''}
                    className="transition-opacity duration-150 group-hover:opacity-75"
                  />
                </div>
              )}
            </IfElse>
            <figcaption className="absolute inset-0 grid grid-rows-[1fr,minmax(0,max-content)]">
              <div className="bg-gradient-to-b from-black/0 to-black/50" />
              <div
                className={cx(
                  'text-slate-50 p-2 overflow-hidden bg-black/50',
                  'md:p-4',
                )}
              >
                <h3
                  className={cx(
                    'w-full truncate text-lg font-montserrat font-bold',
                    'block',
                  )}
                >
                  {article.title}
                </h3>
                <div className="text-sm font-medium truncate font-cormorant-garamond">
                  {/* <IfElse condition={article.authors}>
                    {(authors) => (
                      <>
                        {' · '}
                        {authors.join(' · ')}
                      </>
                    )}
                  </IfElse> */}
                  {' · '}
                  {article.date}
                  <IfElse condition={article.tags}>
                    {(tags) => (
                      <>
                        {' · '}
                        {tags.join(' · ')}
                      </>
                    )}
                  </IfElse>
                  {' · '}
                </div>
              </div>
            </figcaption>
          </figure>
        </a>
      </Link>
    </>
  )
}
