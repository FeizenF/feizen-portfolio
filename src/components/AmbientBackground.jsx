/**
 * Page-wide atmosphere: a dark steel field with a sparse circuit network.
 *
 * Traces run in right angles like a board layout, nodes sit on the joints, and
 * three packets of light travel along the longest traces. Everything is SVG so
 * it scales without banding, and it stays behind the page content.
 */
const TRACES = [
  'M 140 160 H 420 V 110 H 760 V 190 H 1120 V 130 H 1500',
  'M 140 160 V 430 H 520 V 360 H 900 V 430 H 1240 V 380 H 1520',
  'M 520 360 V 640 H 200 V 760 H 600 V 820',
  'M 900 430 V 700 H 600 V 820',
  'M 1240 380 V 660 H 1520 V 760 H 1000 V 700',
]

const NODES = [
  { x: 140, y: 160, r: 3 },
  { x: 420, y: 110, r: 2 },
  { x: 760, y: 190, r: 2.5 },
  { x: 1120, y: 130, r: 2 },
  { x: 1500, y: 130, r: 3 },
  { x: 520, y: 360, r: 2.5 },
  { x: 900, y: 430, r: 3 },
  { x: 1240, y: 380, r: 2 },
  { x: 1520, y: 380, r: 2.5 },
  { x: 200, y: 760, r: 2.5 },
  { x: 600, y: 640, r: 3 },
  { x: 600, y: 820, r: 2 },
  { x: 1000, y: 700, r: 2.5 },
  { x: 1520, y: 760, r: 3 },
]

export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-base" />

      <svg
        className="ambient-network"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <filter
            id="ambient-packet-glow"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="ambient-traces">
          {TRACES.map((trace, index) => (
            <path key={index} className="ambient-trace" d={trace} />
          ))}
        </g>

        <g className="ambient-nodes">
          {NODES.map((node, index) => (
            <g key={index}>
              <circle
                className="ambient-node-ring"
                cx={node.x}
                cy={node.y}
                r={node.r * 3.4}
              />
              <circle
                className="ambient-node-core"
                cx={node.x}
                cy={node.y}
                r={node.r}
                style={{ '--node-delay': `${(index % 6) * -1.4}s` }}
              />
            </g>
          ))}
        </g>

        <g filter="url(#ambient-packet-glow)">
          <path
            className="ambient-beam ambient-beam--a"
            d={TRACES[0]}
          />
          <path
            className="ambient-beam ambient-beam--b"
            d={TRACES[1]}
          />
          <path
            className="ambient-beam ambient-beam--c"
            d={TRACES[2]}
          />
        </g>
      </svg>

      <div className="ambient-grid" />
      <div className="ambient-noise" />
      <div className="ambient-scan" />
      <div className="ambient-vignette" />
    </div>
  )
}
