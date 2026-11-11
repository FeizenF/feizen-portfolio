import { useEffect, useRef } from 'react'

const RING_COUNT = 12
const GAP = 320

/**
 * The corridor between the hero and the rest of the page.
 *
 * Twelve rectangular frames recede toward a single vanishing point, each wall
 * carrying the name. Scrolling walks the camera forward: every frame travels
 * toward the viewer and recycles at the far end, so the corridor never ends.
 * Only transform and opacity are written, and the loop stops off-screen.
 */
export default function FeizenTunnel({ reducedMotion = false }) {
  const sectionRef = useRef(null)
  const ringsRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const wrap = ringsRef.current
    if (!section || !wrap) return undefined

    const rings = Array.from(wrap.children)
    const total = RING_COUNT * GAP
    let frame = 0
    let visible = false

    if (reducedMotion) {
      rings.forEach((ring, index) => {
        ring.style.transform = `translate(-50%, -50%) translateZ(${-index * GAP}px)`
        ring.style.opacity = index === 0 ? '0' : String(Math.max(0.06, 0.85 - index * 0.07))
      })
      return undefined
    }

    const render = () => {
      if (!visible) return

      const rect = section.getBoundingClientRect()
      const span = Math.max(1, rect.height - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / span))
      const travel = progress * total

      rings.forEach((ring, index) => {
        const depth = (((index * GAP - travel) % total) + total) % total
        const z = -depth
        const near = Math.min(1, Math.max(0, (depth - GAP * 0.25) / (GAP * 0.5)))
        const far = Math.min(1, Math.max(0, 1 - depth / (total * 0.92)))
        ring.style.transform = `translate(-50%, -50%) translateZ(${z.toFixed(2)}px)`
        ring.style.opacity = (near * far * 0.9).toFixed(3)
      })

      frame = window.requestAnimationFrame(render)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting
        if (next === visible) return
        visible = next
        window.cancelAnimationFrame(frame)
        if (visible) frame = window.requestAnimationFrame(render)
      },
      { rootMargin: '20% 0px 20% 0px' }
    )

    observer.observe(section)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [reducedMotion])

  return (
    <section
      ref={sectionRef}
      id="corridor"
      className="ft"
      aria-label="The corridor"
      data-active="true"
    >
      <div className="ft-sticky">
        <div className="ft-stage" aria-hidden="true">
          <div className="ft-glow" />
          <div className="ft-rings" ref={ringsRef}>
            {Array.from({ length: RING_COUNT }, (_, index) => (
              <div className="ft-ring" key={index}>
                <span className="ft-wall ft-wall--top">FEIZEN</span>
                <span className="ft-wall ft-wall--bottom">FEIZEN</span>
                <span className="ft-wall ft-wall--left">FEIZEN</span>
                <span className="ft-wall ft-wall--right">FEIZEN</span>
              </div>
            ))}
          </div>
          <div className="ft-void" />
          <div className="ft-scan" />
        </div>

        <div className="ft-copy page-pad">
          <span className="label ft-label">INTERLUDE / CORRIDOR</span>
          <p className="ft-line">
            Walls with one name on them, a floor that keeps giving way.
          </p>
          <span className="label ft-note">NO END IN SIGHT / KEEP WALKING</span>
        </div>
      </div>
    </section>
  )
}
