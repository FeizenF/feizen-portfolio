/**
 * Infrastructure facts drawn from the repository itself: the build output, the
 * source tree, the local toolchain, and the mobile stack used by the projects.
 * No servers, IPs, or hosting claims are invented.
 */
export const infrastructure = {
  index: '03',
  marker: 'INFRASTRUCTURE / SYSTEM MAP',
  titleLead: 'THE GROUND',
  titleAccent: 'BENEATH THE WORK.',
  intro:
    'The systems I actually run: a static front end, a versioned source tree, and a local toolchain used to build and verify it. Nothing on this map is hypothetical infrastructure.',
  layers: [
    {
      id: '01',
      layer: 'APPLICATION',
      component: 'React 18 / Vite 6',
      note: 'Component interface, compiled to static HTML, CSS, and JavaScript.',
    },
    {
      id: '02',
      layer: 'DELIVERY',
      component: 'Static build / dist',
      note: 'Relative asset paths, deployable to a domain root or a repository sub-path.',
    },
    {
      id: '03',
      layer: 'SOURCE',
      component: 'Git / GitHub',
      note: 'Version control and the public repository behind this portfolio.',
    },
    {
      id: '04',
      layer: 'LOCAL',
      component: 'Node.js / npm / Windows',
      note: 'Development and verification environment used to build and test.',
    },
    {
      id: '05',
      layer: 'MOBILE',
      component: 'Flutter / Dart',
      note: 'Application builds shipped outside the browser, from the same source discipline.',
    },
  ],
  facts: [
    { value: 'STATIC', label: 'OUTPUT' },
    { value: '00', label: 'TRACKERS' },
    { value: '01', label: 'PUBLIC SOURCE' },
    { value: '60', label: 'FPS TARGET' },
  ],
  posture:
    'The site ships as static assets. There is no server-side secret in the client, no analytics or tracking script, and no third-party runtime script. The contact form hands the message to a local mail client instead of posting it to a backend.',
  postureNote: 'SECURITY IS A PROPERTY OF THE BUILD, NOT A FEATURE BADGE.',
}
