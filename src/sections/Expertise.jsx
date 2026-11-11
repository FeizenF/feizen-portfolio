import Reveal from '../components/Reveal'
import TechIcon from '../components/TechIcon'
import { technologies, technologyGroups } from '../data/technologies'

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise">
      <div className="section-inner page-pad">
        <header className="section-head">
          <div className="section-marker">
            <span className="label section-index">05</span>
            <span className="label">EXPERTISE / TOOLKIT</span>
            <span className="section-rule" aria-hidden="true" />
            <span className="label section-file">
              {String(technologies.length).padStart(2, '0')} TOOLS
            </span>
          </div>

          <div className="expertise-head">
            <Reveal as="h2" className="section-title expertise-title">
              THE STACK
              <br />
              <em>BEHIND THE WORK.</em>
            </Reveal>

            <Reveal as="p" className="section-intro" delay={90}>
              An index of the languages, frameworks, and tools I use and
              continue to learn. No scores, no percentages: just the current
              working set.
            </Reveal>
          </div>
        </header>

        <div className="tech-groups">
          {technologyGroups.map((group, groupIndex) => {
            const items = technologies.filter((item) => item.group === group)

            return (
              <Reveal
                key={group}
                className="tech-group"
                delay={groupIndex * 90}
              >
                <div className="tech-group-head">
                  <span className="label">
                    {String(groupIndex + 1).padStart(2, '0')}
                  </span>
                  <h3>{group}</h3>
                  <span className="label tech-group-count">
                    {String(items.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="tech-list">
                  {items.map((item) => (
                    <li key={item.id} className="tech-tile">
                      <span className="tech-icon">
                        <TechIcon icon={item.icon} />
                      </span>
                      <span className="tech-name">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>

        <footer className="section-foot expertise-foot">
          <p className="section-note">
            The work moves between what is built, what supports it, and what
            can break it.
          </p>
          <span className="label">SECURITY / DEVELOPMENT / SYSTEMS</span>
        </footer>
      </div>
    </section>
  )
}
