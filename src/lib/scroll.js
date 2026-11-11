let instance = null

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function setLenis(next) {
  instance = next
}

/**
 * The document offset of an element as laid out in the flow.
 *
 * Sticky sheets report the position they are pinned at, which is not where
 * they begin, so anchors resolve against the offset chain instead.
 */
export function flowTop(element) {
  let top = 0
  let node = element

  while (node) {
    top += node.offsetTop
    node = node.offsetParent
  }

  return top
}

export function navHeight() {
  if (typeof window === 'undefined') return 0
  const value = getComputedStyle(document.documentElement).getPropertyValue('--nav')
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function scrollToId(id) {
  const target = document.getElementById(id)
  if (!target) return

  const top = Math.max(0, flowTop(target) - navHeight())

  if (instance) {
    instance.scrollTo(top, { duration: 1.5 })
    return
  }

  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

export function focusAfterScroll(id) {
  const target = document.getElementById(id)
  if (!target) return

  target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}
