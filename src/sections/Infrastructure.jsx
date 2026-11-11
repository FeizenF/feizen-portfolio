import Reveal from '../components/Reveal'
import { infrastructure } from '../data/infrastructure'

export default function Infrastructure() {
  return (
    <section id="infrastructure" className="section infrastructure">
      <div className="section-inner page-pad">
        <header className="section-head">
          <div className="section-marker">
            <span className="label section-index">{infrastructure.index}</span>
            <span className="label">{infrastructure.marker}</span>
            <span className="section-rule" aria-hidden="true" />
            <span className="label section-file">
              {String(infrastructure.layers.length).padStart(2, '0')} LAYERS
            </span>
          </div>

          <div className="split-head">
            <Reveal as="h2" className="section-title">
              {infrastructure.titleLead}
              <br />
              <em>{infrastructure.titleAccent}</em>
            </Reveal>

            <Reveal as="p" className="section-intro" delay={90}>
              {infrastructure.intro}
            </Reveal>
          </div>
        </header>

        <div className="infra-layout">
          <div className="infra-map">
            <div className="infra-map-head">
              <span className="label">SYSTEM MAP</span>
              <span className="label">STATIC / VERSIONED</span>
            </div>

            <ol className="infra-layers">
              {infrastructure.layers.map((layer, index) => (
                <Reveal
                  as="li"
                  key={layer.id}
                  className="infra-layer"
                  delay={index * 60}
                >
                  <span className="infra-index label">{layer.id}</span>
                  <span className="infra-node" aria-hidden="true" />
                  <span className="infra-layer-name label">{layer.layer}</span>
                  <span className="infra-component">{layer.component}</span>
                  <span className="infra-note">{layer.note}</span>
                </Reveal>
              ))}
            </ol>
          </div>

          <aside className="infra-aside">
            <Reveal className="infra-facts" delay={120}>
              {infrastructure.facts.map((fact) => (
                <div key={fact.label} className="infra-fact">
                  <span className="infra-fact-value">{fact.value}</span>
                  <span className="label">{fact.label}</span>
                </div>
              ))}
            </Reveal>

            <Reveal className="infra-posture" delay={180}>
              <span className="label">POSTURE</span>
              <p>{infrastructure.posture}</p>
              <span className="label infra-posture-note">
                {infrastructure.postureNote}
              </span>
            </Reveal>
          </aside>
        </div>

        <footer className="section-foot">
          <p className="section-note">
            Built to stay understandable: one source tree, one static output,
            and no hidden runtime.
          </p>
          <span className="label">BUILD / VERIFY / SHIP</span>
        </footer>
      </div>
    </section>
  )
}
