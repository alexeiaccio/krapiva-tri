import { cx } from 'class-variance-authority'
import { ReactNode, useState } from 'react'
import { Nilable } from 'tsdef'
import { Author } from 'lib/prismic/v6/types'
import { IfElse } from './IfElse'
import { Image } from './Image'
import { Logo } from './Logo'

interface Props {
  size: number
  avatars?: Nilable<Author['avatars']>
  className?: string
  children?: ReactNode
}

export function Avatar({ avatars, size, className, children }: Props) {
  const [avatar] = useState(
    () => avatars?.[Math.floor(Math.random() * (avatars?.length || 0))],
  )

  const style = {
    width: size,
    height: size,
    backgroundColor: avatar?.palette || 'transparent',
  }

  return (
    <div
      className={cx('relative overflow-hidden rounded-full', className)}
      style={style}
    >
      <IfElse
        condition={avatar?.src}
        fallback={
          <div
            className={cx('text-theme-green-600 place-items-center inset-0', 'grid bg-slate-300 absolute dark:text-theme-green-500', 'dark:bg-slate-700')}
          >
            <Logo className="w-24 h-24" angle={90} />
          </div>
        }
      >
        {(src) => (
          <Image
            src={src}
            width={size}
            height={size}
            objectFit="cover"
            alt=""
          />
        )}
      </IfElse>
      {children}
    </div>
  )
}
