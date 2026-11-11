import Reveal from '../components/Reveal'
import { research } from '../data/research'

export default function Research() {
  return (
    <section id="research" className="section research">
      <div className="section-inner page-pad">
        <header className="section-head">
          <div className="section-marker">
            <span className="label section-index">{research.index}</span>
            <span className="label">{research.marker}</span>
            <span className="section-rule" aria-hidden="true" />
            <span className="label section-file">
              {String(research.tracks.length).padStart(2, '0')} TRACKS
            </span>
          </div>

          <div className="split-head">
            <Reveal as="h2" className="section-title research-title">
              {research.titleLead}
              <br />
              <em>{research.titleAccent}</em>
            </Reveal>

            <Reveal as="p" className="section-intro research-intro" delay={90}>
              {research.intro}
            </Reveal>
          </div>
        </header>

        <ol className="research-list">
          {research.tracks.map((track, index) => (
            <Reveal
              as="li"
              key={track.id}
              className="research-track"
              delay={index * 70}
            >
              <div className="research-track-head">
                <span className="research-domain label">{track.domain}</span>
                <span className="research-status label">
                  <span className="research-status-dot" aria-hidden="true" />
                  {track.status}
                </span>
              </div>

              <h3 className="research-question">{track.title}</h3>

              <p className="research-body">{track.question}</p>

              <div className="research-track-foot">
                <span className="label">METHOD</span>
                <span className="research-method">{track.method}</span>
              </div>
            </Reveal>
          ))}
        </ol>

        <footer className="section-foot research-foot">
          <p className="section-note research-note">{research.note}</p>
          <span className="label">RESEARCH / IN PROGRESS</span>
        </footer>
      </div>
    </section>
  )
}
