const READOUT = [
  ['STATUS', 'ONLINE'],
  ['IDENTITY', 'FEIZEN'],
  ['ROLE', 'CYBERSECURITY STUDENT'],
  ['SPECIALIZATION', 'SECURITY / DEVELOPMENT'],
]

export default function CrtMonitor() {
  return (
    <div className="crt-stage">
      <div className="crt-monitor">
        <div className="crt-casing">
          <span className="crt-screw crt-screw--tl" aria-hidden="true" />
          <span className="crt-screw crt-screw--tr" aria-hidden="true" />
          <span className="crt-screw crt-screw--bl" aria-hidden="true" />
          <span className="crt-screw crt-screw--br" aria-hidden="true" />

          <div className="crt-bezel">
            <div className="crt-screen">
              <div className="crt-content">
                <div className="crt-head">
                  <span className="crt-filename">
                    <span className="crt-filename-dot" aria-hidden="true" />
                    FEIZEN.exe
                  </span>
                  <span className="crt-head-meta">CRT / 01</span>
                </div>

                <h1 className="crt-heading">
                  <span>CYBERSECURITY</span>
                  <span>
                    PORTFOLIO
                    <span className="crt-cursor" aria-hidden="true">
                      _
                    </span>
                  </span>
                </h1>

                <ul className="crt-readout">
                  {READOUT.map(([label, value]) => (
                    <li key={label}>
                      <span className="crt-readout-label">{label}:</span>
                      <span className="crt-readout-value">{value}</span>
                    </li>
                  ))}
                </ul>

                <a
                  className="crt-cta"
                  href="#projects"
                  aria-label="Access granted. Open the projects section."
                >
                  <span className="crt-cta-prompt" aria-hidden="true">
                    &gt;_
                  </span>
                  <span className="crt-cta-label">ACCESS: GRANTED</span>
                  <span className="crt-cta-action">
                    OPEN PROJECTS
                    <span aria-hidden="true"> →</span>
                  </span>
                </a>
              </div>

              <span className="crt-scanlines" aria-hidden="true" />
              <span className="crt-glare" aria-hidden="true" />
              <span className="crt-flicker" aria-hidden="true" />
            </div>

            <span className="crt-bezel-label" aria-hidden="true">
              FEIZEN / CRT-01
            </span>
          </div>

          <div className="crt-controls">
            <div className="crt-brand">
              FEIZEN
              <span>CYBER MONDAY</span>
            </div>

            <div className="crt-controls-right">
              <div className="crt-buttons" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <span className="crt-led" aria-hidden="true" />
            </div>
          </div>

          <span className="crt-vents" aria-hidden="true" />
        </div>

        <div className="crt-neck" aria-hidden="true" />
        <div className="crt-base" aria-hidden="true" />
        <div className="crt-floor-shadow" aria-hidden="true" />
      </div>

      <div className="crt-notes" aria-hidden="true">
        <span className="crt-note crt-note--a">
          SECURE
          <br />
          BY DESIGN
        </span>
        <span className="crt-note crt-note--b">
          STATUS:
          <br />
          ONLINE
        </span>
      </div>
    </div>
  )
}
