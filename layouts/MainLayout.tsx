import { cx } from 'class-variance-authority'
import { lazy, PropsWithChildren, ReactNode } from 'react'
import { Header } from 'components/Header'

const Glow = lazy(() => import('components/Glow'))
const Footer = lazy(() => import('components/Footer'))

function MainLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Glow />
      <Header />
      <main
        className={cx(
          'relative overflow-hidden min-h-screen grid glow',
          'gap-px bg-slate-200',
          'dark:text-slate-50 dark:bg-slate-800',
          'dark:after:from-black after:w-full after:translate-y-full',
          'after:to-transparent after:h-16 after:from-white',
          'after:bottom-0 after:block after:bg-gradient-to-b',
          'after:backdrop-blur-sm after:absolute z-[1]',
          'max-w-[100vw]',
          'grid-rows-[minmax(min-content,max-content)]',
          'grid-cols-[1fr,minmax(0,80ch),1fr]',
        )}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}

export function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>
}

export default MainLayout
