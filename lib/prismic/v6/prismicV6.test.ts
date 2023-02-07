import { afterEach, describe, expect, test } from 'vitest'
import { getAboutProps } from './getAboutProps'
import { getArticleBySlug } from './getArticleBySlug'
import { getArticleProps } from './getArticleProps'
import {
  getAllArticles,
  getArticlesByAuthorProps,
  getArticlesByTagProps,
  getArticlesProps,
  getCachedArticlesByTagProps,
} from './getArticlesProps'
import { getAllAuthors, getAuthorBySlug } from './getAuthorProps'
// import { getDocumentProps } from './getDocumentProps'
import { getHeaderProps } from './getHeaderProps'
import { getHomepageProps } from './getHomepageProps'
import { getAllCachedTags, getTagsProps } from './getTagsProps'

afterEach(() => {
  delete process.env.TEST_NODE_ENV
})

describe('Prismic  v6 api', () => {
  process.env.TEST_NODE_ENV = 'development'

  test.skip('getHeaderProps', async () => {
    const props = await getHeaderProps()

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.title).toEqual('·К·Р·А·П·И·В·А·')
  })

  test.skip('getTags', async () => {
    const props = await getTagsProps('vtoraya')

    // console.log(JSON.stringify(props, null, 2))
    expect(Object.keys(props?.timeTags).length).toBeGreaterThan(0)
    expect(props?.timeTags[props?.timeTags.length - 1]?.tags?.[0]).toEqual(
      'Декабрь 2019',
    )
  })

  test.skip('getAllCachedTags', async () => {
    const props = await getAllCachedTags()

    // console.log(JSON.stringify(props, null, 2))
    expect(Object.keys(props?.timeTags).length).toBeGreaterThan(0)
    expect(Object.keys(props?.categoriesTags).length).toBeGreaterThan(0)
  })

  test.skip('getAboutProps', async () => {
    const props = await getAboutProps()

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.title).toEqual('·К·Р·А·П·И·В·А·')
  })

  test.skip('getHomepageProps', async () => {
    const props = await getHomepageProps()

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.title).toEqual('·К·Р·А·П·И·В·А·')
  })

  test.skip('getArticleProps on dev', async () => {
    const props = await getArticleProps('dev', 'W_VzsxEAAOMiENgO')

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.title).toEqual('Другая статья')
  })

  test.skip('getArticleProps on vtoraya', async () => {
    const props = await getArticleProps('vtoraya', 'YeRSUhIAACMAw1Jp')

    // console.log(JSON.stringify(props?.slug, null, 2))
    expect(props?.title).toEqual('Гендер в балете и современном танце')
  })

  test.skip('getArticleBySlug on dev', async () => {
    const props = await getArticleBySlug('dev', 'drugaya-statya-21-11-2018')

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.title).toEqual('Другая статья')
  })

  test.skip('getArticleBySlug on vtoraya', async () => {
    const props = await getArticleBySlug(
      'vtoraya',
      'seks-kak-proizvodstvo-23-01-2022',
    )

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.title).toEqual('Секс как производство зрителя')
  })

  test.skip('getArticlesByTagProps on dev', async () => {
    const props = await getArticlesByTagProps('dev', 'Аналитика')

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.items?.[0]?.title).toEqual('Другая статья')
  })

  test.skip('getArticlesByTagProps on rodina', async () => {
    const props = await getArticlesByTagProps('rodina', 'Родина')

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.items?.[0]?.title).toEqual(
      'Поминки по {родине}: спецвыпуск журнала К.Р.А.П.И.В.А.',
    )
  })

  test.skip('getArticlesByTagProps on veschdok', async () => {
    const props = await getArticlesByTagProps('veschdok', 'Вещдок')

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.items?.[0]?.title).toEqual(
      'Гомосексуал и гендер как маркер национальных границ',
    )
  })

  test.skip('getArticlesByTagProps on vtoraya', async () => {
    const props = await getArticlesByTagProps('vtoraya', 'Ревью', {
      pageSize: 6,
      page: 1,
      ordering: 'asc',
    })

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.items?.[0]?.title).toEqual(
      'Феминистская оратория для Хора, Героини и Мужского голоса',
    )
  })

  test.skip('getCachedArticlesByTagProps', async () => {
    const props = await getCachedArticlesByTagProps('vtoraya', 'Июнь 2021', {
      pageSize: 6,
      page: 2,
      ordering: 'asc',
    })

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.page).toBeGreaterThan(1)
  })

  test.skip('getArticlesProps on dev', async () => {
    const props = await getArticlesProps('dev', { pageSize: 2 })

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.items?.length).toBeLessThanOrEqual(2)
  })

  test.skip('getArticlesProps on vtoraya', async () => {
    const props = await getArticlesProps('vtoraya', { pageSize: 2 })

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.items.length).toBeLessThanOrEqual(2)
  })

  test.skip('getAuthorBySlug', async () => {
    const props = await getAuthorBySlug('maks-evstropov')

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.name).toBe('Макс Евстропов')
  })

  test.skip('getArticlesByAuthorProps on vtoraya', async () => {
    const props = await getArticlesByAuthorProps('vtoraya', 'X1Qy_RIAAEWkucBk')

    // console.log(JSON.stringify(props, null, 2))
    expect(props?.items.length).toBeGreaterThan(1)
  })

  // test.skip('getDocumentProps on dev', async () => {
  //   const author = await getDocumentProps('dev', 'XV_RshQAACIA-eqU')
  //   const article = await getDocumentProps('dev', 'W_VzsxEAAOMiENgO')

  //   // console.log(JSON.stringify(author, null, 2))
  //   // console.log(JSON.stringify(article, null, 2))
  //   expect(author?.name).toEqual('Лёша Ачё')
  //   expect(article?.title).toEqual('Другая статья')
  // })

  test.skip('getAllArticles', async () => {
    const articles = await getAllArticles()

    // console.log(JSON.stringify(articles, null, 2))
    expect(articles?.length).toBeGreaterThan(0)
  })

  test.skip('getAllAuthors', async () => {
    const authors = await getAllAuthors()

    // console.log(JSON.stringify(authors, null, 2))
    expect(authors?.length).toBeGreaterThan(0)
  })
})
