import { brandIcons } from '../data/brandIcons'

export function brandColor(hex) {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return '#ff7a3c'

  const value = parseInt(hex.slice(1), 16)
  const red = (value >> 16) & 255
  const green = (value >> 8) & 255
  const blue = value & 255
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255

  return luminance < 0.16 ? '#ff7a3c' : hex
}

export default function TechIcon({ icon, size = 30 }) {
  const data = brandIcons[icon]
  if (!data) return null

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      role="img"
      aria-hidden="true"
      focusable="false"
      style={{ '--brand': brandColor(data.hex) }}
    >
      <path d={data.path} fill="currentColor" />
    </svg>
  )
}
