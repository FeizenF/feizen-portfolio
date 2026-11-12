# FEIZEN / Cybersecurity Portfolio

A single-page portfolio for **Fernanda Brian Kholish (Feizen)**, a cybersecurity
student and application developer. The hero is a beige CRT monitor displaying a
live terminal readout, followed by four full-screen sections in a standard
portfolio order.

Hero, About, Projects, Expertise, Contact. Each section fills one screen, and
navigation lands flush on the section it points to.

## Design notes

- **Hero monitor** — a CSS-built CRT: cream casing, bezel, curved screen,
  scanlines, flicker, knobs, stand, sticky notes, and a glitching `FEIZEN`
  wordmark over a terminal table. The screen content is real portfolio data, not
  decoration. A short boot overlay precedes it and is skipped on repeat visits.
- **Background** — a fixed cyber-steel atmosphere in the spirit of the nexus
  template: slow SVG light beams, a faint technical grid, film noise, thin
  scanlines, and a radial vignette.
- **Binary rain** — a fixed canvas of falling `0` and `1` glyphs behind the
  content, like slow stars. It pauses when the tab is hidden and becomes a
  static field under reduced motion.
- **Portrait** — the About frame holds the real photo when supplied. Until then
  it shows a typographic identity plate. Nothing is generated or borrowed.
- **Palette** — `#080b0f` background, `#11161c` and `#171d24` surfaces,
  `#e8e5dc` text, `#92979d` secondary text, and one restrained steel-blue accent.
- **Type** — Rajdhani for the `FEIZEN` wordmark and section titles, Share Tech
  Mono for body copy, JetBrains Mono for small technical labels, and Silkscreen
  for the boot word and small pixel accents. All self-hosted.
- **Motion** — Lenis smooth scroll driven by the GSAP ticker, GSAP ScrollTrigger
  for the hero drift and section entrances, and a project rail that slides in
  then runs horizontally, pausing on hover, focus, and off-screen. Transform and
  opacity only; `prefers-reduced-motion` removes Lenis, the marquee, rain motion,
  glitch bursts, and reveal transforms while preserving the layout.
- **No internet dependencies at runtime** — fonts, icons, and images are
  bundled.

## Stack

- React 18 + Vite 6 (JSX, no TypeScript)
- Tailwind CSS (preflight and tokens only; layout is custom CSS)
- GSAP + ScrollTrigger for scroll choreography
- Lenis for weighted smooth scrolling
- Lucide React icons
- Self-hosted fonts via `@fontsource` (Rajdhani, Share Tech Mono, JetBrains Mono,
  Silkscreen)
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
second terminal. It verifies overflow, console errors, the five sections, exact
anchor landing, navigation state, the project rail, the mobile menu, form
validation, copy rules (no em dash), typography, and reduced motion.

## Sections

| # | Section | Nav | Content |
|---|---------|-----|---------|
| — | Hero | FEIZEN | CRT monitor, terminal readout, glitching wordmark, scroll cue |
| 01 | About | About | Identity plate, name, role, focus, interests |
| 02 | Projects | Projects | Horizontal rail of four real projects, stack, links when available |
| 03 | Expertise | Expertise | Grouped technology logos and names |
| 04 | Contact | Contact | `LET'S CONNECT.`, form, GitHub channel, footer |

## Customize content

All editable content lives in `src/data`; components do not need to change.

| File | Controls |
|------|----------|
| `src/data/about.js` | Name, alias, role, About copy, metadata, interests |
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
src/assets/                 project covers (hashed by Vite)
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
- Every section is at least `100svh` tall and centres its content, so a nav click
  lands on a complete screen. On phones the form and project rail stay compact
  enough to fit one screen as well.
- The project rail uses two duplicated sets for a seamless horizontal loop, and
  pauses when the pointer or keyboard focus enters, when off-screen, and under
  reduced motion (where it becomes a normal horizontal scroll).
- Layouts collapse at 980px (projects/expertise heads, contact columns), 940px
  (desktop nav to menu), 760px (About stacks, compact tech list, tighter form),
  and 640px (portrait plate hidden). Short desktop windows (`max-height: 830px`)
  get a compact variant so sections still fit one screen.
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
  assets/                   project covers
  components/               AmbientBackground, BinaryRain, BootScreen, Footer,
                            Navigation, ProfileFrame, ProjectCard, Reveal,
                            TechIcon
  data/                     about, projects, technologies, contact, profile,
                            sections, brandIcons
  hooks/                    useActiveSection, useReducedMotion, useReveal,
                            useSectionMotion, useSmoothScroll
  lib/scroll.js             Lenis registry, flow offsets, anchor helpers
  sections/                 Hero, About, SelectedProjects, Expertise, Contact
  styles/                   global, typography, animations, sections, crt, motion
scripts/                    icon, OG, and Playwright check scripts
```

## Accessibility

- Semantic landmarks, skip link, visible focus rings.
- Desktop and mobile navigation expose the active section with
  `aria-current="location"`.
- The mobile menu traps focus, closes on `Escape`, and restores focus.
- Form errors use `aria-invalid` and `aria-describedby`.
- Decorative rain, ambient layers, and identity-plate details are `aria-hidden`.
- Reduced motion removes the boot overlay, smooth scrolling, the project rail
  animation, binary rain motion, glitch bursts, and reveal transforms while
  preserving the full visual structure.
