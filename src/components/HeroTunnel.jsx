/*
  A static perspective corridor drawn once as SVG and gently breathed by CSS.
  Rings recede toward the vanishing point behind the monitor; FEIZEN repeats on
  the side, top, and bottom walls. The monitor always sits above this layer.
*/

const RINGS = [
  { w: 1180, h: 760, o: 0.16 },
  { w: 980, h: 630, o: 0.2 },
  { w: 810, h: 522, o: 0.24 },
  { w: 660, h: 426, o: 0.26 },
  { w: 528, h: 342, o: 0.24 },
  { w: 410, h: 268, o: 0.2 },
  { w: 306, h: 202, o: 0.16 },
  { w: 214, h: 146, o: 0.12 },
]

const CX = 600
const CY = 360

function sideLabels(ring) {
  const xLeft = CX - ring.w / 2
  const xRight = CX + ring.w / 2
  const yTop = CY - ring.h / 2
  const yBottom = CY + ring.h / 2
  const size = Math.max(7, Math.round(ring.w / 46))

  return (
    <>
      <text
        x={xLeft + 4}
        y={CY}
        fill="rgba(255, 120, 52, 0.5)"
        fontSize={size}
        letterSpacing={size * 0.28}
        textAnchor="middle"
        transform={`rotate(-90 ${xLeft + 4} ${CY})`}
      >
        FEIZEN
      </text>
      <text
        x={xRight - 4}
        y={CY}
        fill="rgba(255, 120, 52, 0.38)"
        fontSize={size}
        letterSpacing={size * 0.28}
        textAnchor="middle"
        transform={`rotate(90 ${xRight - 4} ${CY})`}
      >
        FEIZEN
      </text>
      <text
        x={CX}
        y={yTop + size + 2}
        fill="rgba(255, 223, 209, 0.22)"
        fontSize={size}
        letterSpacing={size * 0.32}
        textAnchor="middle"
      >
        FEIZEN
      </text>
      <text
        x={CX}
        y={yBottom - 4}
        fill="rgba(255, 120, 52, 0.2)"
        fontSize={size}
        letterSpacing={size * 0.32}
        textAnchor="middle"
      >
        FEIZEN
      </text>
    </>
  )
}

export default function HeroTunnel() {
  return (
    <div className="hero-tunnel" aria-hidden="true">
      <div className="hero-tunnel-inner">
        <svg
          className="tunnel-svg"
          viewBox="0 0 1200 720"
          preserveAspectRatio="xMidYMid slice"
          role="presentation"
          focusable="false"
        >
          <defs>
            <radialGradient id="tunnel-fade" cx="50%" cy="50%" r="52%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
              <stop offset="42%" stopColor="#000000" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="tunnel-floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff5500" stopOpacity="0" />
              <stop offset="100%" stopColor="#ff5500" stopOpacity="0.12" />
            </linearGradient>
          </defs>

          <g stroke="rgba(255, 100, 30, 0.12)" fill="none" strokeWidth="1">
            <path d={`M0 0 L${CX} ${CY} L0 720`} />
            <path d={`M1200 0 L${CX} ${CY} L1200 720`} />
            <path d={`M0 720 L${CX} ${CY} L1200 720`} />
            <path d={`M0 0 L${CX} ${CY} L1200 0`} />
            <path d={`M0 180 L${CX} ${CY} L1200 180`} />
            <path d={`M0 540 L${CX} ${CY} L1200 540`} />
            <path d={`M0 100 L${CX} ${CY} L1200 460`} />
            <path d={`M1200 100 L${CX} ${CY} L0 460`} />
          </g>

          {RINGS.map((ring, index) => {
            const x = CX - ring.w / 2
            const y = CY - ring.h / 2
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={ring.w}
                  height={ring.h}
                  fill="none"
                  stroke={`rgba(255, 122, 48, ${ring.o * 0.42})`}
                  strokeWidth={index < 3 ? 1.4 : 1}
                />
                {sideLabels(ring)}
              </g>
            )
          })}

          <rect
            x="0"
            y={CY + 120}
            width="1200"
            height="300"
            fill="url(#tunnel-floor)"
            opacity="0.3"
          />
          <rect x="0" y="0" width="1200" height="720" fill="url(#tunnel-fade)" />
        </svg>
      </div>

      <div className="tunnel-glow" />
      <div className="tunnel-vignette" />
    </div>
  )
}
