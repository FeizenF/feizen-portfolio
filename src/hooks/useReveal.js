import { useEffect } from 'react'

const STEP = 70
const MAX_STEPS = 7

/**
 * Progressive enhancement for `.rv` elements.
 *
 * Hidden reveal states are only applied once this hook marks the document as
 * reveal-ready. Elements that enter together are given an increasing delay, so
 * each block lands in sequence instead of all at once. Without JavaScript,
 * every element stays visible.
 */
export function useReveal(reducedMotion) {
  useEffect(() => {
    const root = document.documentElement
    const elements = Array.from(document.querySelectorAll('.rv'))

    if (reducedMotion || !('IntersectionObserver' in window)) {
      root.classList.add('reveal-ready')
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    root.classList.add('reveal-ready')

    let step = 0
    let resetTimer = 0

    const observer = new IntersectionObserver(
      (entries) => {
        const incoming = entries.filter((entry) => entry.isIntersecting)
        if (!incoming.length) return

        incoming.forEach((entry, index) => {
          const delay = Math.min(step + index, MAX_STEPS) * STEP
          entry.target.style.setProperty('--rv-stagger', `${delay}ms`)
        })

        step += incoming.length
        window.clearTimeout(resetTimer)
        resetTimer = window.setTimeout(() => {
          step = 0
        }, 180)

        incoming.forEach((entry) => {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.08,
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      window.clearTimeout(resetTimer)
      observer.disconnect()
    }
  }, [reducedMotion])
}
