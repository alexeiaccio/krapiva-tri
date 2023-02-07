export function parseImageUrl(url: string): string {
  const regex = /(^.+)\?.+$/g
  const res = regex.exec(url)

  return res?.[1] ?? url
}
