import { cva, VariantProps } from 'class-variance-authority'
import { HTMLAttributes } from 'react'
import { Media, MediaComponentProps } from 'lib/media'

export const divider = cva('bg-white dark:bg-black', {
  variants: {
    size: {
      default: '',
      full: 'col-span-full',
    },
  },
  defaultVariants: { size: 'default' },
})

export type DividerVariants = VariantProps<typeof divider> &
  HTMLAttributes<HTMLDivElement>

export function Divider({ size, className, ...props }: DividerVariants) {
  return <div className={divider({ size, class: className })} {...props} />
}

export function MediaDevider({
  size,
  className,
  ...props
}: VariantProps<typeof divider> & Omit<MediaComponentProps, 'children'>) {
  return (
    <Media className={divider({ size, class: className })} {...props}>
      {null}
    </Media>
  )
}
