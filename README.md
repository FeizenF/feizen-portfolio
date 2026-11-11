# FEIZEN / Cybersecurity Portfolio

A single-page portfolio for **Fernanda Brian Kholish (Feizen)**, a cybersecurity
student and application developer. The design centres on a beige CRT monitor
built entirely in CSS, an orange terminal readout, and a typographic tunnel that
recedes behind the screen.

Five sections only: Hero, About, Projects, Expertise, Contact.

## Design notes

- **Hero CRT** — casing, bezel, screen, stand, buttons, LED, vents, scanlines,
  flicker, glare, sticky notes, and floor shadow are CSS geometry. No monitor
  image or 3D library is used.
- **Tunnel** — a single static SVG corridor with repeated `FEIZEN` wall labels
  and one slow breathing animation. It is paused with `IntersectionObserver`
  when the hero leaves the viewport.
- **Palette** — `#080301`, `#ff5500`, `#c24100`, `#ffdfd1`, `#dcd9ce`, `#141414`.
- **Type** — Rajdhani (display), Share Tech Mono (CRT), Silkscreen (pixel
  accents), Geist (body), JetBrains Mono (labels).
- **Background** — dark charcoal, slow light drift, faint grid, grain, and six
  restrained particles. No WebGL.
- **Motion** — transform/opacity only, `IntersectionObserver` reveals, and full
  `prefers-reduced-motion` support. The boot screen is about 1.1s and is skipped
  on repeat visits within the same session and when reduced motion is enabled.

## Stack

- React 18 + Vite 6 (JSX, no TypeScript)
- Tailwind CSS (preflight and design tokens only; layout is custom CSS)
- Lucide React icons
- Self-hosted fonts via `@fontsource` / `@fontsource-variable`
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
second terminal. It verifies layout overflow, console errors, all five
sections, navigation state, the mobile menu, form validation, and reduced
motion.

## Sections

| # | Section | Nav | Content |
|---|---------|-----|---------|
| 01 | Hero | FEIZEN | CRT monitor, terminal readout, tunnel |
| 02 | About | About | Identity plate, name, role, interests |
| 03 | Projects | Projects | Four real projects, stack, links when available |
| 04 | Expertise | Expertise | Grouped technology logos and names |
| 05 | Contact | Contact | `LET'S CONNECT.`, form, social channels |

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

Until then the About section shows a typographic identity plate.

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

- The monitor is sized with `--mon: clamp(280px, min(74vw, 70vh), 720px)`, so it
  scales with the viewport instead of being fixed.
- The tunnel, monitor, notes, and readout all scale from the same variable.
- Layouts collapse at 980px (two-column → single column), 900px (desktop nav →
  mobile menu), and 760px (forms and card details).
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
  App.jsx                   boot state, ambient background, nav, sections
  main.jsx                  font and stylesheet imports
  assets/                   project covers + grain
  components/               AmbientBackground, BootScreen, CrtMonitor,
                            Footer, HeroTunnel, Navigation, ProfileFrame,
                            ProjectCard, Reveal, TechIcon
  data/                     about, projects, technologies, contact,
                            profile, sections, brandIcons
  hooks/                    useActiveSection, useReducedMotion, useReveal
  lib/scroll.js             native smooth scroll helpers
  sections/                 Hero, About, SelectedProjects, Expertise, Contact
  styles/                   global, typography, animations, sections
scripts/                    icon, OG, and Playwright check scripts
```

## Accessibility

- Semantic landmarks, skip link, visible focus rings.
- Desktop and mobile navigation expose the active section with
  `aria-current="location"`.
- The mobile menu traps focus, closes on `Escape`, and restores focus.
- Form errors use `aria-invalid` and `aria-describedby`.
- Decorative CRT, tunnel, and background layers are `aria-hidden`.
- Reduced motion disables the boot overlay, tunnel breathing, flicker, LED
  pulse, scan lines, particles, and reveal transforms.
