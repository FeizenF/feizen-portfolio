import { useState } from 'react'
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Send,
} from 'lucide-react'
import Footer from '../components/Footer'
import Reveal from '../components/Reveal'
import { contact, contactChannels } from '../data/contact'

const ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
}

const FIELDS = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name' },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
  { id: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'What is this about?' },
]

const EMPTY = { name: '', email: '', subject: '', message: '' }

function validate(values) {
  const errors = {}

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (values.subject.trim().length < 3) {
    errors.subject = 'Please add a short subject.'
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Please write at least a sentence.'
  }

  return errors
}

function channelHref(channel) {
  return channel.kind === 'email' ? `mailto:${channel.value}` : channel.value
}

function channelDisplay(channel) {
  if (channel.kind === 'email') return channel.value

  try {
    const url = new URL(channel.value)
    return `${url.hostname.replace(/^www\./, '')}${url.pathname.replace(/\/$/, '')}`
  } catch {
    return channel.value
  }
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  const updateField = (event) => {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
    setErrors((previous) => {
      if (!previous[name]) return previous
      const next = { ...previous }
      delete next[name]
      return next
    })
    if (status) setStatus(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstError = Object.keys(nextErrors)[0]
    if (firstError) {
      setStatus({
        tone: 'error',
        message: 'Please correct the highlighted fields and try again.',
      })
      document.getElementById(`field-${firstError}`)?.focus()
      return
    }

    if (!contact.email) {
      setStatus({
        tone: 'info',
        message:
          'The email channel is not connected yet. Reach out through GitHub instead.',
        href: contact.github,
        linkLabel: 'Open GitHub',
      })
      return
    }

    const subject = encodeURIComponent(
      values.subject.trim() || `Portfolio contact from ${values.name.trim()}`
    )
    const body = encodeURIComponent(
      `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`
    )

    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setStatus({
      tone: 'success',
      message: 'Your mail app should open with the message ready to send.',
    })
  }

  return (
    <section id="contact" className="section contact">
      <div className="section-inner page-pad">
        <header className="section-head">
          <div className="section-marker">
            <span className="label section-index">04</span>
            <span className="label">CONTACT / OPEN CHANNEL</span>
            <span className="section-rule" aria-hidden="true" />
            <span className="label section-file">2026</span>
          </div>
        </header>

        <div className="contact-layout">
          <div className="contact-intro">
            <Reveal as="h2" className="contact-title">
              LET&apos;S
              <br />
              <em>CONNECT.</em>
            </Reveal>

            <Reveal as="p" className="contact-lead" delay={90}>
              Open to conversations about cybersecurity, software development,
              and technology. If you have a question, an idea, or a project
              worth discussing, send a message.
            </Reveal>

            <Reveal as="ul" className="contact-channels" delay={150}>
              {contactChannels.map((channel) => {
                const Icon = ICONS[channel.icon] ?? Mail
                return (
                  <li key={channel.id}>
                    <a
                      href={channelHref(channel)}
                      className="contact-channel"
                      {...(channel.kind === 'url'
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      <span className="contact-channel-icon" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.6} />
                      </span>
                      <span className="contact-channel-body">
                        <span className="label">{channel.label}</span>
                        <span className="contact-channel-value">
                          {channelDisplay(channel)}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="contact-channel-arrow"
                      />
                    </a>
                  </li>
                )
              })}
            </Reveal>
          </div>

          <Reveal className="contact-form-wrap" delay={120}>
            <div className="form-head">
              <span className="label">DIRECT MESSAGE</span>
              <span className="label">FORM / 01</span>
            </div>

            <form className="contact-form" noValidate onSubmit={handleSubmit}>
              <div className="form-row">
                {FIELDS.slice(0, 2).map((field) => (
                  <div className="form-field" key={field.id}>
                    <label htmlFor={`field-${field.id}`}>{field.label}</label>
                    <input
                      id={`field-${field.id}`}
                      name={field.id}
                      type={field.type}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      value={values[field.id]}
                      onChange={updateField}
                      aria-invalid={errors[field.id] ? 'true' : undefined}
                      aria-describedby={
                        errors[field.id] ? `error-${field.id}` : undefined
                      }
                    />
                    {errors[field.id] ? (
                      <span className="form-error" id={`error-${field.id}`}>
                        {errors[field.id]}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              {FIELDS.slice(2).map((field) => (
                <div className="form-field" key={field.id}>
                  <label htmlFor={`field-${field.id}`}>{field.label}</label>
                  <input
                    id={`field-${field.id}`}
                    name={field.id}
                    type={field.type}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    value={values[field.id]}
                    onChange={updateField}
                    aria-invalid={errors[field.id] ? 'true' : undefined}
                    aria-describedby={
                      errors[field.id] ? `error-${field.id}` : undefined
                    }
                  />
                  {errors[field.id] ? (
                    <span className="form-error" id={`error-${field.id}`}>
                      {errors[field.id]}
                    </span>
                  ) : null}
                </div>
              ))}

              <div className="form-field">
                <label htmlFor="field-message">Message</label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={5}
                  placeholder="Write your message..."
                  value={values.message}
                  onChange={updateField}
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                />
                {errors.message ? (
                  <span className="form-error" id="error-message">
                    {errors.message}
                  </span>
                ) : null}
              </div>

              <div className="form-actions">
                <button type="submit" className="button-primary">
                  <span>Send Message</span>
                  <Send size={16} strokeWidth={1.7} aria-hidden="true" />
                </button>
                <span className="label form-note">
                  {contact.email ? 'REPLIES VIA EMAIL' : 'REACH ME ON GITHUB'}
                </span>
              </div>

              <div
                className="form-status"
                data-tone={status?.tone}
                role="status"
                aria-live="polite"
              >
                {status ? (
                  <>
                    <span>{status.message}</span>
                    {status.href ? (
                      <a
                        href={status.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {status.linkLabel}
                        <ArrowUpRight
                          size={14}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </a>
                    ) : null}
                  </>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>

        <Footer />
      </div>
    </section>
  )
}
