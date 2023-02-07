import { cx } from 'class-variance-authority'
import Image from 'next/image'
import Link from 'next/link'
import { Nilable } from 'tsdef'
import type { Article } from 'lib/prismic/v6/types'
import { IfElse } from './IfElse'
import { Logo } from './Logo'

type Props = {
  article: Nilable<Article>
  index?: number
}

export const API = [
  'afisha',
  'dev',
  'krasnoeZnamya',
  'pervaya',
  'rodina',
  'veschdok',
  'vtoraya',
] as const

export type ApiKeys = typeof API[number]

const URLS: Record<ApiKeys, string> = {
  afisha: 'afisha',
  dev: 'dev',
  krasnoeZnamya: 'krasnoe-znamya',
  pervaya: 'pervaya',
  rodina: 'rodina',
  veschdok: 'veschdok',
  vtoraya: 'publikacii',
}

export function ArticleCard({ article, index = 0 }: Props) {
  if (!article) {
    return (
      <div
        className={cx(
          'w-full relative bg-slate-200 aspect-ratio-card',
          'dark:bg-slate-800',
        )}
      >
        <div className="absolute inset-0 grid place-items-center">
          <Logo className="h-[4rem] w-[4rem] text-white" angle={90} />
        </div>
      </div>
    )
  }

  return (
    <>
      <Link
        href={
          article.slug?.includes('arhiv')
            ? article.slug
            : `/${URLS[article.client || 'vtoraya']}/${article.slug}`
        }
        passHref
      >
        <a>
          <figure className="grid gap-2 group">
            <IfElse
              condition={article.image}
              fallback={
                <div
                  className={cx(
                    'w-full transition-opacity relative overflow-hidden',
                    'duration-150 bg-slate-200 aspect-ratio-card',
                    'group-hover:opacity-90 dark:bg-slate-800',
                  )}
                >
                  <div className="absolute inset-0 grid place-items-center">
                    <Logo
                      className="w-full text-theme-green-500"
                      angle={(index * 45 + 90) % 360}
                    />
                  </div>
                </div>
              }
            >
              {(url) => (
                <div
                  className="relative w-full overflow-hidden aspect-ratio-card"
                  style={{ backgroundColor: article.palette || 'transparent' }}
                >
                  <div className="absolute inset-0 grid object-cover">
                    <Image
                      objectFit="cover"
                      src={`${url}?fit=clamp&w=600`}
                      width={600}
                      className="transition-opacity duration-150 group-hover:opacity-90"
                      height={480}
                      alt={article.title ?? ''}
                    />
                  </div>
                </div>
              )}
            </IfElse>
            <figcaption>
              <h3 className="text-lg font-bold leading-tight font-montserrat">
                {article.title}
              </h3>
              <div className="text-sm font-medium font-cormorant-garamond">
                {' · '}
                {[
                  // ...(article.authors || []),
                  article.date,
                  ...(article.tags || []),
                ]
                  .filter(Boolean)
                  .join(' · ')}
                {' · '}
              </div>
            </figcaption>
          </figure>
        </a>
      </Link>
    </>
  )
}
