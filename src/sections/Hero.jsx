import { useEffect, useRef, useState } from 'react'
import CrtMonitor from '../components/CrtMonitor'
import HeroTunnel from '../components/HeroTunnel'

export default function Hero({ entered = true }) {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(true)

  // Pause the tunnel when the hero leaves the viewport: it is the only
  // continuously animating element on the page.
  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`hero ${entered ? 'is-entered' : ''}`.trim()}
      data-active={active}
    >
      <HeroTunnel />
      <div className="hero-shade" aria-hidden="true" />

      <div className="hero-inner page-pad">
        <div className="hero-topline">
          <span className="label">FEIZEN / PORTFOLIO</span>
          <span className="label hero-topline-mid">SECURITY / DEVELOPMENT</span>
          <span className="label">MMXXVI</span>
        </div>

        <div className="hero-stage">
          <CrtMonitor />
        </div>

        <div className="hero-bottom">
          <div className="hero-statement">
            <p className="hero-tagline">
              BUILD. <em>UNDERSTAND.</em> SECURE.
            </p>
            <p className="hero-copy">
              Cybersecurity student and application developer, exploring how
              software is built, how systems behave, and how both can be made
              more resilient.
            </p>
          </div>

          <a className="hero-scroll" href="#about">
            <span>SCROLL TO EXPLORE</span>
            <span className="hero-scroll-mark" aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
