# FEIZEN — CYBERSECURITY PORTFOLIO
## Design System & Implementation Specification

## 1. PROJECT OVERVIEW

Create a high-fidelity personal developer portfolio inspired by the sophisticated visual atmosphere, layered transitions, and experimental scrolling experience of "ÉTALE · Yachts for still water".

Reinterpret the entire visual identity into a distinctive **Cybersecurity × Retro-Futurism** concept.

The website represents a developer interested in cybersecurity, software development, systems, and digital infrastructure.

This is not a generic hacker website, cyberpunk dashboard, or terminal-themed template.

The design should feel like a premium digital archive documenting technology, security research, and software engineering.

### Brand Identity

- Brand: FEIZEN
- Main Identity: Developer / Cybersecurity Enthusiast
- Core Interests: Cybersecurity, Backend Development, Systems & Infrastructure
- Main Slogan: BUILD. UNDERSTAND. SECURE.
- Visual Direction: Retro-Futuristic Editorial
- Overall Mood: Sophisticated, atmospheric, technical, restrained.

## 2. CRITICAL DESIGN DIRECTION

Preserve the original reference's complex visual composition and animation techniques while completely replacing its yacht-related content.

The visual identity must communicate:

- Digital security.
- Computer architecture.
- Network infrastructure.
- Encryption and cryptography.
- Software engineering.
- Retro computing.
- Technological exploration.

Use cinematic photography, abstract technical imagery, vintage computer hardware, circuit board details, network structures, and architectural compositions.

Avoid generic cybersecurity imagery.

### Strictly Avoid

- Generic hacker aesthetics.
- Fake terminal windows.
- Random binary code backgrounds.
- Excessive neon colors.
- Glitch effects everywhere.
- Green Matrix-style rain.
- Dashboard layouts.
- Excessive glowing borders.
- Unnecessary 3D objects.
- Japanese typography or decorative elements.
- Generic AI-generated portfolio layouts.
- Excessive gradients and glassmorphism.

The final result must feel intentionally art-directed.

## 3. TECH STACK

Use the following technologies:

- React with Vite.
- JavaScript / JSX.
- Tailwind CSS for utility styling.
- Custom CSS for complex visual effects.
- GSAP 3.12.5.
- GSAP ScrollTrigger.
- Lenis 1.1.13.
- Lucide React for minimal interface icons.
- Google Fonts:
  - Bodoni Moda — editorial serif headings.
  - Geist — primary interface and body typography.
  - Geist Mono — technical labels and specifications.

Do not introduce Laravel, databases, or unnecessary backend infrastructure.

This is a frontend-focused personal portfolio.

## 4. GLOBAL VISUAL SYSTEM

### Color Palette

Establish a restrained palette inspired by vintage computer hardware, archival photography, and digital infrastructure.

```css
:root {
  --g-hero: #171D24;
  --g-strip: #252E37;
  --g-surface: #303B45;

  --ink: #171D24;
  --light: #E8E5DC;

  --accent: #A4B6A6;
  --muted: #929A9E;

  --border: rgba(232, 229, 220, 0.18);
  --overlay: rgba(10, 14, 19, 0.48);

  --nav: 64px;
}
```

Use color transitions according to the underlying section.

Do not make every section equally dark. Introduce controlled variations between charcoal, muted blue-gray, warm archival white, and desaturated metallic tones.

### Typography

- Large editorial serif typography for primary statements.
- Clean sans-serif for paragraphs and navigation.
- Monospaced typography for technical specifications, dates, labels, and metadata.
- Uppercase `.cap` class with `letter-spacing: 0.22em`.

Use italic serif typography selectively for important introductory statements.

### Layout

- Full-screen compositions.
- Large typography.
- Asymmetric positioning.
- Generous whitespace.
- Layered imagery.
- Editorial alignment.
- Subtle borders.
- Minimal navigation.

The design should prioritize composition over decorative elements.

## 5. CUSTOM SHEET SYSTEM

Recreate the reference's custom Sheet architecture.

Each main section should use:

```css
.sheet {
  position: sticky;
  top: 0;
  min-height: 100svh;
}
```

Z-index increments by 2 per section:

- Hero: 2
- Archive: 4
- Infrastructure: 6
- Projects: 8
- Research: 10
- Contact: 12

Implement section visibility and stacking logic without relying on CSS scroll-snap.

### Fixed Navigation

