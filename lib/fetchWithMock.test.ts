import fs from 'fs/promises'
import { afterEach, describe, expect, test } from 'vitest'
import { CACHE_FOLDER_PATH, fetchWithMock, hash } from './fetchWithMock'

const endpoint = 'https://mocki.io/v1/9dfc91eb-8999-4e3c-8f5c-94f8932a0512'
const filename = `${CACHE_FOLDER_PATH}/test_${hash(endpoint)}.json`

afterEach(async () => {
  delete process.env.TEST_NODE_ENV
  try {
    await fs.rm(filename)
  } catch {}
})

describe.skip('fetchWithMock should works', () => {
  process.env.TEST_NODE_ENV = 'development'

  test('fetch result have to be mocked into file', async () => {
    let checkBefore
    try {
      checkBefore = await fs.stat(filename)
    } catch {}
    expect(checkBefore).toBeUndefined()

    const firstPass = await fetchWithMock(endpoint, {}, 'test').then((res) =>
      res.json(),
    )
    expect(firstPass).toBeTruthy()

    const mock = await fs.readFile(filename, 'utf-8')
    expect(mock).toBeTruthy()
    expect(filename).toContain('test')

    const secondPass = await fetchWithMock(endpoint, {}, 'test').then((res) =>
      res.json(),
    )
    expect(secondPass).toEqual(JSON.parse(mock))

    await fs.rm(filename)
    let checkAfter
    try {
      checkAfter = await fs.stat(filename)
    } catch {}
    expect(checkAfter).toBeUndefined()
  })
})
