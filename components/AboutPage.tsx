import { cx } from 'class-variance-authority'
import Image from 'next/image'
// import { lazy } from 'react'
// import { config } from 'site.config'
import type { Nilable } from 'tsdef'
import type { AboutProps } from 'lib/prismic/v6/getAboutProps'
import { Author } from 'lib/prismic/v6/types'
import { Avatar } from './Avatar'
// import { LinkButton } from './Button'
import { Divider, MediaDevider } from './Divider'
import { HeaderBlock } from './HeaderBlock'
import { HTML } from './HTML'
import { IfElse } from './IfElse'
import { Link } from './Link'
import { Logo } from './Logo'

// const Banner = lazy(() => import('components/Banner'))

type Props = {
  about: Nilable<AboutProps>
  authors?: Nilable<Author[]>
}

export function AboutExcerpt(props: Props) {
  return (
    <IfElse condition={props.about}>
      {(about) => (
        <section
          key={about.title}
          className={cx('col-span-full', 'grid gap-px grid-cols-[inherit]')}
        >
          <HeaderBlock
            className={cx(
              'grid gap-4 place-items-center',
              'grid-rows-[min-content] md:gap-8',
            )}
          >
            <Logo
              className="h-[4rem] w-[4rem] text-theme-green-500"
              angle={90}
            />
            <h2 className="text-4xl font-extrabold font-montserrat">
              {about.title ?? ''}
            </h2>
            <IfElse condition={about.lead}>
              {(lead) => (
                <HTML className="w-full text-xl font-medium font-cormorant-garamond">
                  {lead}
                </HTML>
              )}
            </IfElse>
          </HeaderBlock>
          <HeaderBlock className="grid gap-8 p-4 bg-white dark:bg-black">
            <IfElse condition={about.image}>
              {(url) => (
                <figure className="grid gap-2">
                  <div
                    className="w-full relative pb-[62.218%] overflow-hidden"
                    style={{ backgroundColor: about.palette || '' }}
                  >
                    <div className="absolute inset-0 grid object-cover">
                      <Image
                        objectFit="cover"
                        src={`${url}?fit=clamp&w=1024`}
                        width={1024}
                        height={720}
                        alt={about.title ?? ''}
                      />
                    </div>
                  </div>
                  <IfElse condition={about.caption}>
                    {(caption) => (
                      <HTML
                        as="figcaption"
                        className="w-full text-sm text-slate-800 dark:text-slate-200"
                      >
                        {caption}
                      </HTML>
                    )}
                  </IfElse>
                </figure>
              )}
            </IfElse>
            {/* <LinkButton
              href="/o-nas"
              intent="filled"
              size="large"
              className="font-semibold uppercase font-montserrat place-self-center"
            >
              <>о редакции →</>
            </LinkButton> */}
            <Divider />
          </HeaderBlock>
          <Divider size="full" className="h-12" />
        </section>
      )}
    </IfElse>
  )
}

export function AboutPage(props: Props) {
  return (
    <>
      <IfElse condition={props.about}>
        {(about) => (
          <section
            className={cx('col-span-full', 'grid gap-px grid-cols-[inherit]')}
          >
            <HeaderBlock
              className={cx(
                'grid gap-4 place-items-center',
                'grid-rows-[min-content] md:gap-8',
              )}
            >
              <Logo
                className="h-[4rem] w-[4rem] text-theme-green-500"
                angle={90}
              />
              <h2 className="text-4xl font-extrabold font-montserrat">
                {about.title ?? ''}
              </h2>
              <IfElse condition={about.lead}>
                {(lead) => (
                  <HTML className="w-full text-xl font-medium font-cormorant-garamond">
                    {lead}
                  </HTML>
                )}
              </IfElse>
            </HeaderBlock>
            <HeaderBlock className="grid gap-8 p-4 bg-white dark:bg-black">
              <IfElse condition={about.image}>
                {(url) => (
                  <figure className="grid gap-2">
                    <div
                      className="w-full relative pb-[62.218%] overflow-hidden"
                      style={{ backgroundColor: about.palette || '' }}
                    >
                      <div className="absolute inset-0 grid object-cover">
                        <Image
                          objectFit="cover"
                          src={`${url}?fit=clamp&w=1024`}
                          width={1024}
                          height={720}
                          alt={about.title ?? ''}
                        />
                      </div>
                    </div>
                    <IfElse condition={about.caption}>
                      {(caption) => (
                        <HTML
                          as="figcaption"
                          className="w-full text-sm text-slate-800 dark:text-slate-200"
                        >
                          {caption}
                        </HTML>
                      )}
                    </IfElse>
                  </figure>
                )}
              </IfElse>
            </HeaderBlock>
            <IfElse condition={about.text}>
              {(text) => (
                <HeaderBlock>
                  <HTML className="text-lg font-cormorant-garamond">
                    {text}
                  </HTML>
                </HeaderBlock>
              )}
            </IfElse>
            <MediaDevider greaterThan="sm" size="full" className="h-12" />
          </section>
        )}
      </IfElse>
      {/* <aside className="col-span-full">
        <Banner banner={config.banners[1]} />
      </aside> */}
      <Divider size="full" className="h-12" />
      <IfElse condition={props.authors?.length !== 0 ? props.authors : null}>
        {(authors) => (
          <section
            className={cx('col-span-full', 'grid gap-px grid-cols-[inherit]')}
          >
            <HeaderBlock
              className={cx(
                'justify-center items-start grid gap-8 md:grid-cols-2',
                'md:gap-12',
              )}
            >
              {authors.map((author) => (
                <Link key={author.id} href={`/o-nas/${author.slug}`}>
                  <a className="grid gap-4 place-items-center group">
                    <Avatar
                      avatars={author?.avatars}
                      size={244}
                      className="transition-opacity duration-150 group-hover:90"
                    />
                    <h5
                      className={cx(
                        'text-lg text-center inline-flex gap-2 font-semibold',
                        'font-montserrat md:text-xl',
                      )}
                    >
                      {author?.name}
                      <IfElse condition={author.type === 'redsovet'}>
                        {() => (
                          <Logo
                            className="w-6 text-theme-green-500"
                            angle={0}
                            title="Редсовет"
                          />
                        )}
                      </IfElse>
                    </h5>
                  </a>
                </Link>
              ))}
            </HeaderBlock>
            <Divider size="full" className="h-12" />
          </section>
        )}
      </IfElse>
      <MediaDevider greaterThan="sm" size="full" className="h-12" />
      {/* <aside className="col-span-full">
        <Banner banner={config.banners[0]} />
      </aside> */}
      <Divider size="full" className="h-12" />
    </>
  )
}
