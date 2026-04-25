"use client"

// Each scene is a hand-drawn SVG silhouette of the actual national park,
// occupying the bottom 60-70% of the card. Fills use the portfolio's own
// palette + kit accents so each scene reads as part of the kit. The motif
// sits ON TOP — motion = the product purpose, scene = the park identity.

import { motion } from "framer-motion"
import { tokens, type Palette } from "../lib/design-kit"

export function ParkScene({
  parkId,
  palette,
}: {
  parkId: string
  palette: Palette
}) {
  switch (parkId) {
    case "voyageurs":
      return <VoyageursScene palette={palette} />
    case "zion":
      return <ZionScene palette={palette} />
    case "arches":
      return <ArchesScene palette={palette} />
    case "sequoia":
      return <SequoiaScene palette={palette} />
    case "saguaro":
      return <SaguaroScene palette={palette} />
    default:
      return null
  }
}

// VOYAGEURS — Boundary Waters: layered pines, lake reflection, aurora bands
function VoyageursScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] overflow-hidden">
      <svg
        viewBox="0 0 800 360"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <motion.path
          d="M 0 80 Q 200 20 400 60 T 800 50 L 800 110 Q 600 150 400 110 T 0 130 Z"
          fill={tokens.accentTeal}
          opacity={0.18}
          animate={{ opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 50 Q 250 0 500 30 T 800 20 L 800 80 Q 500 110 250 80 T 0 100 Z"
          fill={tokens.mint}
          opacity={0.14}
          animate={{ opacity: [0.08, 0.22, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <g fill={tokens.deepTeal} opacity={0.65}>
          {Array.from({ length: 14 }).map((_, i) => {
            const x = i * 60
            const h = 70 + ((i * 13) % 40)
            return (
              <polygon
                key={`b${i}`}
                points={`${x},220 ${x + 22},${220 - h} ${x + 44},220`}
              />
            )
          })}
        </g>
        <rect x={0} y={220} width={800} height={3} fill={tokens.accentTeal} opacity={0.4} />
        <g fill={tokens.ink}>
          {Array.from({ length: 10 }).map((_, i) => {
            const x = i * 90 - 30
            const h = 110 + ((i * 17) % 50)
            return (
              <g key={`f${i}`}>
                <polygon
                  points={`${x + 30},250 ${x + 50},${250 - h * 0.6} ${x + 70},250`}
                />
                <polygon points={`${x + 25},280 ${x + 50},${280 - h} ${x + 75},280`} />
                <rect x={x + 47} y={278} width={6} height={20} />
              </g>
            )
          })}
        </g>
        <rect x={0} y={295} width={800} height={70} fill={tokens.deepTeal} opacity={0.4} />
        <g fill={tokens.accentTeal}>
          <path d="M 540 320 Q 600 312 660 320 Q 600 332 540 320 Z" />
          <line
            x1={595}
            y1={315}
            x2={605}
            y2={300}
            stroke={tokens.accentTeal}
            strokeWidth={2}
          />
        </g>
      </svg>
    </div>
  )
}

// ZION — Stepped red sandstone canyon walls
function ZionScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] overflow-hidden">
      <svg
        viewBox="0 0 800 360"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <path
          d="M 0 200 L 80 200 L 100 170 L 220 170 L 240 200 L 360 200 L 380 160 L 540 160 L 560 200 L 700 200 L 720 180 L 800 180 L 800 360 L 0 360 Z"
          fill={tokens.plum}
          opacity={0.45}
        />
        <path
          d="M 0 240 L 60 240 L 80 210 L 200 210 L 220 240 L 320 240 L 340 220 L 460 220 L 480 250 L 600 250 L 620 230 L 760 230 L 780 250 L 800 250 L 800 360 L 0 360 Z"
          fill={tokens.coral}
          opacity={0.6}
        />
        <path
          d="M 0 290 L 100 290 L 120 270 L 240 270 L 260 290 L 380 290 L 400 275 L 520 275 L 540 295 L 660 295 L 680 280 L 800 280 L 800 360 L 0 360 Z"
          fill={tokens.char}
          opacity={0.85}
        />
        <g stroke={tokens.char} strokeWidth={1} opacity={0.25}>
          <line x1={0} y1={310} x2={800} y2={310} />
          <line x1={0} y1={325} x2={800} y2={325} />
          <line x1={0} y1={340} x2={800} y2={340} />
        </g>
      </svg>
    </div>
  )
}

