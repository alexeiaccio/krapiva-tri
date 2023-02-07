import { cx } from 'class-variance-authority'
import { HTMLAttributes, ReactNode } from 'react'
import { Divider } from './Divider'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function HeaderBlock({ children, className, ...props }: Props) {
  return (
    <>
      <Divider />
      <div className={cx('p-4 bg-white dark:bg-black', className)} {...props}>
        {children}
      </div>
      <Divider />
    </>
  )
}
