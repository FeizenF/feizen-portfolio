import { ArrowUpRight } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'
import { contact } from '../data/contact'

export default function SelectedProjects() {
  return (
    <section id="projects" className="section projects">
      <div className="section-inner page-pad">
        <header className="section-head">
          <div className="section-marker">
            <span className="label section-index">02</span>
            <span className="label">SELECTED PROJECTS</span>
            <span className="section-rule" aria-hidden="true" />
            <span className="label section-file">
              {String(projects.length).padStart(2, '0')} ENTRIES
            </span>
          </div>

          <div className="projects-head">
            <Reveal as="h2" className="section-title projects-title">
              THINGS I&apos;VE
              <br />
              <em>BUILT.</em>
            </Reveal>

            <Reveal as="p" className="section-intro" delay={90}>
              A small record of applications, interfaces, and technical work in
              progress. Each entry is a real project, kept to its original
              scope.
            </Reveal>
          </div>
        </header>

        <div className="project-grid">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              className="project-cell"
              delay={(index % 2) * 90}
            >
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>

        {contact.github ? (
          <div className="projects-more">
            <p className="section-note">
              More experiments, coursework, and works in progress live on
              GitHub.
            </p>
            <a
              className="inline-link"
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              VISIT GITHUB
              <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
