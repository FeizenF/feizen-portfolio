import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navigation } from '../data/sections'
import { focusAfterScroll, scrollToId } from '../lib/scroll'

export default function Navigation({ activeId }) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(() => firstLinkRef.current?.focus(), 80)

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const menuLinks = Array.from(menuRef.current?.querySelectorAll('a') ?? [])
      const sequence = [toggleRef.current, ...menuLinks].filter(Boolean)
      if (!sequence.length) return

      const first = sequence[0]
      const last = sequence[sequence.length - 1]
      const current = document.activeElement

      if (event.shiftKey && current === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  const goTo = (event, target) => {
    event.preventDefault()
    const shouldMove = open
    setOpen(false)

    window.setTimeout(
      () => {
        scrollToId(target)
        focusAfterScroll(target)
      },
      shouldMove ? 120 : 0
    )
  }

  return (
    <>
      <header className="site-nav">
        <div className="nav-inner page-pad">
          <a
            className="nav-brand"
            href="#hero"
            onClick={(event) => goTo(event, 'hero')}
            aria-label="FEIZEN, back to top"
          >
            <span className="nav-brand-mark" aria-hidden="true">
              <span className="nav-brand-f">F</span>
            </span>
            <span className="nav-brand-word">FEIZEN</span>
            <span className="nav-brand-tag">PORTFOLIO</span>
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            {navigation.map((item) => {
              const isActive = activeId === item.target
              return (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  className={`nav-link ${isActive ? 'is-active' : ''}`.trim()}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={(event) => goTo(event, item.target)}
                >
                  <span className="nav-link-dot" aria-hidden="true" />
                  {item.label}
                </a>
              )
            })}
          </nav>

          <div className="nav-status" aria-label="Availability status">
            <span className="nav-status-dot" aria-hidden="true" />
            <span>OPEN TO CONTACT</span>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X size={20} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className="mobile-menu"
        data-open={open}
        aria-hidden={!open}
      >
        <div className="mobile-menu-inner page-pad">
          <p className="label mobile-menu-label">NAVIGATION / INDEX</p>

          <nav aria-label="Mobile primary">
            {navigation.map((item, index) => (
              <a
                key={item.target}
                ref={index === 0 ? firstLinkRef : undefined}
                href={`#${item.target}`}
                className="mobile-menu-link"
                data-active={activeId === item.target}
                tabIndex={open ? 0 : -1}
                onClick={(event) => goTo(event, item.target)}
              >
                <span className="mobile-menu-index label">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="mobile-menu-foot">
            <p className="label">BUILD. UNDERSTAND. SECURE.</p>
            <p className="label">FEIZEN / 2026</p>
          </div>
        </div>
      </div>
    </>
  )
}
