import { useEffect, useRef } from 'react'

const GLYPHS = ['0', '1']
const FADE = 0.09

/**
 * A page-wide field of binary glyphs falling like slow stars.
 *
 * The canvas sits above the section sheets and below the navigation, and is
 * transparent so the trails dissolve into whatever is behind it. Motion is
 * paused while the tab is hidden and replaced by a single static field when
 * the visitor prefers reduced motion.
 */
export default function BinaryRain({ reducedMotion = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    let width = 0
    let height = 0
    let fontSize = 14
    let lineHeight = 0
    let columns = 0
    let drops = []
    let speeds = []
    let frame = 0
    let running = true

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      fontSize = width < 640 ? 11 : width < 1100 ? 12.5 : 14
      lineHeight = fontSize * 1.5
      columns = Math.ceil(width / (fontSize * 1.35))
      drops = Array.from({ length: columns }, () =>
        Math.random() * (height / lineHeight + 12)
      )
      speeds = Array.from({ length: columns }, () => 0.16 + Math.random() * 0.26)

      context.clearRect(0, 0, width, height)

      if (reducedMotion) drawStatic()
    }

    const drawStatic = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)
      context.font = `${fontSize}px 'Share Tech Mono', monospace`
      context.textAlign = 'center'

      for (let i = 0; i < columns; i += 1) {
        const x = i * fontSize * 1.35 + fontSize / 2
        const rows = 3 + Math.floor(Math.random() * 7)
        const start = Math.random() * Math.max(1, height / lineHeight - rows)

        for (let row = 0; row < rows; row += 1) {
          const y = (start + row) * lineHeight
          const alpha = 0.05 + Math.random() * 0.14
          context.fillStyle = `rgba(134, 169, 184, ${alpha.toFixed(3)})`
          context.fillText(GLYPHS[Math.random() > 0.5 ? 0 : 1], x, y)
        }
      }
    }

    const draw = () => {
      if (!running) return

      context.globalCompositeOperation = 'destination-out'
      context.fillStyle = `rgba(0, 0, 0, ${FADE})`
      context.fillRect(0, 0, width, height)
      context.globalCompositeOperation = 'source-over'

      context.font = `${fontSize}px 'Share Tech Mono', monospace`
      context.textAlign = 'center'

      for (let i = 0; i < columns; i += 1) {
        const x = i * fontSize * 1.35 + fontSize / 2
        const head = Math.floor(drops[i]) * lineHeight
        const glyph = GLYPHS[Math.random() > 0.72 ? 1 : 0]

        context.fillStyle = 'rgba(232, 229, 220, 0.34)'
        context.fillText(glyph, x, head)

        context.fillStyle = 'rgba(134, 169, 184, 0.22)'
        context.fillText(glyph, x, head - lineHeight)

        drops[i] += speeds[i]

        if (drops[i] * lineHeight > height + lineHeight * 4) {
          drops[i] = -Math.random() * 8
          speeds[i] = 0.16 + Math.random() * 0.26
        }
      }

      frame = window.requestAnimationFrame(draw)
    }

    const start = () => {
      if (running && !reducedMotion) return
      running = true
      if (!reducedMotion) frame = window.requestAnimationFrame(draw)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(frame)
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    if (!reducedMotion) frame = window.requestAnimationFrame(draw)

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className="rain" aria-hidden="true" />
}