// ARCHES — Delicate Arch silhouette + desert plateau
function ArchesScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] overflow-hidden">
      <svg
        viewBox="0 0 800 360"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <path
          d="M 0 240 L 200 240 L 240 210 L 360 210 L 380 240 L 800 240 L 800 360 L 0 360 Z"
          fill={tokens.mint}
          opacity={0.35}
        />
        <rect x={0} y={290} width={800} height={70} fill={tokens.ink} opacity={0.85} />
        <g fill={tokens.mint}>
          <path
            d="M 470 290 L 470 260 Q 470 220 510 215 Q 540 212 555 235 Q 570 215 600 215 Q 640 215 645 255 Q 645 275 638 285 L 638 290 L 615 290 L 615 270 Q 615 245 595 245 Q 575 245 575 270 L 575 290 L 535 290 L 535 268 Q 535 245 510 245 Q 490 245 490 270 L 490 290 Z"
          />
        </g>
        <g fill={tokens.mint} opacity={0.85}>
          <path
            d="M 130 290 L 130 260 Q 130 235 155 232 Q 180 230 195 252 Q 200 270 195 285 L 195 290 L 178 290 L 178 270 Q 178 252 162 252 Q 145 252 145 270 L 145 290 Z"
          />
        </g>
      </svg>
    </div>
  )
}

// SEQUOIA — Giant trunk silhouettes + forest floor
function SequoiaScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] overflow-hidden">
      <svg
        viewBox="0 0 800 360"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <rect x={0} y={310} width={800} height={50} fill={tokens.deepTeal} opacity={0.7} />
        <g fill={tokens.deepTeal} opacity={0.55}>
          {[80, 200, 320, 440, 560, 680].map((x, i) => (
            <g key={i}>
              <polygon
                points={`${x - 14},310 ${x},${250 - (i % 2) * 10} ${x + 14},310`}
              />
              <rect x={x - 3} y={305} width={6} height={10} />
            </g>
          ))}
        </g>
        <g fill={tokens.char}>
          <rect x={360} y={60} width={70} height={250} rx={6} />
          <rect x={120} y={100} width={50} height={210} rx={5} />
          <rect x={620} y={80} width={60} height={230} rx={5} />
        </g>
        <g stroke={tokens.coral} strokeWidth={1.5} opacity={0.25}>
          <line x1={370} y1={80} x2={370} y2={300} />
          <line x1={395} y1={80} x2={395} y2={300} />
          <line x1={420} y1={80} x2={420} y2={300} />
          <line x1={130} y1={120} x2={130} y2={300} />
          <line x1={150} y1={120} x2={150} y2={300} />
          <line x1={635} y1={100} x2={635} y2={300} />
          <line x1={660} y1={100} x2={660} y2={300} />
        </g>
        <g fill={tokens.deepTeal} opacity={0.6}>
          <ellipse cx={395} cy={50} rx={120} ry={45} />
          <ellipse cx={145} cy={90} rx={75} ry={32} />
          <ellipse cx={650} cy={70} rx={95} ry={38} />
        </g>
      </svg>
    </div>
  )
}

// SAGUARO — Desert with cacti + distant mesa, golden hour
function SaguaroScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] overflow-hidden">
      <svg
        viewBox="0 0 800 360"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <radialGradient id="saguaro-sun" cx="0.7" cy="0.3" r="0.6">
            <stop offset="0%" stopColor={tokens.citrus} stopOpacity={0.4} />
            <stop offset="100%" stopColor={tokens.citrus} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={800} height={360} fill="url(#saguaro-sun)" />
        <path
          d="M 0 220 L 100 220 L 130 195 L 280 195 L 310 220 L 800 220 L 800 360 L 0 360 Z"
          fill={tokens.coral}
          opacity={0.4}
        />
        <path
          d="M 0 260 L 200 260 L 240 240 L 420 240 L 460 260 L 800 260 L 800 360 L 0 360 Z"
          fill={tokens.plum}
          opacity={0.5}
        />
        <rect x={0} y={310} width={800} height={50} fill={tokens.ink} opacity={0.85} />
        <g fill={tokens.accentTeal}>
          <path
            d="M 380 310 L 380 200 Q 380 175 395 170 Q 415 170 415 200 L 415 220 Q 415 200 432 200 Q 448 200 448 215 L 448 245 L 432 245 L 432 235 L 415 235 L 415 310 Z"
          />
          <path
            d="M 348 310 L 348 240 Q 348 222 358 218 Q 372 218 372 240 L 372 310 Z"
          />
          <path
            d="M 130 310 L 130 220 Q 130 200 145 198 Q 162 198 162 220 L 162 240 Q 162 222 175 222 Q 188 222 188 235 L 188 260 L 175 260 L 175 250 L 162 250 L 162 310 Z"
          />
          <path
            d="M 620 310 L 620 230 Q 620 215 632 213 Q 645 213 645 230 L 645 310 Z"
          />
          <path
            d="M 670 310 L 670 250 Q 670 235 682 233 Q 695 233 695 250 L 695 270 Q 695 255 708 255 Q 720 255 720 268 L 720 290 L 708 290 L 708 282 L 695 282 L 695 310 Z"
          />
        </g>
        <g stroke={tokens.ink} strokeWidth={1} opacity={0.3}>
          <line x1={397} y1={185} x2={397} y2={305} />
          <line x1={140} y1={210} x2={140} y2={305} />
          <line x1={681} y1={245} x2={681} y2={305} />
        </g>
      </svg>
    </div>
  )
}
