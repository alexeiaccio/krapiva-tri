import type { Nullable } from 'tsdef'
import { ClientKeys } from './constants'

export interface Color {
  red: number
  hex: string
  blue: number
  green: number
}

export interface ColorPalette {
  average_luminance: number
  colors: Array<Color>
  dominant_colors: {
    vibrant: Color
    muted_light: Color
    muted: Color
    vibrant_dark: Color
    vibrant_light: Color
    muted_dark: Color
  }
}

export interface Article {
  id: string
  title: Nullable<string>
  image: Nullable<string>
  date: Nullable<string>
  publicationDate: Nullable<string>
  tags: string[]
  authors: string[]
  slug: Nullable<string>
  palette?: Nullable<string>
  client: ClientKeys
}

export interface Category {
  title: Nullable<string>
  description: Nullable<string>
  slug: Nullable<string>
  articles: Article[]
}

export interface Banner {
  text: Nullable<string>
  button?: Nullable<string>
  image?: Nullable<string>
  palette?: Nullable<ColorPalette>
  colors?: Nullable<[string, string, string, string]>
  link?: Nullable<string>
}

export interface Highlight {
  text: Nullable<string>
  image: Nullable<string>
  palette: Nullable<string>
  link: Nullable<string>
}

export interface Author {
  id: string
  name: Nullable<string>
  slug: Nullable<string>
  description: Nullable<string>
  statement: Nullable<string>
  avatars: Array<{ src: string; palette?: Nullable<string> }>
  type: 'author' | 'redsovet' | 'link'
  clients?: { client: ClientKeys; id: string }[]
}
