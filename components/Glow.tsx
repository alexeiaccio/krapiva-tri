import { useEvent } from 'react-use'
import { Media } from 'lib/media'

export function Glow() {
  useEvent('mousemove', (e) => {
    const { x, y } = e
    const els = document.querySelectorAll('.glow') as NodeListOf<HTMLElement>
    els.forEach((el) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--x', String(x - rect.left))
      el.style.setProperty('--y', String(y - rect.top))
    })
  })

  return null
}

export default function MediaGlow() {
  return (
    <Media greaterThan="sm">
      <Glow />
    </Media>
  )
}
