import { cx } from 'class-variance-authority'
import { config } from 'site.config'
import { LinkButton } from './Button'
import { Logo } from './Logo'
import { Menu, SubMenu } from './Menu'

export function Footer() {
  const { title } = config

  return (
    <footer
      className={cx('text-white sticky relative grid glow gap-px font-semibold', 'bottom-0 bg-slate-800 grid-rows-[6rem,min-content,1fr,6.5rem,2.5rem]', 'grid-cols-[1fr,minmax(0,80ch),1fr] md:grid-rows-[6rem,min-content,1fr,2.5rem,2.5rem]')}
    >
      <div className="grid bg-black col-span-full place-items-end">
        <div
          className="relative w-full h-5 bg-repeat-x animate-marquee-reverse"
          style={{ backgroundImage: 'url(/moto.svg)' }}
        />
      </div>
      <div className="bg-black" />
      <div className="grid gap-2 pt-3 pb-2 bg-black place-items-center">
        <Logo
          className="relative h-[3rem] w-[3rem] text-theme-green-500"
          angle={90}
        />
        <h1 className="text-xl font-bold tracking-wider font-montserrat">
          {title ?? '·К·Р·А·П·И·В·А·'}
        </h1>
      </div>
      <div className="bg-black" />
      <div className="bg-black" />
      <nav>
        <Menu place="footer" />
      </nav>
      <div className="bg-black" />
      <nav className="bg-black col-span-full">
        <SubMenu />
      </nav>
      <div
        className={cx('text-xs items-center grid-cols-2 grid gap-px', 'font-montserrat col-span-full')}
      >
        <div
          className={cx('whitespace-nowrap px-4 items-center h-full font-semibold', 'font-montserrat flex bg-black')}
        >
          разработка{' '}
          <LinkButton
            intent="link"
            size="small"
            className="hover:text-theme-green-500"
            href="https://beta.accio.pro"
          >
            <>accio</>
          </LinkButton>
        </div>
        <div className="flex items-center h-full px-4 bg-black">
          2018—{new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}

export default Footer
