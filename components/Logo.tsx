import type { HTMLAttributes, ReactElement } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  angle?: number
  stroke?: boolean
}

export function Logo({
  angle = 90,
  className = '',
  stroke,
  ...props
}: Props): ReactElement {
  return (
    <div
      className={`${className} grid place-items-center justify-center`}
      {...props}
    >
      <svg
        className={`${stroke ? 'stroke-current' : 'fill-current'}`}
        style={{ transform: `rotate(${angle}deg)` }}
        width="100%"
        viewBox="0 0 60 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 30L0 18V0L12 12L24 0L36 12L48 0L60 12V30L48 18L36 30L24 18L12 30Z" />
      </svg>
    </div>
  )
}