- Fixed positioning.
- Height: 64px.
- Z-index: 40.
- Subtle gradient background.
- Minimal typography.
- Section-aware navigation colors.

Navigation text must dynamically switch between `--ink` and `--light` depending on the background beneath the fixed navigation.

### Transition Veil

Create a fixed full-screen overlay between stacking sections.

- Position: fixed.
- Inset: 0.
- Height: 100vh.
- Opacity driven by scroll progress.
- Z-index dynamically managed by JavaScript.

The veil should create subtle atmospheric transitions rather than abrupt visual changes.

## 6. SCROLLING AND ANIMATION

Use Lenis for smooth scrolling.

Configuration:

```js
const lenis = new Lenis({
  lerp: 0.05,
  smoothWheel: true,
});
```

Integrate Lenis with GSAP ScrollTrigger correctly.

Use a single coordinated animation loop. Ensure ScrollTrigger updates when Lenis scrolls.

Avoid conflicting animation loops and duplicate event listeners.

### Global Reveal System

Use IntersectionObserver for `.rv` elements.

Initial state:

- Opacity: 0.
- TranslateY: 20px.

Visible state:

- Opacity: 1.
- TranslateY: 0.

Use restrained timing and easing.

Animations should feel deliberate, smooth, and cinematic.

## 7. WEBSITE SECTIONS

### SECTION 01 — HERO / DIGITAL IDENTITY

Concept: A cinematic introduction to the developer.

Visual direction:

- Full-screen photographic background.
- Vintage computer hardware, motherboard architecture, or abstract network infrastructure.
- Dark charcoal and muted blue-gray atmosphere.
- Subtle film grain.
- Carefully controlled lighting.
- No fake terminal interfaces.

Content:

Top navigation:

`FEIZEN` | `WORK` | `ABOUT` | `EXPERTISE` | `CONTACT`

Small introductory labels:

`INDEPENDENT DEVELOPER`
`CYBERSECURITY / SYSTEMS`

Main statement:

**BUILD. UNDERSTAND. SECURE.**

Supporting text:

"I explore the intersection of software development, digital security, and the systems that connect them."

Large bottom typography:

**FEIZEN**

Animation:

- Main typography rises from a clipped container.
- Background image slowly reveals itself.
- Supporting text fades in.
- Subtle parallax movement.
- Hero video can be used if a suitable original asset is available.

The hero must immediately establish the identity of the portfolio.

### SECTION 02 — DIGITAL ARCHIVE

Concept: A visual representation of information, encryption, and digital structures.

Replace the yacht reflection strip with an abstract digital archive.

Implementation:

- Create a central image strip.
- Divide it into 72 horizontal `<b>` bands using JavaScript.
- Each band uses a section of the same source image.
- Use GSAP ScrollTrigger to animate horizontal offsets.

Visual material:

- Macro circuit board photography.
- PCB traces.
- Printed technical diagrams.
- Vintage computing components.
- Abstract data structures.

Animation:

- Bands begin with subtle sinusoidal offsets.
- Offsets settle toward zero as the section reaches its center.
- Maintain precise image alignment.
- Avoid visible gaps between bands.

The result should resemble a fragmented digital image reconstructing itself.

### SECTION 03 — SYSTEM INFRASTRUCTURE

Concept: Understanding what exists beneath the interface.

Replace the yacht hull with a layered computer architecture composition.

Visual direction:

- Server infrastructure.
- Motherboard macro photography.
- Processor architecture.
- Network cabling.
- Circuit board traces.

Implementation:

- Divide the main profile image into 72 vertical slices.
- Arrange them into two visual rows.
- Use a horizontal separation of approximately 4px.
- Animate vertical movement using a subtle 12px sinusoidal wave.
- Close the gaps progressively as the user scrolls.

Use a 170svh scroll track.

Ensure slice width uses:

```css
width: calc(var(--slice-width) + 1px);
```

Prevent sub-pixel rendering gaps.

Add a subtle requestAnimationFrame-based breathing animation.

The animation must pause when the section is outside the viewport to avoid unnecessary CPU usage.

### SECTION 04 — SELECTED PROJECTS

Concept: A horizontal gallery documenting software development work.

This is the primary portfolio section.

Use large side-by-side project plates with custom horizontal scroll-driven positioning.

Each project should have:

- Project number.
- Project title.
- Short description.
- Technology stack.
- Project image.
- Project category.
- External link or project detail navigation.

Initial project content:

01 — WISATA MAGETAN

