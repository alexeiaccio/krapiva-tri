import type {
  ImageField,
  PrismicDocument,
  RichTextField,
  Slice,
  SliceZone,
  TitleField,
} from '@prismicio/types'
import fetch from 'cross-fetch'
import type { Nullable, PromisedType, Return } from 'tsdef'
import { parseImageUrl } from '../parseImageUrl'
import { metaClient } from './clients'
import { getRichText } from './getRichText'
import type { ColorPalette } from './types'

type PrismicAbout = PrismicDocument<{
  title: TitleField
  body: SliceZone<
    | Slice<
        'lead',
        {
          text: RichTextField
        }
      >
    | Slice<
        'text',
        {
          text: RichTextField
        }
      >
    | Slice<
        'image',
        {
          imageimage: ImageField
          imagecaption: RichTextField
        }
      >,
    'filled'
  >
}>

export async function getAboutProps() {
  const about = await metaClient().getByType<PrismicAbout>('about', {
    graphQuery,
  })

  const data = about?.results[0]?.data
  if (!data) return null

  const title = getRichText(data.title, 'text')?.text || null
  let image = null as Nullable<string>
  let palette = null as Nullable<string>
  let caption = null as Nullable<string>
  let lead = null as Nullable<string>
  let text = null as Nullable<string>

  ;(data.body || []).forEach((item) => {
    switch (item.slice_type) {
      case 'lead': {
        if (!item.primary.text) break
        lead = getRichText(item.primary.text, 'html')?.html || null
        break
      }
      case 'text': {
        if (!item.primary.text) break
        text = getRichText(item.primary.text, 'html')?.html || null
        break
      }
      case 'image': {
        const { url } = item.primary.imageimage
        if (!url) break
        image = parseImageUrl(url) || null
        caption = getRichText(item.primary.imagecaption, 'html')?.html || null
        break
      }

      default:
        break
    }
  })
  await (async () => {
    const paletteData: ColorPalette = image
      ? await fetch(
          `${parseImageUrl(
            image,
          )}?auto=compress,format&w=16&h=16&fit=scale&palette=json&colors=1`,
        ).then((res) => res.json())
      : null
    palette = paletteData?.colors?.[0]?.hex || null
  })()

  const result = await {
    title,
    image,
    palette,
    caption,
    lead,
    text,
  }

  return result
}

export type AboutProps = PromisedType<Return<typeof getAboutProps>>

const graphQuery = /* GraphQL */ `
  {
    about {
      title
      body {
        ...on lead {
          non-repeat {
            text
          }
        }
        ...on text {
          non-repeat {
            text
          }
        }
        ...on image {
          non-repeat {
            imageimage
            imagecaption
          }
        }
      }
    }
  }
`
