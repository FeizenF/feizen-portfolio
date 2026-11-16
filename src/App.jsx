import { useCallback, useEffect, useState } from 'react'
import AmbientBackground from './components/AmbientBackground'
import BinaryRain from './components/BinaryRain'
import BootScreen from './components/BootScreen'
import CommandPalette from './components/CommandPalette'
import Navigation from './components/Navigation'
import About from './sections/About'
import Contact from './sections/Contact'
import Expertise from './sections/Expertise'
import Hero from './sections/Hero'
import SelectedProjects from './sections/SelectedProjects'
import { useActiveSection } from './hooks/useActiveSection'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useReveal } from './hooks/useReveal'
import { useSectionMotion } from './hooks/useSectionMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'

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
  const [paletteOpen, setPaletteOpen] = useState(false)
  const activeId = useActiveSection()

  useReveal(reducedMotion)
  useSmoothScroll(reducedMotion)
  useSectionMotion(reducedMotion, booted)

  const closePalette = useCallback(() => setPaletteOpen(false), [])

  useEffect(() => {
    if (!booted) return undefined

    const onKeyDown = (event) => {
      if (!(event.metaKey || event.ctrlKey)) return
      if (event.key.toLowerCase() !== 'k') return
      event.preventDefault()
      setPaletteOpen((value) => !value)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [booted])

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
      <BinaryRain reducedMotion={reducedMotion} />
      <Navigation activeId={activeId} onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={closePalette} />

      <main id="main" aria-busy={!booted}>
        <Hero entered={booted} />
        <About />
        <SelectedProjects />
        <Expertise />
        <Contact />
      </main>
    </div>
  )
}
