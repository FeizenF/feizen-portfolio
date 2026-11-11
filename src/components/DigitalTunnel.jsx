/**
 * The hero corridor, built from typography and CSS perspective only.
 *
 * Each layer holds one FEIZEN marking on alternating walls. The layers scale
 * around the centre, so the markings both shrink and travel inward: the
 * typography forms the corridor. Four static corner marks cover the upper and
 * lower walls, and floor/ceiling grids carry the structural perspective.
 * Everything is transform/opacity and pauses when the hero leaves the viewport.
 */

/*
 * Each wall marking sits on a fixed line above or below the vanishing point.
 * Because every layer scales around that point, the markings shrink and slide
 * inward together: two rows that converge on the centre, not scattered words.
 */
const LAYERS = [
  { depth: 0, scale: 1, opacity: 0.26, side: 'left', top: '33%', delay: 0.1 },
  { depth: 1, scale: 0.87, opacity: 0.22, side: 'right', top: '59%', delay: 0.19 },
  { depth: 2, scale: 0.75, opacity: 0.19, side: 'left', top: '33%', delay: 0.28 },
  { depth: 3, scale: 0.64, opacity: 0.16, side: 'right', top: '59%', delay: 0.37 },
  { depth: 4, scale: 0.55, opacity: 0.13, side: 'left', top: '33%', delay: 0.46 },
  { depth: 5, scale: 0.46, opacity: 0.11, side: 'right', top: '59%', delay: 0.55 },
  { depth: 6, scale: 0.38, opacity: 0.09, side: 'left', top: '33%', delay: 0.64 },
  { depth: 7, scale: 0.31, opacity: 0.08, side: 'right', top: '59%', delay: 0.73 },
]

const PATHS = [
  { x: '-42vw', y: '-30vh', duration: 15, delay: -2 },
  { x: '38vw', y: '-26vh', duration: 18, delay: -7 },
  { x: '-34vw', y: '28vh', duration: 17, delay: -11 },
  { x: '44vw', y: '22vh', duration: 20, delay: -4 },
  { x: '-48vw', y: '4vh', duration: 16, delay: -13 },
  { x: '46vw', y: '-6vh', duration: 19, delay: -9 },
]

export default function DigitalTunnel() {
  return (
    <div className="tunnel" aria-hidden="true">
      <div className="tunnel-glow" />
      <div className="tunnel-portal" />

      <div className="tunnel-planes">
        <span className="tunnel-plane tunnel-plane--ceiling" />
        <span className="tunnel-plane tunnel-plane--floor" />
        <span className="tunnel-edge tunnel-edge--left" />
        <span className="tunnel-edge tunnel-edge--right" />
      </div>

      <div className="tunnel-layers">
        {LAYERS.map((layer) => (
          <div
            key={layer.depth}
            className="tunnel-layer"
            style={{
              '--scale': layer.scale,
              '--layer-opacity': layer.opacity,
              '--layer-delay': `${layer.delay}s`,
            }}
          >
            <span
              className={`tunnel-word tunnel-word--${layer.side}`}
              style={{ '--word-top': layer.top }}
            >
              FEIZEN
            </span>
          </div>
        ))}
      </div>

      <div className="tunnel-marks">
        <span className="tunnel-mark tunnel-mark--tl">FEIZEN</span>
        <span className="tunnel-mark tunnel-mark--tr">FEIZEN</span>
        <span className="tunnel-mark tunnel-mark--bl">FEIZEN</span>
        <span className="tunnel-mark tunnel-mark--br">FEIZEN</span>
        <span className="tunnel-mark tunnel-mark--top">FEIZEN</span>
        <span className="tunnel-mark tunnel-mark--bottom">FEIZEN</span>
      </div>

      <div className="tunnel-paths">
        {PATHS.map((path, index) => (
          <span
            key={index}
            className="tunnel-path"
            style={{
              '--x': path.x,
              '--y': path.y,
              '--duration': `${path.duration}s`,
              '--delay': `${path.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="tunnel-vignette" />
      <div className="tunnel-scan" />
    </div>
  )
}
