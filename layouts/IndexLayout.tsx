import type { PropsWithChildren, ReactNode } from 'react'
import { getLayout as getMainLayout } from './MainLayout'

const IndexLayout = ({ children }: PropsWithChildren<unknown>) => (
  <>{children}</>
)

export function getLayout(page: ReactNode) {
  return getMainLayout(<IndexLayout>{page}</IndexLayout>)
}

export default IndexLayout
