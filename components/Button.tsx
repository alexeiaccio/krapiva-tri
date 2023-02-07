import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link, Props as LinkProps } from './Link'

export const button = cva(
  [
    'inline-flex place-items-center font-montserrat',
    'font-semibold ring-1 transition-color duration-75',
  ],
  {
    variants: {
      intent: {
        filled: [
          'ring-inset bg-theme-green-500 text-black',
          'ring-theme-green-500 hover:bg-transparent',
          'hover:text-theme-green-500',
        ],
        black: [
          'bg-black text-white ring-black',
          'dark:bg-white dark:text-black dark:ring-white',
          'hover:bg-transparent hover:text-black',
          'dark:hover:text-white',
        ],
        outlined: 'bg-transparent text-white ring-slate-800 hover:bg-slate-800',
        link: 'bg-black text-white ring-0 hover:text-theme-green-500',
        flat: 'bg-slate-200 dark:bg-slate-800 text-theme-green-500 ring-0 hover:bg-opacity-75',
      },
      size: {
        link: 'text-xs p-0',
        small: 'text-xs py-1 px-2',
        medium: 'text-base py-2 px-4',
        large: 'text-lg py-4 px-8',
        auto: 'text-xs h-full w-full',
        none: '',
      },
    },
    compoundVariants: [
      { intent: 'link', size: 'link' },
      { intent: 'filled', size: 'medium', class: 'uppercase' },
    ],
    defaultVariants: {
      intent: 'filled',
      size: 'medium',
    },
  },
)

export type ButtonVariants = VariantProps<typeof button>

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants

export function Button({
  children,
  className,
  intent,
  size,
  ...props
}: ButtonProps) {
  return (
    <button className={button({ intent, size, class: className })} {...props}>
      {children}
    </button>
  )
}

type AProps = AnchorHTMLAttributes<HTMLAnchorElement> & ButtonVariants

export function A({ children, className, intent, size, ...props }: AProps) {
  return (
    <a className={button({ intent, size, class: className })} {...props}>
      {children}
    </a>
  )
}

export function LinkButton({
  children,
  className,
  intent,
  size,
  href,
  ...props
}: LinkProps & ButtonVariants & { className?: string }) {
  return (
    <Link href={href}>
      <a className={button({ intent, size, class: className })} {...props}>
        {children}
      </a>
    </Link>
  )
}
