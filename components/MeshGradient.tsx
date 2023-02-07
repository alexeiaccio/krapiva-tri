import { cx } from 'class-variance-authority'
import { memo, useRef } from 'react'
import { useIsomorphicLayoutEffect, useWindowSize } from 'react-use'

type Nilable<T> = T | null | undefined

export interface Color {
  red: number
  hex: string
  blue: number
  green: number
}

type Props = { className?: string } & (
  | {
      palette: Nilable<
        [Nilable<Color>, Nilable<Color>, Nilable<Color>, Nilable<Color>]
      >
      colors?: undefined
      rgb?: undefined
    }
  | {
      colors: Nilable<[string, string, string, string]>
      palette?: undefined
      rgb?: undefined
    }
  | {
      rgb: Nilable<[string, string, string, string]>
      colors?: undefined
      palette?: undefined
    }
)

const MeshGradient = memo(function MeshGradient({
  palette,
  colors,
  rgb,
  className,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width } = useWindowSize()

  useIsomorphicLayoutEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas || !wrapperRef.current || (!palette && !colors && !rgb))
      return
    const { width, height } = wrapperRef.current.getBoundingClientRect()
    const tlColor = rgb
      ? rgb[0]?.replace(/\s/g, ', ')
      : palette
      ? [
          getColor(palette[0]?.red ?? 0),
          getColor(palette[0]?.green ?? 0),
          getColor(palette[0]?.blue ?? 0),
        ].join(', ')
      : colors
      ? convertToRGB(colors[0]).join(', ')
      : '0, 0, 0'
    const trColor = rgb
      ? rgb[1]?.replace(/\s/g, ', ')
      : palette
      ? [
          getColor(palette[1]?.red ?? 0),
          getColor(palette[1]?.green ?? 0),
          getColor(palette[1]?.blue ?? 0),
        ].join(', ')
      : colors
      ? convertToRGB(colors[1]).join(', ')
      : '0, 0, 0'
    const blColor = rgb
      ? rgb[2]?.replace(/\s/g, ', ')
      : palette
      ? [
          getColor(palette[2]?.red ?? 0),
          getColor(palette[2]?.green ?? 0),
          getColor(palette[2]?.blue ?? 0),
        ].join(', ')
      : colors
      ? convertToRGB(colors[2]).join(', ')
      : '0, 0, 0'
    const brColor = rgb
      ? rgb[3]?.replace(/\s/g, ', ')
      : palette
      ? [
          getColor(palette[3]?.red ?? 0),
          getColor(palette[3]?.green ?? 0),
          getColor(palette[3]?.blue ?? 0),
        ].join(', ')
      : colors
      ? convertToRGB(colors[3]).join(', ')
      : '0, 0, 0'
    canvas.width = width
    canvas.height = height
    const topLeft = ctx.createRadialGradient(0, 0, 1, 0, 0, width)
    topLeft.addColorStop(0, `rgba(${tlColor}, 0.9)`)
    topLeft.addColorStop(0.75, `rgba(${tlColor}, 0)`)
    const bottomLeft = ctx.createRadialGradient(
      width / 3,
      height,
      1,
      0,
      height,
      width,
    )
    bottomLeft.addColorStop(0, `rgba(${blColor}, 0.9)`)
    bottomLeft.addColorStop(0.75, `rgba(${blColor}, 0)`)
    const topRight = ctx.createRadialGradient(
      width - width / 3,
      0,
      1,
      height,
      0,
      width,
    )
    topRight.addColorStop(0, `rgba(${trColor}, 0.9)`)
    topRight.addColorStop(0.75, `rgba(${trColor}, 0)`)
    const bottomRight = ctx.createRadialGradient(
      width,
      height,
      1,
      height,
      height,
      width,
    )
    bottomRight.addColorStop(0, `rgba(${brColor}, 0.9)`)
    bottomRight.addColorStop(0.75, `rgba(${brColor}, 0)`)
    ctx.fillStyle = bottomRight
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = topRight
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = topLeft
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = bottomLeft
    ctx.fillRect(0, 0, width, height)
  }, [width, colors, palette, rgb])

  return (
    <div className={cx('absolute inset-0', className)} ref={wrapperRef}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
})

export default MeshGradient

function getColor(average: number) {
  return average * 255
}

function convertToRGB(hex: string) {
  let toRGB = hex
  if (hex.length === 7) {
    toRGB = hex.slice(1)
  } else {
    if (hex.length !== 6) {
      throw 'Only six-digit hex colors are allowed.'
    }
  }

  let aRgbHex = toRGB.match(/.{1,2}/g)
  let aRgb = [
    parseInt(aRgbHex?.[0] || '0', 16),
    parseInt(aRgbHex?.[1] || '0', 16),
    parseInt(aRgbHex?.[2] || '0', 16),
  ]
  return aRgb
}
