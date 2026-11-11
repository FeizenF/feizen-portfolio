import { useEffect } from 'react'

/**
 * Progressive enhancement for `.rv` elements.
 *
 * Hidden reveal states are only applied once this hook marks the document
 * as reveal-ready. Without JavaScript, every element stays visible.
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.08,
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [reducedMotion])
}
