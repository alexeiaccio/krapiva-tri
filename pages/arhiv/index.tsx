import type { InferGetStaticPropsType } from 'next'
import { TagSection } from 'components/ArticlesSections'
import { MediaDevider } from 'components/Divider'
import { HeaderBlock } from 'components/HeaderBlock'
import { List } from 'components/List'
import { Logo } from 'components/Logo'
import { Section } from 'components/Section'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import { getAllTags } from 'lib/prismic/v6/getTagsProps'
import { createSSG } from 'server/createSSG'

export async function getStaticProps() {
  const ssg = await createSSG()

  const tags = await getAllTags()
  const uid = tags?.timeTags?.[0]?.tags?.[0]?.clients.find(
    ({ client }) => client === 'vtoraya',
  )?.slug

  await ssg.fetchInfiniteQuery('prismic.getArticlesByTag', {
    path: '/arhive',
    uid,
  })

  return {
    props: {
      tags,
      trpcState: ssg.dehydrate(),
    },
  }
}

function TimePage({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO
        title="Архив"
        links={tags.timeTags.flatMap((item) =>
          item.tags.map((i) => i.slug || ''),
        )}
      />
      <List data={tags.timeTags}>
        {({ year, tags }, index) => (
          <Section key={year}>
            <MediaDevider greaterThan="sm" size="full" className="h-12" />
            <HeaderBlock className="grid gap-4">
              <Logo
                className="h-[4rem] w-[4rem] text-theme-green-500"
                angle={index * 45 + 90}
              />
              <h2 className="text-3xl font-bold font-montserrat">{year}</h2>
            </HeaderBlock>
            <List data={tags}>
              {({ key, slug }, index) => (
                <TagSection
                  key={`${key} ${year}`}
                  title={`${key} ${year}`}
                  uid={slug}
                  index={index}
                />
              )}
            </List>
          </Section>
        )}
      </List>
    </>
  )
}

TimePage.getLayout = getLayout

export default TimePage
