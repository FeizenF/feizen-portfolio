import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ENTER = { duration: 0.9, ease: 'power3.out' }

/**
 * One motion idea per section: the hero casing drifts, the identity plate
 * settles, the project rail slides in and then runs, tiles boot, and the
 * contact form signals in. Transform and opacity only.
 */
export function useSectionMotion(reducedMotion, ready = true) {
  useEffect(() => {
    if (reducedMotion || !ready) return undefined

    const context = gsap.context(() => {
      gsap.to('.crt-casing', {
        yPercent: -3.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.from('.about-visual .portrait-card', {
        yPercent: 8,
        opacity: 0,
        ...ENTER,
        scrollTrigger: { trigger: '.about', start: 'top 62%', once: true },
      })

      gsap.from('.about-meta-row', {
        x: -16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.about-meta', start: 'top 82%', once: true },
      })

      gsap.from('.project-marquee', {
        x: 56,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.projects', start: 'top 66%', once: true },
      })

      gsap.from('.tech-tile', {
        scale: 0.94,
        y: 10,
        opacity: 0,
        duration: 0.45,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.tech-groups', start: 'top 78%', once: true },
      })

      gsap.from('.contact-channel', {
        x: -18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-channels', start: 'top 84%', once: true },
      })

      gsap.from('.form-field', {
        y: 14,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 88%', once: true },
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    const timer = window.setTimeout(refresh, 500)
    window.addEventListener('load', refresh)
    document.fonts?.ready?.then(refresh).catch(() => {})

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', refresh)
      context.revert()
    }
  }, [reducedMotion, ready])
}
