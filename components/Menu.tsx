import { cva, cx, VariantProps } from 'class-variance-authority'
import { config } from 'site.config'
import { LinkButton } from './Button'

const menu = cva('h-full w-full gap-px font-semibold font-montserrat', {
  variants: {
    place: {
      header: 'flex items-stretch justify-center flex-wrap flex-row',
      footer: 'grid h-full grid-flow-col grid-rows-4 grid-col-2',
    },
  },
  defaultVariants: { place: 'header' },
})

const li = cva('bg-black', {
  variants: {
    place: {
      header: 'flex items-center justify-center flex-grow flex-shrink-0',
      footer: 'grid place-items-center',
    },
  },
  defaultVariants: { place: 'header' },
})

const link = cva(
  'inline-flex items-center justify-center whitespace-nowrap uppercase',
  {
    variants: {
      place: {
        header:
          'relative flex-grow flex-shrink-0 mix-blend-difference px-6 py-4 md:py-2',
        footer: 'px-4 py-3.5 md:justify-start',
      },
    },
    defaultVariants: { place: 'header' },
  },
)

export type MenuVariants = VariantProps<typeof menu>

export function Menu({ place }: MenuVariants) {
  const { pageLinks } = config

  return (
    <menu className={menu({ place })}>
      {pageLinks?.map((item) =>
        item.link ? (
          <li key={item.link} className={li({ place })}>
            <LinkButton
              href={item.link}
              intent="link"
              size="auto"
              className={link({ place })}
            >
              <>{item.title?.text}</>
            </LinkButton>
          </li>
        ) : null,
      )}
    </menu>
  )
}

export function SubMenu() {
  const { links } = config

  return (
    <menu
      className={cx('w-full text-xs justify-center items-stretch', 'h-full font-semibold font-montserrat flex-wrap', 'flex-row flex')}
    >
      {links?.map((item) => (
        <li
          key={item.link?.url}
          className={cx('py-4 px-6 justify-center items-center flex-shrink-0', 'flex-grow flex bg-black md:p-0')}
        >
          <LinkButton
            intent="link"
            size="auto"
            className={cx('whitespace-nowrap uppercase relative mix-blend-difference', 'justify-center items-center inline-flex')}
            href={item.link?.url}
          >
            <>{item.title?.text}</>
          </LinkButton>
        </li>
      ))}
    </menu>
  )
}
