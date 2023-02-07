import { ReactNode } from 'react'
import { config } from 'site.config'
import { LinkButton } from './Button'
import IconFacebook from './IconFacebook'
import IconTelegram from './IconTelegram'
import IconTwitter from './IconTwitter'

type Props = {
  title: string
  pathname: string
  hashtags?: string[]
}

export function Share({ title, pathname, hashtags = [] }: Props) {
  return (
    <>
      <div className="text-xl font-bold font-montserrat">Поделиться</div>
      <div className="flex flex-col w-full gap-4 md:flex-row">
        <ShareButton
          href={`http://www.facebook.com/sharer.php?u=${config.siteURL}${pathname}&t=${title}`}
          icon={<IconFacebook />}
        >
          Facebook
        </ShareButton>
        <ShareButton
          href={`http://twitter.com/share?text=${`Читайте на ${config.title} «${title}»`}&url=${
            config.siteURL
          }${pathname}&hashtags=${hashtags.join(',')}`}
          icon={<IconTwitter />}
        >
          Twitter
        </ShareButton>
        <ShareButton
          href={`https://telegram.me/share/url?url=${
            config.siteURL
          }${pathname}&text=${`Читайте «${title}» на @${
            config.socials.telegram.split('/').slice(-1)[0]
          }${hashtags?.length > 0 ? ` #${hashtags.join(' #')}` : ''}`}`}
          icon={<IconTelegram />}
        >
          Telegram
        </ShareButton>
      </div>
    </>
  )
}

function ShareButton({
  href,
  icon,
  children,
}: {
  href: string
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <LinkButton intent="black" size="none" className="text-base" href={href}>
      <>
        <span className="inline-block w-8 h-8">{icon}</span>
        <span className="px-2">{children}</span>
      </>
    </LinkButton>
  )
}
