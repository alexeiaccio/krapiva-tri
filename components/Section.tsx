import { cva, VariantProps } from 'class-variance-authority'
import { ReactNode } from 'react'

const section = cva('col-span-full grid gap-px', {
  variants: {
    width: {
      inherit: 'grid-cols-[inherit]',
      wide: 'grid-cols-[1fr,minmax(0,112ch),1fr]',
    },
  },
  defaultVariants: { width: 'inherit' },
})

type SectionVariants = VariantProps<typeof section>

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Section({
  children,
  className,
  width,
  ...props
}: Props & SectionVariants) {
  return (
    <section className={section({ width, class: className })} {...props}>
      {children}
    </section>
  )
}
