import ProfileFrame from '../components/ProfileFrame'
import Reveal from '../components/Reveal'
import { about } from '../data/about'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="section-inner page-pad">
        <header className="section-head">
          <div className="section-marker">
            <span className="label section-index">{about.index}</span>
            <span className="label">{about.marker}</span>
            <span className="section-rule" aria-hidden="true" />
            <span className="label section-file">{about.file}</span>
          </div>
        </header>

        <div className="about-layout">
          <Reveal className="about-visual">
            <div className="about-visual-head">
              <span className="label">SUBJECT / FEIZEN</span>
              <span className="label">{about.file}</span>
            </div>

            <ProfileFrame />

            <div className="about-visual-foot">
              <span className="label">OPEN TO COLLABORATION</span>
              <span className="label">2026</span>
            </div>
          </Reveal>

          <div className="about-body">
            <Reveal as="p" className="about-name">
              {about.name}
              <span> / {about.alias}</span>
            </Reveal>

            <Reveal as="h2" className="section-title about-title" delay={60}>
              {about.title[0]}
              <br />
              <em>{about.title[1]}</em>
            </Reveal>

            <Reveal as="p" className="about-lead" delay={120}>
              {about.lead}
            </Reveal>

            <Reveal as="div" className="about-copy" delay={160}>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 36)}>{paragraph}</p>
              ))}
            </Reveal>

            <Reveal as="dl" className="about-meta" delay={200}>
              {about.meta.map((item) => (
                <div key={item.label} className="about-meta-row">
                  <dt className="label">{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </Reveal>

            <Reveal className="about-interests" delay={240}>
              <span className="label about-interests-label">INTERESTS</span>
              <ul>
                {about.interest.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <footer className="section-foot about-foot">
          <p className="section-note">{about.footNote}</p>
          <span className="label">{about.role.toUpperCase()} / {about.alias.toUpperCase()}</span>
        </footer>
      </div>
    </section>
  )
}
