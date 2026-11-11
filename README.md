# FEIZEN / Cybersecurity Portfolio

A single-page portfolio for **Fernanda Brian Kholish (Feizen)**, a cybersecurity
student and application developer. The hero is a beige CRT monitor displaying a
live terminal readout. Scrolling into the monitor leads to an endless
perspective corridor with `FEIZEN` on all four walls, then the rest of the page
stacks as dark editorial sheets with one cream section as a change of tempo.

Seven numbered sections plus one interlude: Hero, Corridor, About, Digital
Archive, Infrastructure, Projects, Expertise, Research, Contact.

## Design notes

- **Hero monitor** — a CSS-built CRT: cream casing, bezel, curved screen,
  scanlines, flicker, knobs, stand, sticky notes, and a glitching `FEIZEN`
  wordmark over a terminal table. The screen content is real portfolio data, not
  decoration. A short boot overlay precedes it and is skipped on repeat visits.
- **Corridor** — twelve rectangular frames recede toward one vanishing point,
  each carrying `FEIZEN` on the top, bottom, left, and right walls. Scrolling
  walks the camera forward; rings recycle at the far end so the corridor never
  stops. It sits between the hero and About and has its own sticky viewport.
- **Binary rain** — a fixed canvas of falling `0` and `1` glyphs behind the
  content, like slow stars. It pauses when the tab is hidden, dims over the
  cream Research sheet, and becomes a static field under reduced motion.
- **Portrait** — the About frame holds the real photo when supplied. Until then
  it shows a typographic identity plate. Nothing is generated or borrowed.
- **Palette** — `#080b0f` background, `#11161c` and `#171d24` surfaces,
  `#e8e5dc` text, `#92979d` secondary text, and one restrained steel-blue accent.
  Research is the single light section (`#e8e5dc`).
- **Type** — Silkscreen (display, wordmarks, section titles) and Share Tech Mono
  (body, labels, metadata), both self-hosted.
- **Motion** — Lenis smooth scroll driven by the GSAP ticker, GSAP ScrollTrigger
  for scrubbed hero and corridor motion, sticky sheet stacking on desktop, and a
  different entrance gesture per section. Transform and opacity only; all
  continuous loops pause off-screen; `prefers-reduced-motion` removes Lenis,
  sheet stickiness, rain motion, glitch bursts, and reveal transforms while
  preserving the layout.
- **No internet dependencies at runtime** — fonts, icons, and images are
  bundled.

## Stack

- React 18 + Vite 6 (JSX, no TypeScript)
- Tailwind CSS (preflight and tokens only; layout is custom CSS)
- GSAP + ScrollTrigger for scroll choreography
- Lenis for weighted smooth scrolling
- Lucide React icons
- Self-hosted fonts via `@fontsource` (Silkscreen, Share Tech Mono)
- Official technology marks from Simple Icons (CC0) bundled locally

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve dist/ at http://localhost:4173
npm run check      # Playwright smoke test (needs a preview server)
```

For `npm run check`, start `npm run preview` first, then run the check in a
second terminal. It verifies overflow, console errors, all nine sections,
navigation state, the mobile menu, form validation, copy rules (no em dash), and
reduced motion.

## Sections

| # | Section | Nav | Content |
|---|---------|-----|---------|
| — | Hero | FEIZEN | CRT monitor, terminal readout, glitching wordmark, scroll cue |
| — | Corridor | — | Endless `FEIZEN` corridor on all four walls, between hero and About |
| 01 | About | About | Identity plate, name, role, focus, interests |
| 02 | Digital Archive | Archive | Index of real artefacts with category, stack, status |
| 03 | Infrastructure | Infrastructure | System map, build facts, security posture |
| 04 | Projects | Projects | Four real projects, stack, links when available |
| 05 | Expertise | Expertise | Grouped technology logos and names |
| 06 | Research | Research | Four ongoing study tracks, stated as open questions |
| 07 | Contact | Contact | `LET'S CONNECT.`, form, social channels |

## Customize content

All editable content lives in `src/data`; components do not need to change.

| File | Controls |
|------|----------|
| `src/data/about.js` | Name, alias, role, About copy, metadata, interests |
| `src/data/archive.js` | Archive entries and their anchors |
| `src/data/infrastructure.js` | System layers, facts, posture copy |
| `src/data/research.js` | Research tracks, questions, methods, status |
| `src/data/projects.js` | Project title, description, stack, cover, links |
| `src/data/technologies.js` | Technology names and grouping |
| `src/data/contact.js` | Email, GitHub, LinkedIn, Instagram |
| `src/data/profile.js` | Portrait and identity plate |
| `src/data/sections.js` | Navigation labels and section order |

### Portrait

No portrait is invented or generated. To use a real photo, add it to
`src/assets` and import it in `src/data/profile.js`:

