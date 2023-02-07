import { cx } from 'class-variance-authority'
import { useLockBodyScroll, useToggle } from 'react-use'
import { config } from 'site.config'
import { Media } from 'lib/media'
import { Logo } from './Logo'
import { Menu, SubMenu } from './Menu'

export function Header() {
  return (
    <>
      <header
        className={cx(
          'z-10 text-white sticky ring-slate-800 relative',
          'glow bg-slate-800 top-[-2rem] ring-[1px] h-[5rem]',
          'md:top-[-14.9rem] md:h-[17.9rem]',
        )}
      >
        <Media lessThan="md">
          <MobileHeader />
        </Media>
        <Media
          greaterThan="sm"
          className={cx(
            'w-full h-full grid gap-px grid-rows-[6rem,6rem,2.5rem,3.2rem]',
            'grid-cols-[1fr,minmax(0,80ch),1fr]',
          )}
        >
          <DesktopHeader />
        </Media>
      </header>
    </>
  )
}

function MobileHeader() {
  const [locked, toggleLocked] = useToggle(false)
  useLockBodyScroll(locked)

  return (
    <>
      <input
        className="sr-only peer [visibility:hidden]"
        type="checkbox"
        name="menu"
        id="menu"
        onChange={toggleLocked}
        autoFocus={false}
      />
      <label
        className="fixed inset-0 hidden bg-black/75 peer-checked:block"
        htmlFor="menu"
      />
      <label
        className={cx(
          'w-full translate-y-0 text-white ring-slate-200',
          'ring-inset ring-1 py-6 px-2 left-0 bottom-0 bg-black',
          'absolute peer-checked:translate-y-full dark:ring-slate-800',
        )}
        htmlFor="menu"
      >
        <Menu />
        <SubMenu />
      </label>
      <label
        className="absolute inset-0 grid justify-center w-full bg-black"
        htmlFor="menu"
      >
        <Logo
          className={cx(
            'top-0 text-white sticky relative mix-blend-difference',
            'w-[3rem] h-[3rem]',
          )}
          angle={90}
        />
        <div
          className={cx(
            'w-full top-auto mix-blend-difference inset-0',
            'h-5 bottom-1 bg-repeat-x bg-center absolute',
          )}
          style={{ backgroundImage: 'url(/moto.svg)' }}
        />
      </label>
    </>
  )
}

function DesktopHeader() {
  const { title } = config

  return (
    <>
      <div className="absolute inset-0">
        <a
          className={cx(
            'w-full top-0 sticky relative justify-center hidden',
            'md:grid h-[3rem]',
          )}
          href="#"
          title="На верх"
        >
          <Logo
            className="h-[3rem] w-[3rem] text-white mix-blend-difference"
            angle={90}
          />
        </a>
      </div>
      <div className="bg-black" />
      <div
        className={cx(
          'tracking-wider text-2xl justify-center items-end',
          'grid font-montserrat font-bold bg-black',
        )}
      >
        <h1 className="relative mix-blend-difference">
          {title ?? '·К·Р·А·П·И·В·А·'}
        </h1>
      </div>
      <div className="bg-black" />
      <div className="bg-black" />
      <nav>
        <Menu />
      </nav>
      <div className="bg-black" />
      <nav className="col-span-full">
        <SubMenu />
      </nav>
      <div className="grid items-end bg-black col-span-full">
        <div
          className={cx(
            'relative mix-blend-difference h-5 bg-repeat-x',
            'bg-center',
          )}
          style={{ backgroundImage: 'url(/moto.svg)' }}
        />
      </div>
    </>
  )
}
