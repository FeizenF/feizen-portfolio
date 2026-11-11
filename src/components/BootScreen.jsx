import { useEffect, useRef, useState } from 'react'

const DURATION = 1150
const FADE = 360

export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    let frame = 0
    let fadeTimer = 0
    const startedAt = performance.now()

    const tick = (now) => {
      const elapsed = Math.min((now - startedAt) / DURATION, 1)
      const eased = 1 - Math.pow(1 - elapsed, 2)
      setProgress(Math.round(eased * 100))

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick)
        return
      }

      setLeaving(true)
      fadeTimer = window.setTimeout(() => onDoneRef.current?.(), FADE)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(fadeTimer)
    }
  }, [])

  const ready = progress >= 100

  return (
    <div
      className={`boot ${leaving ? 'is-done' : ''}`.trim()}
      aria-hidden={leaving ? 'true' : undefined}
    >
      <div className="boot-glow" aria-hidden="true" />
      <div className="boot-grid" aria-hidden="true" />

      <div className="boot-inner">
        <span className="boot-word" aria-label="FEIZEN">
          FEIZEN
        </span>

        <p className="boot-status" role="status" aria-live="polite">
          INITIALIZING DIGITAL ENVIRONMENT
        </p>

        <div
          className="boot-track"
          role="progressbar"
          aria-label="Portfolio loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span
            className="boot-bar"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        <div className="boot-meta">
          <span>CYBERSECURITY / PORTFOLIO</span>
          <span>{ready ? 'SYSTEM READY' : `${String(progress).padStart(2, '0')}%`}</span>
        </div>
      </div>
    </div>
  )
}
