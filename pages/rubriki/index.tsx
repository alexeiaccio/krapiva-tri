import type { InferGetStaticPropsType } from 'next'
import { TagSection } from 'components/ArticlesSections'
import { List } from 'components/List'
import { ListSEO } from 'components/SEO'
import { getLayout } from 'layouts/IndexLayout'
import { getAllTags } from 'lib/prismic/v6/getTagsProps'
import { createSSG } from 'server/createSSG'

export async function getStaticProps() {
  const ssg = await createSSG()

  const tags = await getAllTags()
  const uid = tags?.categoriesTags?.[0]?.clients.find(
    ({ client }) => client === 'vtoraya',
  )?.slug

  await ssg.fetchInfiniteQuery('prismic.getArticlesByTag', {
    path: '/rubriki',
    uid,
  })

  return {
    props: {
      tags,
      trpcState: ssg.dehydrate(),
    },
  }
}

function CategoriesPage({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <ListSEO
        title="Рубрики"
        links={tags.categoriesTags.map((item) => item.slug || '')}
      />
      <List data={tags.categoriesTags}>
        {({ key, slug }, index) => (
          <TagSection key={key} title={key} uid={slug} index={index} />
        )}
      </List>
    </>
  )
}

CategoriesPage.getLayout = getLayout

export default CategoriesPage