```js
import portrait from '../assets/portrait.jpg'

export const profile = {
  // ...
  photo: portrait,
  alt: 'Portrait of Fernanda Brian Kholish',
}
```

The same file feeds the About identity plate.

### Project links

`github` and `live` are `null` for every entry, because no public URLs were
available. The UI hides each action when its URL is missing. Add a real URL to
show the link:

```js
{
  id: 'wisata-magetan',
  // ...
  github: 'https://github.com/FeizenF/repository-name',
  live: 'https://example.com',
}
```

### Contact

`src/data/contact.js` currently contains only the verified GitHub profile:

```js
export const contact = {
  email: '',                              // e.g. 'hello@example.com'
  github: 'https://github.com/FeizenF',
  linkedin: '',                           // full profile URL
  instagram: '',                          // full profile URL
}
```

- Only filled channels appear in the contact list.
- The form validates name, email, subject, and message.
- With `email` set, a valid submission opens the visitor's mail app through a
  prefilled `mailto:` link.
- With `email` empty, the form does not pretend to send anything: it explains
  that the email channel is not connected and links to GitHub instead.

## Assets and scripts

```
src/assets/                 project covers + grain (hashed by Vite)
public/                     favicon, OG cover, robots.txt, headers
scripts/build-brand-icons.cjs  regenerates src/data/brandIcons.js from Simple Icons
scripts/build-og.mjs        regenerates public/assets/og-cover.png
scripts/check.mjs           Playwright smoke test
```

```bash
npm run icons   # rebuild brand icon paths
npm run og      # rebuild the 1200x630 OG image
```

Technology paths are unmodified Simple Icons SVGs (CC0 1.0). Icons render in a
muted monochrome by default and take the official brand colour on hover.

## Responsive behaviour

- The CRT monitor scales with `--crt-w`, so its casing, screen, and readout stay
  proportional from 1440px down to 390px.
- The corridor uses viewport-relative ring sizes; mobile keeps the wall labels
  legible and the copy within the sticky viewport.
- Desktop stacks the hero and the seven content sections as sticky sheets; the
  corridor has its own sticky viewport between them. At 820px and below the page
  returns to normal document flow with no sticky layers.
- Layouts collapse at 1000px (infrastructure), 980px (two-column to single),
  940px (desktop nav to menu), 820px (research rows and sheet stacking), and
  760px (forms and table columns).
- Verified with no horizontal overflow at 1440, 1366, 820, and 390px.

## Deployment

The build uses `base: './'`, so `dist/` works at a domain root and under a
sub-path such as GitHub Pages' `/repository-name/`.

- **GitHub Pages** — publish `dist/` (for example with an Actions workflow). No
  base change is required.
- **Netlify** — `netlify.toml` is included (`npm run build`, publish `dist`).
- **Vercel** — `vercel.json` is included.
- **Other static hosts** — upload `dist/`.

Before going live on a real domain:

1. Set the canonical URL, `og:url`, and absolute `og:image`/`twitter:image`
   values in `index.html` (they are relative now because no domain is known).
2. Add a `sitemap.xml` and reference it from `robots.txt` if you want one.
3. Fill in the contact fields and portrait described above.

## Project structure

```
index.html                  metadata, JSON-LD, root node
src/
  App.jsx                   boot state, background layers, nav, sections
  main.jsx                  font and stylesheet imports
  assets/                   project covers + grain
  components/               AmbientBackground, BinaryRain, BootScreen,
                            FeizenTunnel, Footer, Navigation, ProfileFrame,
                            ProjectCard, Reveal, TechIcon
  data/                     about, archive, infrastructure, research,
                            projects, technologies, contact, profile,
                            sections, brandIcons
  hooks/                    useActiveSection, useReducedMotion, useReveal,
                            useSectionMotion, useSheetStack, useSmoothScroll
  lib/scroll.js             Lenis registry, flow offsets, anchor helpers
  sections/                 Hero, About, Archive, Infrastructure,
                            SelectedProjects, Expertise, Research, Contact
  styles/                   global, typography, animations, sections, crt, motion
scripts/                    icon, OG, and Playwright check scripts
```

## Accessibility

- Semantic landmarks, skip link, visible focus rings.
- Desktop and mobile navigation expose the active section with
  `aria-current="location"`.
- The mobile menu traps focus, closes on `Escape`, and restores focus.
- Form errors use `aria-invalid` and `aria-describedby`.
- Decorative rain, corridor walls, ambient layers, and identity-plate details
  are `aria-hidden`.
- Reduced motion removes the boot overlay, smooth scrolling, corridor travel,
  binary rain motion, glitch bursts, sheet stickiness, particles, and reveal
  transforms while preserving the full visual structure.
