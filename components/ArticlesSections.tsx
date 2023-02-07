import { cx } from 'class-variance-authority'
import { useRouter } from 'next/router'
import { ReactNode, useMemo, useRef, useState } from 'react'
import { useIntersection } from 'react-use'
// import { config } from 'site.config'
import { Nilable } from 'tsdef'
import { pluralize } from 'lib/pluralize'
import type { ClientKeys } from 'lib/prismic/v6/constants'
import { ArticlesListProps } from 'lib/prismic/v6/getArticlesProps'
import { Article } from 'lib/prismic/v6/types'
import { trpc } from 'lib/trpc/trpc'
import { InfiniteSlider } from './ArticlesSliders'
import { LinkButton } from './Button'
import { Divider, MediaDevider } from './Divider'
import { HeaderBlock } from './HeaderBlock'
import { IfElse } from './IfElse'
import { Logo } from './Logo'
import { Section } from './Section'
import { SliderVariants } from './Slider'

// const Banner = lazy(() => import('components/Banner'))

interface Props {
  client: ClientKeys
}

export function ArticlesSection({ client, mode }: Props & SliderVariants) {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })
  const { data, hasNextPage, fetchNextPage } = trpc.useInfiniteQuery(
    ['prismic.getArticles', { client }],
    {
      getNextPageParam: (lastPage) => lastPage?.nextPage || null,
      enabled: !!intersection?.isIntersecting,
    },
  )

  return (
    <div
      ref={intersectionRef}
      className="grid gap-px grid-cols-[inherit] col-span-full"
    >
      <InfiniteSlider
        pages={data?.pages}
        mode={mode}
        fetchNextPage={hasNextPage ? fetchNextPage : undefined}
      />
    </div>
  )
}

interface TagSectionProps {
  title: string
  index: number
  uid?: string
}

export function TagSection({
  title,
  index,
  uid,
  mode,
}: TagSectionProps & SliderVariants) {
  const router = useRouter()
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })
  const { data, hasNextPage, fetchNextPage } = trpc.useInfiniteQuery(
    ['prismic.getArticlesByTag', { path: router.pathname, uid }],
    {
      getNextPageParam: (lastPage) => lastPage?.nextPage || null,
      enabled: !!(uid && intersection?.isIntersecting),
    },
  )

  return (
    <Section>
      <MediaDevider greaterThan="sm" size="full" className="h-12" />
      <HeaderBlock className="grid grid-cols-2 gap-4 align-baseline">
        <Logo
          className={cx(
            'text-theme-green-500 col-span-full w-[4rem]',
            'h-[4rem]',
          )}
          angle={index * 45 + 90}
        />
        <h2 className="text-3xl font-bold font-montserrat">{title}</h2>
        <IfElse condition={data?.pages?.[0].total}>
          {(total) => (
            <div className="text-base place-self-end">
              {total} {pluralize('публикац', total, ['ия', 'ии', 'ий'])}
            </div>
          )}
        </IfElse>
      </HeaderBlock>
      <div
        ref={intersectionRef}
        className="grid grid-cols-[inherit] col-span-full"
      >
        <InfiniteSlider
          pages={data?.pages}
          mode={mode}
          fetchNextPage={hasNextPage ? fetchNextPage : undefined}
        />
      </div>
      <IfElse condition={index % 8 === 0}>
        {() => (
          <>
            <MediaDevider greaterThan="sm" size="full" className="h-12" />
            {/* <aside className="col-span-full">
              <Banner banner={config.banners[index % 2]} />
            </aside> */}
            <MediaDevider greaterThan="sm" size="full" className="h-12" />
          </>
        )}
      </IfElse>
    </Section>
  )
}

interface GridSectionProps {
  title: ReactNode
  total: number
  pages: {
    items: Article[]
  }[]
  avatar?: ReactNode
  description?: ReactNode
  children?: ReactNode
}

export function ArticlesGridSection({
  avatar,
  title,
  description,
  total,
  pages,
  children,
}: GridSectionProps) {
  const [page, setPage] = useState(1)
  const articles = useMemo(() => pages.slice(0, page), [page, pages])

  return (
    <Section width="wide">
      <MediaDevider greaterThan="sm" size="full" className="h-12" />
      <HeaderBlock className="grid gap-4 place-items-center">
        <IfElse
          condition={avatar}
          fallback={
            <Logo
              className="h-[4rem] w-[4rem] text-theme-green-500"
              angle={90}
            />
          }
        >
          {() => <>{avatar}</>}
        </IfElse>
        <h1 className="text-3xl font-bold font-montserrat md:text-5xl">
          {title}
        </h1>
        <IfElse condition={description}>
          {() => <div>{description}</div>}
        </IfElse>
        <div className="text-base place-self-end">
          {total} {pluralize('публикац', total, ['ия', 'ии', 'ий'])}
        </div>
      </HeaderBlock>
      <div className="grid gap-px grid-cols-[inherit] col-span-full">
        <InfiniteSlider
          pages={articles}
          fetchNextPage={
            page < pages.length ? () => setPage(page + 1) : undefined
          }
          mode="grid"
        />
      </div>
      {children}
      <MediaDevider greaterThan="sm" size="full" className="h-12" />
      {/* <aside className="col-span-full">
        <Banner banner={config.banners[0]} />
      </aside> */}
      <Divider size="full" className="h-12" />
    </Section>
  )
}

interface PagedGridProps extends Omit<GridSectionProps, 'children' | 'pages'> {
  pathname: string
  client?: Nilable<ClientKeys | 'no'>
  articles: ArticlesListProps
  uid?: Nilable<string>
}

export function ArticlesPagedGridSection({
  articles,
  pathname,
  client,
  uid,
  ...props
}: PagedGridProps) {
  return (
    <ArticlesGridSection {...props} pages={[{ items: articles?.items || [] }]}>
      <IfElse condition={(articles?.totalPages ?? 0) > 1}>
        {() => (
          <HeaderBlock className="grid grid-cols-3 gap-4 place-items-center">
            <IfElse
              condition={(articles?.page ?? 0) > 1 && client ? client : null}
              fallback={<div />}
            >
              {(pid) => (
                <LinkButton
                  href={{
                    pathname,
                    query: {
                      ...(uid ? { uid } : {}),
                      pid:
                        pid === 'no'
                          ? `${(articles?.page ?? 0) - 1}`
                          : [pid, `${(articles?.page ?? 0) - 1}`],
                    },
                  }}
                >
                  <>← Назад</>
                </LinkButton>
              )}
            </IfElse>
            <IfElse condition={articles?.page && articles?.totalPages}>
              {() => (
                <div>
                  {articles?.page}/{articles?.totalPages}
                </div>
              )}
            </IfElse>
            <IfElse
              condition={
                (articles?.page ?? 0) < (articles?.totalPages ?? 0) && client
                  ? client
                  : null
              }
              fallback={<div />}
            >
              {(pid) => (
                <LinkButton
                  href={{
                    pathname,
                    query: {
                      ...(uid ? { uid } : {}),
                      pid:
                        pid === 'no'
                          ? `${(articles?.page ?? 0) + 1}`
                          : [pid, `${(articles?.page ?? 0) + 1}`],
                    },
                  }}
                >
                  <>Вперед →</>
                </LinkButton>
              )}
            </IfElse>
          </HeaderBlock>
        )}
      </IfElse>
    </ArticlesGridSection>
  )
}
