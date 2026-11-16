import { useEffect, useMemo, useRef, useState } from 'react'
import { navigation } from '../data/sections'
import { focusAfterScroll, scrollToId } from '../lib/scroll'

const COMMANDS = [
  {
    id: 'hero',
    label: 'Overview',
    hint: '00',
    keywords: ['overview', 'hero', 'top', 'home', 'start'],
  },
  ...navigation.map((item, index) => ({
    id: item.target,
    label: item.label,
    hint: String(index + 1).padStart(2, '0'),
    keywords: [item.label.toLowerCase(), item.target],
  })),
]

/**
 * A keyboard-first jump menu, opened with Ctrl+K or Cmd+K.
 *
 * The input owns the focus while the dialog is open and drives the list through
 * `aria-activedescendant`, so arrow keys never move focus away from the field.
 * The previous element regains focus when the palette closes.
 */
export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)
  const restoreRef = useRef(null)

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return COMMANDS
    return COMMANDS.filter((command) =>
      command.keywords.some((keyword) => keyword.includes(term))
    )
  }, [query])

  useEffect(() => {
    if (!open) return undefined

    restoreRef.current = document.activeElement
    setQuery('')
    setCursor(0)

    const body = document.body
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40)

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      onClose()
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKeyDown)
      body.style.overflow = previousOverflow

      const restore = restoreRef.current
      if (restore instanceof HTMLElement && document.contains(restore)) {
        restore.focus({ preventScroll: true })
      }
    }
  }, [open, onClose])

  useEffect(() => {
    setCursor((value) =>
      value >= results.length ? Math.max(0, results.length - 1) : value
    )
  }, [results])

  const run = (command) => {
    if (!command) return
    onClose()

    window.setTimeout(() => {
      scrollToId(command.id)
      focusAfterScroll(command.id)
    }, 30)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      inputRef.current?.focus()
      return
    }

    if (!results.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setCursor((value) => (value + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setCursor((value) => (value - 1 + results.length) % results.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setCursor(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setCursor(results.length - 1)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      run(results[cursor])
    }
  }

  if (!open) return null

  const active = results[cursor]

  return (
    <div
      className="palette"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="palette-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="palette-title"
      >
        <h2 id="palette-title" className="sr-only">
          Command palette
        </h2>

        <div className="palette-field">
          <span className="palette-prompt" aria-hidden="true">
            $
          </span>
          <input
            ref={inputRef}
            className="palette-input"
            type="text"
            value={query}
            placeholder="Jump to a section"
            autoComplete="off"
            spellCheck="false"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-autocomplete="list"
            aria-activedescendant={
              active ? `palette-option-${active.id}` : undefined
            }
            onChange={(event) => {
              setQuery(event.target.value)
              setCursor(0)
            }}
            onKeyDown={handleKeyDown}
          />
          <span className="palette-keys" aria-hidden="true">
            ESC
          </span>
        </div>

        <p className="sr-only" aria-live="polite">
          {results.length} section{results.length === 1 ? '' : 's'} available
        </p>

        {results.length ? (
          <ul
            id="palette-results"
            className="palette-results"
            role="listbox"
            aria-label="Sections"
          >
            {results.map((command, index) => (
              <li
                key={command.id}
                id={`palette-option-${command.id}`}
                className="palette-option"
                role="option"
                aria-selected={index === cursor}
                data-active={index === cursor}
                onMouseEnter={() => setCursor(index)}
                onClick={() => run(command)}
              >
                <span className="palette-hint">{command.hint}</span>
                <span className="palette-label">{command.label}</span>
                <span className="palette-tag">/{command.id}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="palette-empty">No section matches that term.</p>
        )}

        <div className="palette-foot" aria-hidden="true">
          <span>UP DOWN MOVE</span>
          <span>ENTER OPEN</span>
          <span>ESC CLOSE</span>
        </div>
      </div>
    </div>
  )
}
