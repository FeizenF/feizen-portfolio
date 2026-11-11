import { useEffect, useState } from 'react'
import AmbientBackground from './components/AmbientBackground'
import BootScreen from './components/BootScreen'
import Navigation from './components/Navigation'
import About from './sections/About'
import Archive from './sections/Archive'
import Contact from './sections/Contact'
import Expertise from './sections/Expertise'
import Hero from './sections/Hero'
import Infrastructure from './sections/Infrastructure'
import Research from './sections/Research'
import SelectedProjects from './sections/SelectedProjects'
import { useActiveSection } from './hooks/useActiveSection'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useReveal } from './hooks/useReveal'

const BOOT_KEY = 'feizen.booted'

function bootAlreadySeen() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true

  try {
    return window.sessionStorage.getItem(BOOT_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const reducedMotion = useReducedMotion()
  const [booted, setBooted] = useState(bootAlreadySeen)
  const activeId = useActiveSection()

  useReveal(reducedMotion)

  useEffect(() => {
    if (reducedMotion) setBooted(true)
  }, [reducedMotion])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('is-booting', !booted)
    return () => root.classList.remove('is-booting')
  }, [booted])

  const handleBootDone = () => {
    try {
      window.sessionStorage.setItem(BOOT_KEY, '1')
    } catch {
      // Storage can be unavailable in private or restricted contexts.
    }
    setBooted(true)
  }

  return (
    <div className={`site ${reducedMotion ? 'is-reduced' : ''}`.trim()}>
      <a className="skip-link" href="#about">
        Skip to content
      </a>

      {!booted ? <BootScreen onDone={handleBootDone} /> : null}

      <AmbientBackground />
      <Navigation activeId={activeId} />

      <main id="main" aria-busy={!booted}>
        <Hero entered={booted} />
        <About />
        <Archive />
        <Infrastructure />
        <SelectedProjects />
        <Expertise />
        <Research />
        <Contact />
      </main>
    </div>
  )
}
