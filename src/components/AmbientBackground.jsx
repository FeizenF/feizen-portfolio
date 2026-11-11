const PARTICLES = [
  { left: '12%', top: '22%', size: 2, delay: -4, duration: 34 },
  { left: '26%', top: '68%', size: 3, delay: -18, duration: 46 },
  { left: '58%', top: '36%', size: 2, delay: -10, duration: 38 },
  { left: '72%', top: '74%', size: 2, delay: -27, duration: 52 },
  { left: '86%', top: '18%', size: 3, delay: -7, duration: 42 },
  { left: '44%', top: '88%', size: 1.5, delay: -33, duration: 56 },
]

/**
 * The page-wide atmosphere. Deliberately separate from the hero tunnel: a dark
 * charcoal field, a faint technical grid, slow light, and a little grain.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-base" />
      <div className="ambient-glow ambient-glow--a" />
      <div className="ambient-glow ambient-glow--b" />
      <div className="ambient-grid" />
      <div className="ambient-particles">
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className="ambient-particle"
            style={{
              left: particle.left,
              top: particle.top,
              '--dot': `${particle.size}px`,
              '--delay': `${particle.delay}s`,
              '--duration': `${particle.duration}s`,
            }}
          />
        ))}
      </div>
      <div className="ambient-noise" />
      <div className="ambient-vignette" />
    </div>
  )
}
