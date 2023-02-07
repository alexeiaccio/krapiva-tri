import { cx } from 'class-variance-authority'
import type { ReactElement } from 'react'
import type { Nilable } from 'tsdef'
import type { Article } from 'lib/prismic/v6/types'
import { List } from './List'
import { NewArticleCard } from './NewArticleCard'

type Props = { articles: Nilable<Array<Article>> }

export function NewArticles(props: Props): ReactElement {
  return (
    <section className="bg-black col-span-full">
      <ul
        className={cx('w-full py-1 grid-flow-row grid-cols-1 grid gap-px', 'md:py-2 md:grid-rows-3 md:grid-cols-3 md:gap-2')}
      >
        <List data={props.articles}>
          {(article, idx) => (
            <li
              key={article.id}
              className={`min-h-0 ${
                idx === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <NewArticleCard {...{ article }} />
            </li>
          )}
        </List>
      </ul>
    </section>
  )
}
