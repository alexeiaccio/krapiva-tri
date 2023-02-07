import { cx } from 'class-variance-authority'
import { LinkProps } from 'next/link'
import { ReactNode, useEffect, useMemo, useRef } from 'react'
import { useIntersection } from 'react-use'
import type { Nilable } from 'tsdef'
import type { Article } from 'lib/prismic/v6/types'
import { ArticleCard } from './ArticleCard'
import { LinkButton } from './Button'
import { li, Slider, SliderVariants } from './Slider'

interface Props {
  data: Array<Nilable<Article>>
}

export function SliderWithLink({
  data,
  href,
  children,
  mode,
  ...props
}: Props & LastItemProps & SliderVariants) {
  return (
    <Slider
      data={data}
      mode={mode}
      lastItem={
        <LastItem href={href} {...props}>
          {children}
        </LastItem>
      }
    >
      {(article) => <ArticleCard article={article} />}
    </Slider>
  )
}

interface LastItemProps extends LinkProps {
  children: ReactNode
}

function LastItem({ href, children, ...props }: LastItemProps) {
  return (
    <LinkButton
      href={href}
      {...props}
      passHref
      intent="flat"
      size="none"
      className="block w-full relative pb-[62.218%]"
    >
      <span
        className={cx('uppercase place-items-center inset-0 grid font-semibold', 'font-montserrat absolute')}
      >
        {children}
      </span>
    </LinkButton>
  )
}

export interface InfinitySliderProps {
  pages: Nilable<
    {
      items: Article[]
    }[]
  >
  fetchNextPage?: (...args: any[]) => any
}

export function InfiniteSlider({
  pages,
  fetchNextPage,
  mode,
}: InfinitySliderProps & SliderVariants) {
  const data = useMemo(
    () => (pages || []).flatMap((page) => page.items),
    [pages],
  )
  return (
    <Slider
      data={data}
      mode={mode}
      lastItem={
        fetchNextPage ? (
          <InfinitySliderLastItem fetchNextPage={fetchNextPage} mode={mode} />
        ) : null
      }
    >
      {(article) => <ArticleCard article={article} />}
    </Slider>
  )
}

function InfinitySliderLastItem({
  fetchNextPage,
  mode,
}: Pick<InfinitySliderProps, 'fetchNextPage'> & SliderVariants) {
  const intersectionRef = useRef(null)
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })

  useEffect(() => {
    if (fetchNextPage && intersection?.isIntersecting) {
      fetchNextPage()
    }
  }, [fetchNextPage, intersection?.isIntersecting])

  return fetchNextPage ? (
    <div ref={intersectionRef} className={li({ mode })}>
      <div
        className={cx('w-full bg-slate-100 aspect-ratio-card animate-pulse', 'dark:bg-slate-900 md:w-[150%]')}
      />
    </div>
  ) : null
}
