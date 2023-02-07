import { flatMap, flowRight, get, uniq, words } from 'lodash/fp'

const cyrillicToLatin = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  a: 'a',
  A: 'A',
  B: 'B',
  b: 'b',
  C: 'C',
  c: 'c',
  d: 'd',
  D: 'D',
  e: 'e',
  E: 'E',
  f: 'f',
  F: 'F',
  g: 'g',
  G: 'G',
  h: 'h',
  H: 'H',
  i: 'i',
  I: 'I',
  j: 'j',
  J: 'J',
  K: 'K',
  k: 'k',
  l: 'l',
  L: 'L',
  M: 'M',
  m: 'm',
  N: 'N',
  n: 'n',
  O: 'O',
  o: 'o',
  p: 'p',
  P: 'P',
  q: 'q',
  Q: 'Q',
  r: 'r',
  R: 'R',
  S: 'S',
  s: 's',
  T: 'T',
  t: 't',
  u: 'u',
  U: 'U',
  v: 'v',
  V: 'V',
  w: 'w',
  W: 'W',
  x: 'x',
  X: 'X',
  y: 'y',
  Y: 'Y',
  z: 'z',
  Z: 'Z',
  А: 'a',
  а: 'a',
  Б: 'B',
  б: 'b',
  В: 'V',
  в: 'v',
  г: 'g',
  Г: 'G',
  Д: 'D',
  д: 'd',
  е: 'e',
  Е: 'E',
  Ё: 'E',
  ё: 'e',
  ж: 'zh',
  Ж: 'ZH',
  з: 'z',
  З: 'Z',
  И: 'I',
  и: 'i',
  й: 'i',
  Й: 'I',
  к: 'k',
  К: 'K',
  Л: 'L',
  л: 'l',
  М: 'M',
  м: 'm',
  Н: 'N',
  н: 'n',
  О: 'O',
  о: 'o',
  п: 'p',
  П: 'P',
  Р: 'R',
  р: 'r',
  с: 's',
  С: 'S',
  Т: 'T',
  т: 't',
  У: 'U',
  у: 'u',
  ф: 'f',
  Ф: 'F',
  Х: 'H',
  х: 'h',
  ц: 'ts',
  Ц: 'TS',
  Ч: 'CH',
  ч: 'ch',
  ш: 'sh',
  Ш: 'SH',
  Щ: 'SCH',
  щ: 'sch',
  Ъ: '',
  ъ: '',
  ы: 'i',
  Ы: 'I',
  Ь: '',
  ь: '',
  Э: 'E',
  э: 'e',
  Ю: 'YU',
  ю: 'yu',
  Я: 'Ya',
  я: 'ya',
  ' ': '-',
  '-': '-',
  '–': '-',
  '—': '-',
  _: '-',
}

const getDate = (date: string) => {
  const match = date.match(/(\d{4})-(\d{2})-(\d{2})/)
  return `${match?.[3]}-${match?.[2]}-${match?.[1]}`
}

const trslt =
  (library: Record<string, string>) =>
  (str: string): string =>
    (str &&
      str.search(/[0-9]/) &&
      str
        .split('')
        .map((char: string) => library[char])
        .join('')
        .toLowerCase()) ||
    ''

const fromCyrillicToLatin = trslt(cyrillicToLatin)

const getThreeWords = (text: string) =>
  words(text)
    .slice(0, 3)
    .filter((word: string) => word.search(/\d/) === -1)
    .join('-')

export const translite = fromCyrillicToLatin

export const getCategories = flowRight(
  flatMap(translite),
  // filter(tag => tag.search(/\d/) === -1),
  uniq,
  flatMap(get(['node', 'tags'])),
)

export const makePath = (text: string, date: string) =>
  `${fromCyrillicToLatin(getThreeWords(text))}-${getDate(date)}`
