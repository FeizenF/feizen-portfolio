export default function Footer() {
  const year = new Date().getFullYear()

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

      <div className="footer-bottom">
        <span className="label">© {year} FERNANDA BRIAN KHOLISH</span>
        <span className="label">REACT / VITE</span>
        <span className="label">SECURITY / DEVELOPMENT</span>
      </div>
    </footer>
  )
}
