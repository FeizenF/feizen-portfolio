import { projects } from './projects'

/**
 * The archive is an index of real artefacts. Entries point at the same projects
 * documented below, plus the public system this portfolio runs on. No dates,
 * statuses, or outcomes are invented: `DOCUMENTED` means the entry exists in
 * this portfolio, `ACTIVE` means it is the site being read.
 */
export const archive = {
  index: '02',
  marker: 'DIGITAL ARCHIVE / INDEX',
  titleLead: 'A RECORD OF',
  titleAccent: 'DIGITAL WORK.',
  intro:
    'An index of work that exists in public: applications, an interface, and a study of digital evidence. Entries are listed at their real scope, without invented results or borrowed case studies.',
  note: 'The archive grows only when an artefact is real enough to be referenced.',
  entries: [
    ...projects.map((project) => ({
      ref: project.number,
      id: project.id,
      title: project.title,
      category: project.category,
      stack: project.stack,
      status: 'DOCUMENTED',
      anchor: `#project-${project.id}`,
    })),
    {
      ref: '05',
      id: 'portfolio-system',
      title: 'PORTFOLIO SYSTEM',
      category: 'Interface / Infrastructure',
      stack: ['React', 'Vite'],
      status: 'ACTIVE',
      anchor: '#hero',
    },
  ],
}
