import type { PropsWithChildren, ReactNode } from 'react'

const UIKitLayout = ({ children }: PropsWithChildren<unknown>) => (
  <main className="w-full min-h-screen text-black bg-white">{children}</main>
)

export function getLayout(page: ReactNode) {
  return <UIKitLayout>{page}</UIKitLayout>
}

export default UIKitLayout
