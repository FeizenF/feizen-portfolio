import { ArrowUpRight, Github } from 'lucide-react'

export default function ProjectCard({ project, index, clone = false }) {
  const hasLinks = Boolean(project.github || project.live)
  const titleId = clone ? `project-${project.id}-clone` : `project-${project.id}`
  const linkTabIndex = clone ? -1 : undefined

  return (
    <article
      className="project-card"
      aria-labelledby={titleId}
      aria-hidden={clone ? 'true' : undefined}
    >
      <div className="project-media">
        <img
          src={project.image}
          alt={project.alt}
          width="1600"
          height="1200"
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="project-media-shade" aria-hidden="true" />
        <span className="project-number" aria-hidden="true">
          {project.number}
        </span>
        <span className="project-category">{project.category}</span>
      </div>

      <div className="project-body">
        <div className="project-kicker">
          <span className="label">{project.technology}</span>
          <span className="label">CASE / {project.number}</span>
        </div>

        <h3 id={titleId} className="project-title">
          {project.title}
        </h3>

        <p className="project-copy">{project.description}</p>

        <div className="project-foot">
          <ul className="project-stack" aria-label="Technology stack">
            {project.stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {hasLinks ? (
            <div className="project-links">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={linkTabIndex}
                  aria-label={`${project.title} on GitHub`}
                >
                  <Github size={15} strokeWidth={1.6} aria-hidden="true" />
                  <span>GitHub</span>
                </a>
              ) : null}

              {project.live ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={linkTabIndex}
                  aria-label={`${project.title} live site`}
                >
                  <ArrowUpRight size={15} strokeWidth={1.6} aria-hidden="true" />
                  <span>Live</span>
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
