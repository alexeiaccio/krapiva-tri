export function pluralize(
  word: string,
  count: number,
  [one, few, many]: [string, string, string],
): string {
  const n = count % 10
  return `${word}${n === 1 ? one : n < 5 ? few : many}`
}
