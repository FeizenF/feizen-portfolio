/**
 * Page-wide atmosphere in the spirit of the nexus template: a dark steel field,
 * slow light beams drawn as SVG noodles, a faint grid, film noise, scanlines,
 * and a soft vignette. Recoloured from the template's amber to cyber blue.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-base" />

      <svg
        className="ambient-beams"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <filter
            id="ambient-beam-glow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="0.18" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <path
          className="ambient-beam-rail"
          d="M 12,-10 C 12,30 88,70 88,110"
        />
        <path
          className="ambient-beam ambient-beam--a"
          d="M 12,-10 C 12,30 88,70 88,110"
          filter="url(#ambient-beam-glow)"
        />

        <path
          className="ambient-beam-rail"
          d="M 88,-10 C 88,40 16,60 16,110"
        />
        <path
          className="ambient-beam ambient-beam--b"
          d="M 88,-10 C 88,40 16,60 16,110"
          filter="url(#ambient-beam-glow)"
        />

        <path
          className="ambient-beam-rail"
          d="M 50,-10 C 64,30 34,60 50,110"
        />
        <path
          className="ambient-beam ambient-beam--c"
          d="M 50,-10 C 64,30 34,60 50,110"
          filter="url(#ambient-beam-glow)"
        />
      </svg>

      <div className="ambient-grid" />
      <div className="ambient-noise" />
      <div className="ambient-scan" />
      <div className="ambient-vignette" />
    </div>
  )
}