Category: Mobile Application

Technology: Flutter / Dart

Description: A mobile application exploring tourism destinations in Magetan.

02 — PRODUCT CATALOG

Category: Application Development

Technology: Flutter / Dart

Description: A product catalog application featuring product details and interactive ordering functionality.

03 — PERSONAL PORTFOLIO

Category: Frontend Development

Technology: React / JavaScript

Description: A personal portfolio documenting development interests, projects, and technical exploration.

04 — DIGITAL FORENSICS

Category: Cybersecurity Research

Technology: Digital Forensics / ExifTool

Description: An exploration of file metadata, hidden data, and digital evidence analysis.

Important:

These are initial project entries. Keep all project information in a centralized JavaScript data file.

Do not invent professional experience, clients, achievements, or certifications.

### Horizontal Interaction

Implement custom scroll-driven horizontal movement.

- Use cubic easing for plate positioning.
- Each plate moves across the viewport based on scroll progress.
- Inner imagery moves in the opposite direction for parallax.
- Text remains readable during transitions.
- Support mouse, touch, and trackpad interactions.

Do not use CSS scroll-snap.

### SECTION 05 — EXPERTISE / TECHNICAL INTERESTS

Concept: A technical archive of development interests.

Use two distinct visual compositions.

#### 05A — TECHNICAL EXPERTISE

Display technical interests as large editorial typography.

Categories:

CYBERSECURITY

BACKEND DEVELOPMENT

SYSTEMS

INFRASTRUCTURE

FRONTEND DEVELOPMENT

Use a moving light sweep overlay.

The sweep should simulate light passing over a physical archival surface.

Implementation:

```css
.sweep {
  background: linear-gradient(
    110deg,
    transparent 30%,
    rgba(232, 229, 220, 0.10) 50%,
    transparent 70%
  );
}
```

Animate the gradient position through a CSS variable.

#### 05B — TECHNOLOGY STACK

Display technologies in a clean editorial layout.

Initial technology list:

- React
- JavaScript
- Flutter
- Dart
- Python
- Java
- Git
- Linux
- HTML
- CSS

Use Geist Mono for technical labels.

Avoid skill progress bars and arbitrary percentages.

Do not represent technologies as skills with invented proficiency ratings.

Use subtle connecting lines and small metadata labels.

### SECTION 06 — RESEARCH / DIGITAL SECURITY

Concept: A dedicated visual section exploring cybersecurity.

This section should communicate curiosity and technical exploration rather than claim professional security expertise.

Content areas:

- Digital Forensics.
- File Analysis.
- Encryption Fundamentals.
- Network Security.
- System Architecture.
- Secure Development.

Visual direction:

- Archival computer photography.
- Technical diagrams.
- Vintage hardware.
- Abstract encrypted data patterns.
- Subtle monochromatic textures.

Use hanging line elements and layered information panels inspired by the original Salon section.

Cards should use:

```css
backdrop-filter: blur(16px);
```

Only when the underlying imagery benefits from the effect.

Cards should fade in and translate as scroll progress changes from 0 to 1.

Avoid turning this section into a cybersecurity dashboard.

### SECTION 07 — CONTACT / FINAL STATEMENT

Concept: A quiet closing composition.

Use a contrasting background with restrained typography.

Main statement:

**LET'S BUILD SOMETHING MEANINGFUL.**

Supporting text:

"Interested in development, technology, or digital security? Let's connect."

Contact links:

- Email
- GitHub
- LinkedIn

Only display actual user-provided contact information.

Footer:

`FEIZEN`
`BUILD. UNDERSTAND. SECURE.`
`© 2026`

Add a subtle final reveal animation.

## 8. MEDIA AND ASSET MANAGEMENT

Use locally stored assets.

Suggested structure:

```text
public/
  assets/
    hero.jpg
    hero-mobile.jpg
    archive.jpg
    infrastructure.jpg
    project-wisata.jpg
    project-catalog.jpg
    project-portfolio.jpg
    digital-forensics.jpg
    expertise.jpg
    research.jpg
    texture-grain.png
```

The filenames are suggestions, not assumptions that files already exist.

Before implementation:

1. Inspect the existing assets directory.
2. Identify usable images and videos.
3. Reuse suitable existing assets.
4. Do not invent paths to nonexistent assets.
5. Do not use unrelated yacht imagery.
6. Do not use random stock imagery just to fill empty spaces.

If assets are missing, document what is needed.

### Media Behavior

