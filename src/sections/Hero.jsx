import { profile } from '../data/profile'
import { about } from '../data/about'

const SCREEN_ROWS = [
  { area: 'SECURITY', track: 'DEFENSIVE', state: 'ACTIVE' },
  { area: 'FORENSICS', track: 'DIGITAL', state: 'STUDY' },
  { area: 'APPS', track: 'MOBILE / WEB', state: 'BUILD' },
  { area: 'SYSTEMS', track: 'ARCHITECTURE', state: 'LEARN' },
]

export default function Hero({ entered = true }) {
  return (
    <section
      id="hero"
      className="crt"
      data-entered={entered ? 'true' : 'false'}
      aria-label="Introduction"
    >
      <div className="crt-columns" aria-hidden="true">
        <div className="crt-column crt-column--left">
          <p>Local node: feizen</p>
          <p>&gt; status: online</p>
          <p>&gt; focus:</p>
          <p className="crt-indent">security</p>
          <p className="crt-indent">forensics</p>
          <p className="crt-indent">application development</p>
          <p className="crt-dim">-- open to collaboration --</p>
          <p>&gt; stack:</p>
          <p className="crt-indent">react / vite</p>
          <p className="crt-indent">kotlin / flutter</p>
          <p className="crt-indent">linux / python</p>
        </div>

        <div className="crt-column crt-column--right">
          <p>TXT&nbsp;&nbsp;&nbsp;___ coursework</p>
          <p>TXT&nbsp;&nbsp;&nbsp;___ experiments</p>
          <p>TXT&nbsp;&nbsp;&nbsp;___ field notes</p>
          <p>TXT&nbsp;&nbsp;&nbsp;___ works in progress</p>
          <p>TXT&nbsp;&nbsp;&nbsp;___ reading list</p>
          <p className="crt-dim">root@feizen:~# _</p>
        </div>
      </div>

      <div className="crt-wrap page-pad">
        <div className="crt-topline">
          <span className="label">FEIZEN / PORTFOLIO</span>
          <span className="label crt-topline-mid">SECURITY / SYSTEMS / BACKEND</span>
          <span className="label">MMXXVI</span>
        </div>

        <div className="crt-stage">
          <div className="crt-monitor">
            <div className="crt-shadow" aria-hidden="true" />

            <div className="crt-casing">
              <div className="crt-vents" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="crt-note crt-note--a" aria-hidden="true">
                <span className="crt-note-label">FOCUS</span>
                <strong>SECURITY</strong>
              </div>

              <div className="crt-note crt-note--b" aria-hidden="true">
                <span className="crt-smiley">
                  <i className="crt-smiley-eye crt-smiley-eye--l" />
                  <i className="crt-smiley-eye crt-smiley-eye--r" />
                  <i className="crt-smiley-mouth" />
                </span>
              </div>

              <div className="crt-note crt-note--c" aria-hidden="true">
                DO NOT
                <br />
                POWER OFF
              </div>

              <div className="crt-bezel">
                <div className="crt-screen">
                  <span className="crt-reflection" aria-hidden="true" />

                  <div className="crt-content">
                    <h1 className="crt-word hero-word" data-text={profile.name}>
                      {profile.name}
                    </h1>

                    <div className="crt-table">
                      <div className="crt-table-head">
                        <span>FOCUS</span>
                        <span>TRACK</span>
                        <span>STATE</span>
                      </div>

                      {SCREEN_ROWS.map((row) => (
                        <div className="crt-table-row" key={row.area}>
                          <span className="crt-cell crt-cell--area">{row.area}</span>
                          <span className="crt-cell">{row.track}</span>
                          <span className="crt-cell crt-cell--state">
                            <i aria-hidden="true" />
                            {row.state}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="crt-prompt">
                      <span className="crt-user">guest@feizen</span>
                      <span className="crt-path">:~$</span> whoami
                      <span className="crt-cursor" aria-hidden="true" />
                    </p>
                  </div>
                </div>

                <span className="crt-badge" aria-hidden="true">
                  FZ
                </span>

                <div className="crt-controls" aria-hidden="true">
                  <span className="crt-knob" />
                  <span className="crt-knob" />
                  <span className="crt-led" />
                </div>
              </div>
            </div>

            <div className="crt-stand" aria-hidden="true">
              <span />
            </div>
            <div className="crt-base" aria-hidden="true" />
          </div>

          <div className="crt-lede">
            <p className="crt-command">
              <span>&gt; SYSTEM ONLINE.</span>
              <span>&gt; IDENTITY: {about.name.toUpperCase()}.</span>
              <span>&gt; ACCESS: OPEN TO COLLABORATION.</span>
            </p>

            <div className="crt-actions">
              <a className="crt-exec" href="#projects">
                [ EXECUTE ]
                <span className="crt-exec-caret" aria-hidden="true">
                  _
                </span>
              </a>
              <a className="crt-hint" href="#about">
                <span>SCROLL FOR MORE</span>
                <span className="crt-hint-mark" aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
