import { createSSGHelpers } from '@trpc/react/ssg'
import type { CreateNextContextOptions } from '@trpc/server/adapters/next'
import superjson from 'superjson'
import { createContext } from './context'
import { appRouter } from './routers/_app'

export async function createSSG(ctx?: CreateNextContextOptions) {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: await createContext(ctx),
    transformer: superjson,
  })
  return ssg
}
