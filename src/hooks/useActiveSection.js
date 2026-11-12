import { useEffect, useState } from 'react'
import { sectionOrder } from '../data/sections'
import { flowTop } from '../lib/scroll'

const SECTION_IDS = sectionOrder.map((section) => section.id)

/**
 * Tracks the section currently occupying the reading line (roughly 38% down
 * the viewport). Offsets are cached and only re-measured on resize or font
 * load, so scrolling never forces layout.
 */
export function useActiveSection() {
  const [activeId, setActiveId] = useState(SECTION_IDS[0])

  useEffect(() => {
    let frame = 0
    let offsets = []

    const measure = () => {
      offsets = SECTION_IDS.map((id) => {
        const element = document.getElementById(id)
        if (!element) return null
        return { id, top: flowTop(element) }
      }).filter(Boolean)
    }

    const update = () => {
      frame = 0
      if (!offsets.length) return

      const line = window.scrollY + window.innerHeight * 0.38
      let current = offsets[0].id

      offsets.forEach((section) => {
        if (section.top <= line) current = section.id
      })

      setActiveId((previous) => (previous === current ? previous : current))
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    const remeasure = () => {
      measure()
      schedule()
    }

    measure()
    update()

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)
    window.addEventListener('orientationchange', remeasure)

    if (document.fonts?.ready) {
      document.fonts.ready.then(remeasure).catch(() => {})
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('orientationchange', remeasure)
    }
  }, [])

  return activeId
}
