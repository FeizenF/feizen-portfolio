import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import { archive } from '../data/archive'

export default function Archive() {
  return (
    <section id="archive" className="section archive">
      <div className="section-inner page-pad">
        <header className="section-head">
          <div className="section-marker">
            <span className="label section-index">{archive.index}</span>
            <span className="label">{archive.marker}</span>
            <span className="section-rule" aria-hidden="true" />
            <span className="label section-file">
              {String(archive.entries.length).padStart(2, '0')} ENTRIES
            </span>
          </div>

          <div className="split-head">
            <Reveal as="h2" className="section-title">
              {archive.titleLead}
              <br />
              <em>{archive.titleAccent}</em>
            </Reveal>

            <Reveal as="p" className="section-intro" delay={90}>
              {archive.intro}
            </Reveal>
          </div>
        </header>

        <Reveal className="archive-table-wrap" delay={60}>
          <table className="archive-table">
            <thead>
              <tr>
                <th scope="col">REF</th>
                <th scope="col">ENTRY</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">STACK</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {archive.entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="archive-ref">{entry.ref}</td>
                  <td className="archive-entry">
                    <a href={entry.anchor}>
                      {entry.title}
                      <ArrowUpRight
                        size={13}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  </td>
                  <td className="archive-category">{entry.category}</td>
                  <td className="archive-stack">
                    <span>{entry.stack.join(' / ')}</span>
                  </td>
                  <td className="archive-status">
                    <span className="archive-status-dot" aria-hidden="true" />
                    {entry.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <footer className="section-foot">
          <p className="section-note">{archive.note}</p>
          <span className="label">INDEX / CONTINUOUS</span>
        </footer>
      </div>
    </section>
  )
}
