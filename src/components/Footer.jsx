import { siteStatus } from '../data/siteStatus'

export default function Footer() {
  const year = new Date().getFullYear()
  const checked = siteStatus.checkedAt
  const total = siteStatus.items.length
  const result = siteStatus.ok
    ? `ALL ${total} LINKS OK`
    : `${siteStatus.warnings} OF ${total} LINKS DOWN`

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="footer-word" href="#hero">
          FEIZEN
        </a>

        <p className="footer-line">
          Cybersecurity student and application developer.
          <br />
          Learning in public, building with intent.
        </p>

        <a className="footer-top-link" href="#hero">
          Back to top
          <span aria-hidden="true">↑</span>
        </a>
      </div>

      <p
        className="footer-system"
        data-ok={siteStatus.ok}
        aria-label={`Site check ${checked}: ${result}`}
      >
        <span className="footer-system-dot" aria-hidden="true" />
        <span className="label">SYS CHECK {checked}</span>
        <span className="label footer-system-result">{result}</span>
      </p>

      <div className="footer-bottom">
        <span className="label">© {year} FERNANDA BRIAN KHOLISH</span>
        <span className="label">REACT / VITE</span>
        <span className="label">SECURITY / DEVELOPMENT</span>
      </div>
    </footer>
  )
}
