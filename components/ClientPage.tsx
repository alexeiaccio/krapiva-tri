import { NextSeo } from 'next-seo'
// import { config } from 'site.config'
import { ClientKeys } from 'lib/prismic/v6/constants'
import { trpc } from 'lib/trpc/trpc'
import { ArticlesSection } from './ArticlesSections'
// import Banner from './Banner'
import { Divider, MediaDevider } from './Divider'
import { HeaderBlock } from './HeaderBlock'
import { IfElse } from './IfElse'
import { Logo } from './Logo'
import { Section } from './Section'
import { ListSEO } from './SEO'

interface Props {
  title: string
  client: ClientKeys
}

export function ClientPage({ title, client }: Props) {
  const { data } = trpc.useInfiniteQuery(['prismic.getArticles', { client }])

  return (
    <>
      <IfElse
        condition={client !== 'dev'}
        fallback={<NextSeo nofollow={true} />}
      >
        {() => (
          <ListSEO
            title={title}
            links={(data?.pages?.[0]?.items || []).map(
              (item) => item.slug || '',
            )}
          />
        )}
      </IfElse>
      <Section width="wide">
        <MediaDevider greaterThan="sm" size="full" className="h-12" />
        <HeaderBlock className="grid gap-4 place-items-center">
          <Logo className="h-[4rem] w-[4rem] text-theme-green-500" angle={90} />
          <h1 className="text-3xl font-bold font-montserrat md:text-5xl">
            {title}
          </h1>
        </HeaderBlock>
        <ArticlesSection client={client} mode="grid" />
        <MediaDevider greaterThan="sm" size="full" className="h-12" />
        {/* <aside className="col-span-full">
          <Banner banner={config.banners[1]} />
        </aside> */}
        <Divider size="full" className="h-12" />
      </Section>
    </>
  )
}
