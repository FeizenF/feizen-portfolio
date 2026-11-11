export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function scrollToId(id) {
  const target = document.getElementById(id)
  if (!target) return

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })
}

export function focusAfterScroll(id) {
  const target = document.getElementById(id)
  if (!target) return

  target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}
