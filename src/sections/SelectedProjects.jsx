import { useEffect, useRef } from 'react'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import { projects } from '../data/projects'

export default function SelectedProjects() {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const node = marqueeRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        node.dataset.playing = entry.isIntersecting ? 'true' : 'false'
      },
      { rootMargin: '120px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

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
              Real projects, kept to their original scope.
            </Reveal>
          </div>
        </header>
      </div>

      <div className="project-marquee" ref={marqueeRef}>
        <div className="project-track">
          <ul className="project-set">
            {projects.map((project, index) => (
              <li key={project.id}>
                <ProjectCard project={project} index={index} />
              </li>
            ))}
          </ul>

          <ul className="project-set project-set--clone" aria-hidden="true">
            {projects.map((project, index) => (
              <li key={`${project.id}-clone`}>
                <ProjectCard project={project} index={index} clone />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
