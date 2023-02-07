import { createMedia } from '@artsy/fresnel'
import type { MediaProps } from '@artsy/fresnel/dist/Media'

const AppMedia = createMedia({
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
})

// Make styles for injection into the header of the page
export const mediaStyles = AppMedia.createMediaStyle()

export const { Media, MediaContextProvider } = AppMedia

export type MediaComponentProps = MediaProps<
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl',
  never
>
