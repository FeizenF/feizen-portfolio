import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ENTER = { duration: 0.9, ease: 'power3.out' }

/**
 * One motion idea per section, so the page never repeats the same gesture:
 * a column that drifts, a table that scans, a map that draws, cards that
 * settle, tiles that boot, questions that slide, a form that signals in.
 * Transform and opacity only.
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

      gsap.from('.archive-table tbody tr', {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.archive-table', start: 'top 78%', once: true },
      })

      gsap.from('.archive-table thead th', {
        opacity: 0,
        y: -8,
        duration: 0.5,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.archive-table', start: 'top 82%', once: true },
      })

      gsap.from('.infra-node', {
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(2)',
        scrollTrigger: { trigger: '.infra-layers', start: 'top 76%', once: true },
      })

      gsap.from('.infra-component', {
        x: -14,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.infra-layers', start: 'top 76%', once: true },
      })

      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
          y: 44,
          rotateX: 7,
          opacity: 0,
          duration: 0.85,
          delay: (index % 2) * 0.08,
          ease: 'power3.out',
          transformOrigin: '50% 100%',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        })
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

      gsap.from('.research-question', {
        x: -26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.research-list', start: 'top 78%', once: true },
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

      gsap.to('.ft-copy', {
        yPercent: -18,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: '#corridor',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
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
