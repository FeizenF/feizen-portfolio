import { useEffect } from 'react'

/**
 * Desktop sheets, following the reference page: each section sticks once its
 * bottom reaches the bottom of the window, then the next section slides over
 * it while a single fixed veil dims the one underneath. On narrow screens the
 * page stays a normal column.
 */
export function useSheetStack() {
  useEffect(() => {
    const root = document.documentElement
    const main = document.getElementById('main')
    if (!main) return undefined

    const desktop = window.matchMedia('(min-width: 821px)')
    const sections = Array.from(main.children).filter(
      (node) => node && node.tagName === 'SECTION' && node.id !== 'corridor'
    )

    if (!sections.length) return undefined

    const veil = document.createElement('div')
    veil.className = 'sheet-veil'
    veil.setAttribute('aria-hidden', 'true')
    document.body.appendChild(veil)

    let active = false
    let frame = 0

    const measure = () => {
      if (!active) return
      const height = window.innerHeight
      sections.forEach((section) => {
        section.style.setProperty('--stick', `${Math.min(0, height - section.offsetHeight)}px`)
      })
    }

    const update = () => {
      frame = 0
      if (!active) return

      const height = window.innerHeight
      let current = -1
      let progress = 0

      for (let index = 0; index < sections.length - 1; index += 1) {
        const rect = sections[index + 1].getBoundingClientRect()
        const step = Math.min(1, Math.max(0, 1 - rect.top / height))
        if (step > 0 && step < 1) {
          current = index
          progress = step
        }

        const covered = rect.top <= 0 && rect.bottom >= height
        const next = covered ? 'hidden' : ''
        if (sections[index].style.visibility !== next) {
          sections[index].style.visibility = next
        }
      }

      if (current < 0) {
        veil.style.opacity = '0'
      } else {
        const eased = progress * progress * (3 - 2 * progress)
        veil.style.zIndex = String(2 * current + 3)
        veil.style.opacity = (0.3 * eased).toFixed(3)
      }

      const marker = 44
      const under = sections.findLast((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= marker && rect.bottom > marker
      })

      root.dataset.sheetTheme = under?.id === 'research' ? 'light' : 'dark'
    }

    const request = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    const apply = () => {
      const enabled = desktop.matches
      if (enabled === active) return
      active = enabled

      sections.forEach((section, index) => {
        section.classList.toggle('sheet', active)
        section.style.zIndex = active ? String(2 * index + 2) : ''
        section.style.visibility = ''
        if (!active) section.style.removeProperty('--stick')
      })

      veil.classList.toggle('is-on', active)
      if (active) {
        measure()
        update()
      } else {
        veil.style.opacity = '0'
        root.dataset.sheetTheme = 'dark'
      }
    }

    apply()
    desktop.addEventListener('change', apply)
    window.addEventListener('resize', measure)
    window.addEventListener('resize', request)
    window.addEventListener('load', measure)
    window.addEventListener('load', request)
    window.addEventListener('scroll', request, { passive: true })

    const fontsReady = document.fonts?.ready
    fontsReady?.then(() => {
      measure()
      request()
    }).catch(() => {})

    const settle = window.setTimeout(() => {
      measure()
      request()
    }, 400)

    return () => {
      window.clearTimeout(settle)
      desktop.removeEventListener('change', apply)
      window.removeEventListener('resize', measure)
      window.removeEventListener('resize', request)
      window.removeEventListener('load', measure)
      window.removeEventListener('load', request)
      window.removeEventListener('scroll', request)
      window.cancelAnimationFrame(frame)
      veil.remove()
      sections.forEach((section) => {
        section.classList.remove('sheet')
        section.style.zIndex = ''
        section.style.visibility = ''
        section.style.removeProperty('--stick')
      })
      root.dataset.sheetTheme = 'dark'
    }
  }, [])
}
