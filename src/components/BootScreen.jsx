import { useEffect, useRef, useState } from 'react'

const DURATION = 1400
const FADE = 340

const RAIN = Array.from({ length: 11 }, (_, index) => ({
  left: `${3 + index * 9.4}%`,
  delay: `${-1.15 * (index % 7)}s`,
  duration: `${5.6 + (index % 4) * 1.5}s`,
  text: Array.from({ length: 18 }, (_, glyph) =>
    (index + glyph) % 3 === 0 ? '1' : '0'
  ).join(''),
}))

const LOG = [
  { at: 4, text: 'mounting /dev/portfolio' },
  { at: 24, text: 'verifying identity' },
  { at: 46, text: 'loading interfaces' },
  { at: 68, text: 'opening secure channel' },
  { at: 90, text: 'handshake complete' },
]

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
      <div className="boot-rain" aria-hidden="true">
        {RAIN.map((column, index) => (
          <span
            key={index}
            className="boot-rain-col"
            style={{
              left: column.left,
              animationDelay: column.delay,
              animationDuration: column.duration,
            }}
          >
            {column.text}
          </span>
        ))}
      </div>

      <div className="boot-glow" aria-hidden="true" />
      <div className="boot-grid" aria-hidden="true" />
      <div className="boot-sweep" aria-hidden="true" />

      <div className="boot-inner">
        <span className="boot-word" data-text="FEIZEN" aria-label="FEIZEN">
          FEIZEN
        </span>

        <p className="boot-status" role="status" aria-live="polite">
          INITIALIZING DIGITAL ENVIRONMENT
        </p>

        <ul className="boot-log" aria-hidden="true">
          {LOG.map((line) => (
            <li key={line.text} data-on={progress >= line.at ? 'true' : 'false'}>
              {line.text}
            </li>
          ))}
        </ul>

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
