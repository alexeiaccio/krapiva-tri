import { cx } from 'class-variance-authority'
import type { ReactElement } from 'react'
import type { Nilable } from 'tsdef'
import type { Category } from '../lib/prismic/v6/types'
import { SliderWithLink } from './ArticlesSliders'
import { MediaDevider } from './Divider'
import { HeaderBlock } from './HeaderBlock'
import { IfElse } from './IfElse'
import { Logo } from './Logo'

type Props = { categories: Nilable<Array<Category>> }

export function Categories(props: Props): ReactElement {
  return (
    <IfElse condition={props.categories}>
      {(categories) => (
        <>
          {categories.map((category, index) => (
            <section
              key={category.title}
              className={cx('col-span-full', 'grid grid-cols-[inherit] gap-px')}
            >
              <MediaDevider greaterThan="sm" size="full" className="h-12" />
              <HeaderBlock className="grid gap-4 md:gap-8">
                <Logo
                  className="h-[4rem] w-[4rem] text-theme-green-500"
                  angle={index * 45 + 90}
                />
                <h2 className="text-4xl font-extrabold font-montserrat">
                  {category.title ?? ''}
                </h2>
                <IfElse condition={category.description}>
                  {(description) => (
                    <p className="w-full text-xl font-medium font-cormorant-garamond">
                      {description}
                    </p>
                  )}
                </IfElse>
              </HeaderBlock>
              <IfElse condition={category.articles}>
                {(articles) => (
                  <SliderWithLink
                    data={articles.length > 0 ? articles : [null, null]}
                    href={
                      category.slug === 'arhiv'
                        ? `/${category.slug}`
                        : `/rubriki/${category.slug}`
                    }
                  >
                    {category.title} →
                  </SliderWithLink>
                )}
              </IfElse>
            </section>
          ))}
        </>
      )}
    </IfElse>
  )
}
