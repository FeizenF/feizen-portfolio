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
 * Sections carry their own top padding for the fixed nav, so anchoring against
 * this raw offset lands the section flush with the top of the viewport.
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

export function scrollToId(id) {
  const target = document.getElementById(id)
  if (!target) return

  const top = Math.max(0, flowTop(target))

  if (instance) {
    instance.scrollTo(top, { duration: 1.2 })
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
