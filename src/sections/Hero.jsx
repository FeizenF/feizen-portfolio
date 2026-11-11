import { useEffect, useRef, useState } from 'react'
import DigitalTunnel from '../components/DigitalTunnel'
import { profile } from '../data/profile'

export default function Hero({ entered = true }) {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(true)

  // The corridor is the only continuously moving element on the page. Stop its
  // path animations when the hero is off-screen.
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
      <DigitalTunnel />

      <div className="hero-inner page-pad">
        <div className="hero-topline">
          <span className="label">FEIZEN / PORTFOLIO</span>
          <span className="label hero-topline-mid">SECURITY / SYSTEMS / BACKEND</span>
          <span className="label">MMXXVI</span>
        </div>

        <div className="hero-stage">
          <div className="hero-focus">
            <p className="label hero-eyebrow">DIGITAL / CORRIDOR</p>

            <h1 className="hero-word" data-text="FEIZEN">
              FEIZEN
            </h1>

            <figure className="hero-portrait">
              <div className="hero-portrait-media">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.alt}
                    width="880"
                    height="1100"
                    decoding="async"
                  />
                ) : (
                  <div className="hero-portrait-fallback" aria-hidden="true">
                    <span className="hero-portrait-grid" />
                    <span className="hero-portrait-mark">{profile.monogram}</span>
                    <span className="hero-portrait-word">FEIZEN</span>
                    <span className="hero-portrait-line" />
                    <span className="hero-portrait-caption">
                      CYBERSECURITY STUDENT
                    </span>
                    <span className="hero-portrait-index">001 / ID</span>
                  </div>
                )}

                <span className="hero-corner hero-corner--tl" aria-hidden="true" />
                <span className="hero-corner hero-corner--tr" aria-hidden="true" />
                <span className="hero-corner hero-corner--bl" aria-hidden="true" />
                <span className="hero-corner hero-corner--br" aria-hidden="true" />
              </div>

              <figcaption className="hero-portrait-meta">
                <span className="label">SUBJECT / FEIZEN</span>
                <span className="label">RECORD / 001</span>
              </figcaption>
            </figure>

            <div className="hero-vanish" aria-hidden="true">
              <span className="hero-vanish-ring" />
              <span className="hero-vanish-dot" />
              <span className="label hero-vanish-label">VANISHING POINT</span>
            </div>

            <p className="hero-tagline">
              BUILD. <em>UNDERSTAND.</em> SECURE.
            </p>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-statement">
            <p className="label hero-role">
              CYBERSECURITY STUDENT / APPLICATION DEVELOPER
            </p>
            <p className="hero-copy">
              Exploring how software is built, how systems behave, and how both
              can be made more resilient.
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