- Use `object-fit: cover` for photographic backgrounds.
- Use responsive image sources when appropriate.
- Use `loading="lazy"` for non-critical images.
- Use `preload` for critical hero imagery.
- Respect `prefers-reduced-motion`.
- Pause offscreen videos.
- Do not force video playback if browser policies prevent it.

Hero video:

- Autoplay.
- Muted.
- Loop.
- Plays inline.
- Fade in after successful playback.
- Preserve a still image fallback.

## 9. RESPONSIVE DESIGN

The experience must work on:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

Desktop:

Preserve the complete layered experience, horizontal plates, and complex visual transitions.

Mobile:

- Use a dedicated portrait hero image where available.
- Reduce the number of image slices when necessary.
- Adjust typography and spacing.
- Replace complex horizontal interactions with a natural touch-friendly layout when needed.
- Prevent horizontal overflow.
- Ensure navigation remains accessible.

Do not simply scale down the desktop layout.

## 10. ACCESSIBILITY AND PERFORMANCE

- Respect reduced-motion preferences.
- Maintain sufficient text contrast.
- Use semantic HTML.
- Provide descriptive image alt text.
- Avoid unnecessary animation loops.
- Clean up GSAP timelines and ScrollTriggers on component unmount.
- Disconnect IntersectionObservers when no longer needed.
- Remove event listeners during cleanup.
- Optimize large image assets.
- Avoid layout shifts.
- Ensure all navigation links work.

The website must remain usable even if animations are disabled.

## 11. RECOMMENDED PROJECT ARCHITECTURE

Organize the React application into reusable components.

```text
src/
├── assets/
├── components/
│   ├── Navigation.jsx
│   ├── Sheet.jsx
│   ├── TransitionVeil.jsx
│   ├── Reveal.jsx
│   ├── ProjectPlate.jsx
│   └── Footer.jsx
│
├── sections/
│   ├── Hero.jsx
│   ├── DigitalArchive.jsx
│   ├── Infrastructure.jsx
│   ├── SelectedProjects.jsx
│   ├── Expertise.jsx
│   ├── Research.jsx
│   └── Contact.jsx
│
├── data/
│   ├── projects.js
│   ├── technologies.js
│   └── interests.js
│
├── hooks/
│   ├── useLenis.js
│   ├── useScrollProgress.js
│   └── useReveal.js
│
├── styles/
│   ├── global.css
│   ├── typography.css
│   ├── animations.css
│   └── sections.css
│
├── App.jsx
└── main.jsx
```

Keep components focused and reusable.

Avoid putting the entire application inside one large JSX file.

Store editable portfolio content in centralized data files.

## 12. IMPLEMENTATION RULES

Before writing code:

1. Inspect the existing project structure.
2. Inspect package.json.
3. Inspect existing dependencies.
4. Inspect all available assets.
5. Read this design specification completely.
6. Identify missing assets and implementation requirements.

Do not overwrite existing working code without understanding its purpose.

Implement the website section by section.

After each major section:

- Check layout.
- Check responsive behavior.
- Check scroll transitions.
- Check animation cleanup.
- Check browser console errors.

Do not use placeholder components or nonfunctional interactions.

Do not claim an interaction is implemented if it does not actually work.

Use real assets whenever available.

If a complex effect cannot be implemented reliably, prioritize a visually consistent and functional alternative rather than introducing broken code.

## 13. FINAL QUALITY STANDARD

The final website should feel like a carefully art-directed digital publication rather than a conventional developer portfolio.

Priorities:

1. Strong visual identity.
2. High-quality typography.
3. Atmospheric imagery.
4. Sophisticated section transitions.
5. Functional scrolling interactions.
6. Clean and maintainable React architecture.
7. Responsive behavior.
8. Performance and accessibility.

The final result should communicate:

**BUILD. UNDERSTAND. SECURE.**

A developer portfolio exploring the relationship between software, systems, and digital security through a distinctive retro-futuristic visual language.

# 14. PRODUCTION READINESS — PERFORMANCE, SECURITY & COMPATIBILITY

The website is intended for public hosting. All implementations must meet production-quality standards.

Visual fidelity must never take priority over usability, security, accessibility, or performance.

## 14.1 RESPONSIVE DESIGN

Implement a mobile-first responsive architecture.

Required device categories:

- Large desktop: 1440px and above.
- Standard desktop: 1024px–1439px.
- Tablet: 768px–1023px.
- Mobile: 375px–767px.
- Small mobile: 320px–374px.

