import { asHTML, asText } from '@prismicio/helpers'
import type { RichTextField } from '@prismicio/types'
import type { Nilable, Nullable } from 'tsdef'
import { htmlSerializer, linkResolver } from './htmlSerializer'

type RichTextResult = {
  html: Nilable<string>
  text: Nilable<string>
}

type MaybeRichText<Key> = Key extends undefined
  ? RichTextResult
  : Key extends 'text'
  ? Omit<RichTextResult, 'html'>
  : Key extends 'html'
  ? Omit<RichTextResult, 'text'>
  : never

export function getRichText<Key extends undefined | keyof RichTextResult>(
  text: Nilable<RichTextField>,
  key?: Key,
  ctx?: {
    references: Record<
      number,
      {
        id: string
        anchor: string
        text: Nullable<string>
      }
    >
  },
): Nullable<MaybeRichText<Key>> {
  let richText: Nullable<MaybeRichText<Key>> = null

  if (text) {
    if (key === 'text') {
      richText = { text: asText(text) } as MaybeRichText<Key>
    } else {
      richText = {
        html: asHTML(text, linkResolver, htmlSerializer(ctx)),
      } as MaybeRichText<Key>
    }
  } else {
    richText = {
      text: asText(text),
      html: asHTML(text, linkResolver, htmlSerializer(ctx)),
    } as MaybeRichText<Key>
  }

  return richText
}
