import { cx } from 'class-variance-authority'
import NextImage, { ImageProps } from 'next/image'
import { useId } from 'react'
import { useLockBodyScroll, useToggle } from 'react-use'

const loader = ({ src, width, height, quality }: ImageProps) => {
  const url = new URL(src.toString())
  url.searchParams.append('fit', 'clamp')
  if (width) url.searchParams.append('w', width.toString())
  if (height) url.searchParams.append('h', height.toString())
  if (quality) url.searchParams.append('q', quality.toString())

  return url.toString()
}

export function Image({ alt = '', className, ...props }: ImageProps) {
  return <NextImage loader={loader} alt={alt} {...props} />
}

export function ImageWithZoom({ className, alt = '', ...props }: ImageProps) {
  const id = useId()
  const [locked, toggleLocked] = useToggle(false)
  useLockBodyScroll(locked)

  return (
    <>
      <input
        className="sr-only peer [visibility:hidden]"
        type="checkbox"
        name={`image-${id}`}
        id={`image-${id}`}
        onChange={toggleLocked}
      />
      <label
        htmlFor={`image-${id}`}
        className={cx('flex cursor-zoom-in', className)}
      >
        <Image {...props} alt={alt} />
      </label>
      <label
        className={cx('z-10 pt-6 justify-center items-center inset-0', 'hidden fixed duration-150 cursor-zoom-out bg-white/75', 'backdrop-blur-sm animate-show peer-checked:flex', 'md:pt-10 dark:bg-black/75')}
        htmlFor={`image-${id}`}
      >
        <div className="relative w-screen h-[90vh] md:w-[90vw]">
          <Image
            {...props}
            width={1920}
            layout="fill"
            objectFit="contain"
            alt={alt}
          />
        </div>
      </label>
    </>
  )
}