Requirements:

- No horizontal overflow.
- No clipped navigation or text.
- No overlapping content.
- Responsive typography using `clamp()`.
- Fluid spacing and image dimensions.
- Proper viewport handling using `svh` and `dvh`.
- Support portrait and landscape orientations.
- Touch-friendly interactive elements.
- Minimum 44×44px recommended touch targets.
- Avoid hover-dependent functionality.
- Ensure all content remains accessible on small screens.

Complex desktop animations must have simplified mobile alternatives.

Do not force the 72-slice animation or complex horizontal scrolling on low-powered mobile devices.

## 14.2 PERFORMANCE OPTIMIZATION

Optimize the website for real-world devices and network conditions.

### Image Optimization

- Prefer AVIF and WebP.
- Provide responsive image sizes.
- Use `srcset` and `sizes` where appropriate.
- Lazy-load below-the-fold images.
- Prioritize the hero image.
- Set explicit image width and height or aspect ratio.
- Avoid unnecessarily large source images.
- Use appropriate compression without visible quality degradation.

### Video Optimization

- Avoid large autoplay videos on mobile.
- Use compressed video formats.
- Provide poster images.
- Use muted, playsinline, loop, and autoplay only where appropriate.
- Pause videos outside the viewport.
- Respect data-saving and reduced-motion preferences.
- Provide image fallbacks if video playback is unavailable.

### JavaScript Optimization

- Use Vite production builds.
- Lazy-load non-critical sections where appropriate.
- Use dynamic imports for heavy components.
- Avoid unnecessary React re-renders.
- Memoize expensive computations when beneficial.
- Clean up GSAP timelines and ScrollTriggers.
- Avoid duplicate animation loops.
- Avoid unnecessary dependencies.
- Do not block the initial page render with non-critical animations.

### Animation Performance

- Prefer transform and opacity animations.
- Avoid repeatedly animating layout properties.
- Use `will-change` only when necessary.
- Avoid excessive blur and backdrop filters on low-powered devices.
- Reduce animation complexity based on device capabilities when appropriate.
- Ensure smooth scrolling does not interfere with native browser accessibility.

### Performance Targets

Use Lighthouse as a quality measurement tool.

Target scores:

- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

Core Web Vitals targets:

- LCP: ≤ 2.5 seconds.
- INP: ≤ 200 milliseconds.
- CLS: ≤ 0.1.

Measure using production builds and realistic network conditions. Do not sacrifice essential content to achieve artificial benchmark scores.

## 14.3 SECURITY REQUIREMENTS

Treat the website as a publicly accessible production application.

### Frontend Security

- Never expose API secrets, private tokens, passwords, or credentials.
- Never store sensitive information in frontend JavaScript.
- Do not commit `.env` files containing secrets.
- Remember that Vite variables prefixed with `VITE_` are publicly exposed.
- Avoid `dangerouslySetInnerHTML`.
- Validate and sanitize untrusted user input.
- Avoid unsafe dynamic HTML rendering.
- Validate external URLs before rendering user-provided links.
- Use secure external link attributes where applicable.
- Avoid unnecessary third-party scripts.

### Dependency Security

- Use trusted npm packages.
- Avoid abandoned or unnecessary dependencies.
- Review dependency changes.
- Run `npm audit`.
- Resolve critical and high-severity vulnerabilities where applicable.
- Keep dependencies updated responsibly.
- Use a lockfile and reproducible installations with `npm ci`.

### Hosting Security

Configure hosting with:

- HTTPS enabled.
- HTTP to HTTPS redirection.
- Content Security Policy (CSP).
- X-Content-Type-Options: nosniff.
- Referrer-Policy.
- Appropriate Permissions-Policy.
- Secure caching policies.

Configure headers according to the actual deployment platform.

Do not enable overly restrictive CSP rules that unintentionally break required fonts, images, or animation resources.

### Contact Form Security

If a contact form is implemented:

- Do not place email service credentials in frontend code.
- Validate input on the server or trusted form service.
- Implement spam protection and rate limiting.
- Provide clear success and error states.
- Do not expose submitted personal information.
- Avoid collecting unnecessary personal data.

A static portfolio does not require a backend unless a feature genuinely needs one.

## 14.4 BROWSER AND DEVICE COMPATIBILITY

Support modern versions of:

