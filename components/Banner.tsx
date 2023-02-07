import { cx } from 'class-variance-authority'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import type { Nilable } from 'tsdef'
import type { Banner as BannerType } from 'lib/prismic/v6/types'
import { Button } from './Button'
import { HTML } from './HTML'
import { IfElse } from './IfElse'
import { Link } from './Link'

const MeshGradient = dynamic(import('./MeshGradient'), { ssr: false })

type Props = { banner: Nilable<BannerType>; className?: string }

export function Banner({ banner, className }: Props) {
  if (!banner) return null

  return (
    <Link href={banner.link || '/'}>
      <a
        className={cx(
          'relative py-16 place-items-end group grid gap-y-2',
          'gap-x-4 col-span-full bg-theme-green-700 md:py-24',
          'md:gap-y-4',
          className,
          ...[banner.image ? 'h-[75vh]' : []],
        )}
      >
        <IfElse condition={banner.image}>
          {(url) => (
            <div className="absolute inset-0 grid object-cover">
              <Image
                priority
                objectFit="cover"
                src={`${url}?fit=clamp&w=1920`}
                width={1920}
                height={1080}
                alt=""
              />
            </div>
          )}
        </IfElse>
        <IfElse condition={banner.palette}>
          {(palette) => (
            <MeshGradient
              palette={[
                palette.colors[0],
                palette.dominant_colors?.vibrant_dark,
                palette.dominant_colors?.vibrant,
                palette.dominant_colors?.muted_dark,
              ]}
              className="opacity-30"
            />
          )}
        </IfElse>
        <IfElse condition={banner.colors}>
          {(colors) => (
            <MeshGradient
              rgb={colors}
              className={cx(
                'transition-opacity opacity-50 group-hover:opacity-70',
                'duration-[350ms]',
              )}
            />
          )}
        </IfElse>
        <div
          className={cx(
            'w-full relative px-8 place-items-start grid gap-4',
            'md:px-16 md:place-items-center',
            'md:gap-8 md:grid-cols-[1fr,min-content]',
          )}
        >
          <HTML
            className={cx(
              'w-full text-xl text-white max-w-prose font-medium',
              'font-cormorant-garamond md:text-2xl',
              'drop-shadow-[1px_1px_2px_rgba(7_146_104_/_1)]',
            )}
          >
            {banner.text}
          </HTML>
          <IfElse condition={banner.button}>
            {(button) => (
              <Button
                intent="filled"
                size="medium"
                className={cx(
                  'uppercase font-montserrat block md:py-4 md:px-12',
                  'group-hover:text-theme-green-500 group-hover:bg-transparent',
                )}
              >
                {button}
              </Button>
            )}
          </IfElse>
        </div>
      </a>
    </Link>
  )
}

export default Banner
