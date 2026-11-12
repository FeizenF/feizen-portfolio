import { useEffect, useRef } from 'react'

const GLYPHS = ['0', '1']
const FADE = 0.12

const COUNT = { phone: 6, tablet: 9, desktop: 12 }

/**
 * A very sparse field of binary glyphs falling like slow rain.
 *
 * Only a handful of trails cross the screen, so the page stays readable. The
 * canvas sits behind the content, pauses while the tab is hidden, and becomes a
 * static scatter when the visitor prefers reduced motion.
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
    let drops = []
    let speeds = []
    let positions = []
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
      lineHeight = fontSize * 1.6

      const count =
        width < 640
          ? COUNT.phone
          : width < 1100
            ? COUNT.tablet
            : COUNT.desktop

      drops = Array.from(
        { length: count },
        () => Math.random() * (height / lineHeight + 14)
      )
      speeds = Array.from({ length: count }, () => 0.1 + Math.random() * 0.16)
      positions = Array.from(
        { length: count },
        () => 0.04 * width + Math.random() * width * 0.92
      )

      context.clearRect(0, 0, width, height)

      if (reducedMotion) drawStatic()
    }

    const drawStatic = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)
      context.font = `${fontSize}px 'Share Tech Mono', monospace`
      context.textAlign = 'center'

      for (let i = 0; i < positions.length; i += 1) {
        const rows = 2 + Math.floor(Math.random() * 3)
        const start = Math.random() * Math.max(1, height / lineHeight - rows)

        for (let row = 0; row < rows; row += 1) {
          const y = (start + row) * lineHeight
          context.fillStyle = 'rgba(134, 169, 184, 0.16)'
          context.fillText(
            GLYPHS[Math.random() > 0.5 ? 0 : 1],
            positions[i],
            y
          )
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

      for (let i = 0; i < positions.length; i += 1) {
        const x = positions[i]
        const head = Math.floor(drops[i]) * lineHeight
        const glyph = GLYPHS[Math.random() > 0.74 ? 1 : 0]

        context.fillStyle = 'rgba(232, 229, 220, 0.26)'
        context.fillText(glyph, x, head)

        context.fillStyle = 'rgba(134, 169, 184, 0.15)'
        context.fillText(glyph, x, head - lineHeight)

        drops[i] += speeds[i]

        if (drops[i] * lineHeight > height + lineHeight * 3) {
          drops[i] = -Math.random() * 10
          speeds[i] = 0.1 + Math.random() * 0.16
          positions[i] = 0.04 * width + Math.random() * width * 0.92
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