- Google Chrome.
- Microsoft Edge.
- Mozilla Firefox.
- Safari.
- Chrome for Android.
- Safari for iOS.

Test actual browser behavior rather than relying only on desktop emulation.

Requirements:

- Use standard web APIs.
- Provide fallbacks for unsupported CSS features.
- Handle autoplay restrictions.
- Support keyboard navigation.
- Ensure navigation works without JavaScript-dependent hover interactions.
- Test touch, mouse, keyboard, and trackpad interactions.
- Avoid browser-specific assumptions.
- Handle different device pixel ratios.
- Ensure typography and layouts remain consistent across operating systems.

Target the latest two major versions of mainstream browsers where practical. Do not claim compatibility with every legacy device or browser.

## 14.5 ACCESSIBILITY

Follow WCAG 2.2 AA principles where practical.

Requirements:

- Semantic HTML.
- Correct heading hierarchy.
- Descriptive image alt attributes.
- Keyboard-accessible navigation.
- Visible focus states.
- Sufficient text contrast.
- Accessible interactive elements.
- Reduced-motion support.
- Proper labels for form inputs.
- No essential information communicated through color alone.

Implement `prefers-reduced-motion`.

When reduced motion is enabled:

- Disable decorative parallax.
- Simplify section transitions.
- Disable continuous breathing animations.
- Avoid forced smooth scrolling.
- Preserve access to all content and functionality.

## 14.6 FALLBACK AND RESILIENCE

The website must remain usable when advanced effects fail.

Examples:

- If GSAP fails, sections must remain readable.
- If Lenis fails, native browser scrolling must work.
- If videos fail, poster images must remain visible.
- If WebGL or advanced visual features are unavailable, use standard CSS alternatives.
- If JavaScript animations are disabled, content must remain accessible.
- If a network connection is slow, prioritize essential content.

Never hide essential content permanently because an animation or observer fails.

## 14.7 SEO AND SOCIAL SHARING

Implement basic technical SEO.

Requirements:

- Meaningful page titles.
- Meta descriptions.
- Canonical URL.
- Open Graph metadata.
- Twitter/X card metadata.
- Favicon.
- Proper heading hierarchy.
- Descriptive URLs.
- `robots.txt`.
- XML sitemap.
- Appropriate structured data when relevant.

The homepage should communicate the portfolio's identity in its title and description.

Do not invent professional credentials, organizations, or achievements in structured data.

## 14.8 DEPLOYMENT REQUIREMENTS

The website must be deployable as a production React application.

Use Vite production builds.

Required checks:

```bash
npm install
npm run build
npm run preview
```

Before deployment:

1. Remove development-only code.
2. Check console errors.
3. Verify all assets load correctly.
4. Test navigation and project links.
5. Test responsive layouts.
6. Verify production build output.
7. Check browser compatibility.
8. Check security headers.
9. Verify HTTPS.
10. Test the deployed website on real devices.

### Hosting Compatibility

Prepare the application for static hosting platforms such as:

- Vercel.
- Netlify.
- Cloudflare Pages.
- GitHub Pages.

Configure Vite's `base` path correctly for the chosen hosting provider.

If React Router uses history-based routing, configure SPA fallback and rewrite rules so refreshing a nested route does not produce a 404.

Do not assume that local development paths will work in production.

Use relative or correctly configured asset paths.

Do not hardcode localhost URLs into production code.

## 14.9 FINAL PRODUCTION ACCEPTANCE CHECKLIST

The project is considered complete only when:

- [ ] All sections render correctly.
- [ ] Desktop layout works.
- [ ] Tablet layout works.
- [ ] Mobile layout works.
- [ ] No horizontal overflow.
- [ ] Navigation functions correctly.
- [ ] Scroll animations work without blocking interaction.
- [ ] Reduced-motion mode works.
- [ ] Images and videos have appropriate fallbacks.
- [ ] No critical console errors.
- [ ] No broken asset paths.
- [ ] No exposed credentials or secrets.
- [ ] Dependencies have been reviewed.
- [ ] Production build completes successfully.
- [ ] HTTPS is configured on hosting.
- [ ] Security headers are configured.
- [ ] SEO metadata is present.
- [ ] Lighthouse checks have been performed.
- [ ] Real-device testing has been completed.

**FINAL PRINCIPLE:**

Build a portfolio that looks sophisticated on a high-end desktop but remains fast, secure, accessible, and fully usable on an ordinary smartphone.

The website must be production-ready, not merely a visually impressive local development demo.