import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { setLenis, scrollToId } from '../lib/scroll'

gsap.registerPlugin(ScrollTrigger)

/**
 * Weighted smooth scrolling, in the spirit of the reference: the page closes
 * the gap to its target gradually, so a flick keeps gliding for a moment.
 * Disabled entirely for visitors who prefer reduced motion.
 */
export function useSmoothScroll(reducedMotion) {
  useEffect(() => {
    const root = document.documentElement

    if (reducedMotion) {
      root.classList.remove('lenis')
      setLenis(null)
      return undefined
    }

    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      smoothWheel: true,
    })

    setLenis(lenis)
    root.classList.add('lenis')

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target.closest?.('a[href^="#"]')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || href.length < 2) return

      const target = document.getElementById(href.slice(1))
      if (!target) return

      event.preventDefault()
      scrollToId(href.slice(1))
    }

    document.addEventListener('click', onClick)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const fontsReady = document.fonts?.ready
    fontsReady?.then(refresh).catch(() => {})

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
      root.classList.remove('lenis')
    }
  }, [reducedMotion])
}
