import wisataImage from '../assets/project-wisata.webp'
import catalogImage from '../assets/project-catalog.webp'
import portfolioImage from '../assets/project-portfolio.webp'
import forensicsImage from '../assets/digital-forensics.webp'

/**
 * Real project entries.
 *
 * `github` and `live` stay `null` until a public destination exists. The UI
 * hides the action rather than inventing a repository or demo URL.
 */
export const projects = [
  {
    id: 'wisata-magetan',
    number: '01',
    title: 'WISATA MAGETAN',
    category: 'Mobile Application',
    technology: 'Flutter / Dart',
    stack: ['Flutter', 'Dart'],
    description:
      'A mobile application for exploring tourism destinations in Magetan, built around destination details and a simple browsing flow.',
    image: wisataImage,
    alt: 'Topographic contour study with a plotted route and waypoints.',
    github: null,
    live: null,
  },
  {
    id: 'product-catalog',
    number: '02',
    title: 'PRODUCT CATALOG',
    category: 'Application Development',
    technology: 'Flutter / Dart',
    stack: ['Flutter', 'Dart'],
    description:
      'A product catalog application with product detail views and an interactive ordering flow.',
    image: catalogImage,
    alt: 'Grid of abstract product cards on a dark interface.',
    github: null,
    live: null,
  },
  {
    id: 'personal-portfolio',
    number: '03',
    title: 'PERSONAL PORTFOLIO',
    category: 'Frontend Development',
    technology: 'React / JavaScript',
    stack: ['React', 'JavaScript'],
    description:
      'A personal portfolio documenting development interests, selected projects, and technical exploration.',
    image: portfolioImage,
    alt: 'Editorial dark composition with technical rules and a wordmark.',
    github: null,
    live: null,
  },
  {
    id: 'digital-forensics',
    number: '04',
    title: 'DIGITAL FORENSICS',
    category: 'Cybersecurity Research',
    technology: 'Digital Forensics / ExifTool',
    stack: ['Digital Forensics', 'ExifTool'],
    description:
      'An exploration of file metadata, hidden data, and the structure of digital evidence.',
    image: forensicsImage,
    alt: 'Layered metadata sheets and a circular analysis lens.',
    github: null,
    live: null,
  },
]
