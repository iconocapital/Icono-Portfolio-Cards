"use client"

// Icono Design Kit · Detail-page widgets.
//
//   AllocationAtlas → rotating donut of sleeve weights (the diversification view)
//   PortfolioCompass → dial pointing to where this portfolio sits on the
//                      conservative ↔ aggressive risk spectrum

import { motion } from "framer-motion"
import {
  tokens,
  styles,
  sleeveColor,
  type Palette,
} from "../lib/design-kit"
import type { Portfolio, Sleeve } from "../lib/portfolio-data"

/* -------------------------------------------------------------------------- */
/*                            AllocationAtlas                                 */
/* -------------------------------------------------------------------------- */

export function AllocationAtlas({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] p-9"
      style={{ background: tokens.sky, color: tokens.ink, minHeight: 360 }}
    >
      <p
        className="text-[10px] font-bold"
        style={{ ...styles.mono, opacity: 0.7 }}
      >
        Diversification · ATLAS
      </p>
      <h3
        className="mt-3 leading-[0.92]"
        style={{
          ...styles.display,
          fontWeight: 700,
          fontSize: 44,
          color: tokens.ink,
        }}
      >
        Allocation
        <br />
        Atlas
      </h3>
      <p className="mt-3 max-w-[260px] text-[14px]" style={{ opacity: 0.78 }}>
        Every dollar mapped. {portfolio.sleeves.length} sleeves, working in
        concert.
      </p>

      <AtlasDonut sleeves={portfolio.sleeves} />

      {/* Sleeve list */}
      <div className="mt-6 space-y-1.5">
        {portfolio.sleeves.map((s) => (
          <div key={s.id} className="flex items-center gap-2.5">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ background: sleeveColor(s.id) }}
            />
            <span className="truncate text-[12px]" style={{ opacity: 0.85 }}>
              {s.name}
            </span>
            <span
              className="ml-auto tabular-nums"
              style={{ ...styles.mono, fontWeight: 700, fontSize: 11 }}
            >
              {s.allocation}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AtlasDonut({ sleeves }: { sleeves: Sleeve[] }) {
  // Build pie segments. Cumulative angles → arc dasharray.
  const r = 38
  const c = 2 * Math.PI * r
  let cumulative = 0
  const segments = sleeves.map((s) => {
    const len = (s.allocation / 100) * c
    const offset = -cumulative
    cumulative += len
    return { id: s.id, len, offset, color: sleeveColor(s.id) }
  })

  return (
    <div
      className="pointer-events-none absolute"
      style={{ top: 24, right: 24, width: 160, height: 160 }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        style={{ transform: "rotate(-90deg)" }}
        animate={{ rotate: -90 + 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        {/* Track */}
        <circle
          cx={50}
          cy={50}
          r={r}
          fill="none"
          stroke="rgba(10,31,32,0.08)"
          strokeWidth={14}
        />
        {/* Segments */}
        {segments.map((seg) => (
          <circle
            key={seg.id}
            cx={50}
            cy={50}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={14}
            strokeDasharray={`${seg.len} ${c}`}
            strokeDashoffset={seg.offset}
            strokeLinecap="butt"
          />
        ))}
      </motion.svg>
      {/* Center label */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ color: tokens.ink }}
      >
        <div
          style={{
            ...styles.display,
            fontWeight: 700,
            fontSize: 28,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {sleeves.length}
        </div>
        <div
          className="mt-0.5 text-[8px] font-bold uppercase"
          style={{ ...styles.mono, opacity: 0.7, letterSpacing: "0.16em" }}
        >
          sleeves
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                            PortfolioCompass                                */
/* -------------------------------------------------------------------------- */

// Position each portfolio on the risk spectrum (0° = conservative, 360° looped).
// Compass dial maps 0–360°, but to keep the needle inside a single revolution
// we use 0° (top) = most aggressive (Voyageurs), and rotate clockwise.
//
// Risk spectrum (most → least aggressive):
//   Voyageurs (100% stock)  → top         (-90° in SVG/CSS, but 0° if we
//                                          orient the dial with 0° = up)
//   Zion (85/15)
//   Arches (70/30)
//   Sequoia (50/50)
//   Saguaro (35/65)
//
// We'll lay them out across the bottom 270° arc so the needle stays in the
// visible half. Saguaro on the far left, Voyageurs on the far right.

const COMPASS_ORDER = ["saguaro", "sequoia", "arches", "zion", "voyageurs"]

function compassAngleFor(portfolioId: string): number {
  const idx = COMPASS_ORDER.indexOf(portfolioId)
  if (idx < 0) return 0
  // Sweep from -120° (saguaro, lower-left) to +120° (voyageurs, lower-right)
  // Keeping a 240° sweep with 5 evenly spaced ticks → 60° between each
  const start = -120
  const step = 240 / (COMPASS_ORDER.length - 1)
  return start + idx * step
}

export function PortfolioCompass({ portfolio }: { portfolio: Portfolio }) {
  const angle = compassAngleFor(portfolio.id)
  const equityPct = portfolio.sleeves
    .filter((s) => s.id === "equity")
    .reduce((acc, s) => acc + s.allocation, 0)

  return (
    <div
      className="relative overflow-hidden rounded-[24px] p-9"
      style={{
        background: tokens.creamWarm,
        color: tokens.ink,
        border: `2px solid ${tokens.ink}`,
        minHeight: 360,
      }}
    >
      <p
        className="text-[10px] font-bold"
        style={{ ...styles.mono, color: tokens.inkSoft }}
      >
        Allocation · COMPASS
      </p>
      <h3
        className="mt-3 leading-[0.92]"
        style={{
          ...styles.display,
          fontWeight: 700,
          fontSize: 44,
          color: tokens.deepTeal,
        }}
      >
        Portfolio
        <br />
        Compass
      </h3>
      <p className="mt-3 max-w-[260px] text-[14px]" style={{ color: tokens.inkSoft }}>
        {portfolio.name} sits at <strong>{equityPct.toFixed(0)}% equity</strong>
        {" — "}{positionLabel(portfolio.id)} of the series.
      </p>

      <CompassDial angle={angle} palette={portfolio.palette} />

      {/* Tick legend along the bottom */}
      <div
        className="absolute bottom-7 left-9 right-9 flex justify-between text-[9px] font-bold uppercase"
        style={{ ...styles.mono, color: tokens.inkSoft, letterSpacing: "0.16em" }}
      >
        {COMPASS_ORDER.map((id) => (
          <span
            key={id}
            style={{
              opacity: id === portfolio.id ? 1 : 0.45,
              color: id === portfolio.id ? tokens.deepTeal : tokens.inkSoft,
            }}
          >
            {id.slice(0, 3)}
          </span>
        ))}
      </div>
    </div>
  )
}

function positionLabel(id: string): string {
  switch (id) {
    case "voyageurs":
      return "the most aggressive"
    case "zion":
      return "high-conviction growth"
    case "arches":
      return "balanced growth"
    case "sequoia":
      return "balanced income"
    case "saguaro":
      return "the most conservative"
    default:
      return "in the middle"
  }
}

function CompassDial({ angle, palette }: { angle: number; palette: Palette }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ bottom: 70, right: 36, width: 200, height: 200 }}
    >
      {/* Outer dial */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: `1.5px solid ${tokens.ink}` }}
      />
      {/* Mid dial */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 24,
          border: `1.5px dashed ${tokens.ink}`,
          opacity: 0.4,
        }}
      />
      {/* Inner dial */}
      <div
        className="absolute rounded-full"
        style={{
          inset: 48,
          border: `1.5px dashed ${tokens.ink}`,
          opacity: 0.4,
        }}
      />

      {/* Tick marks for each portfolio at its angle */}
      {COMPASS_ORDER.map((id, i) => {
        const a = -120 + i * (240 / (COMPASS_ORDER.length - 1))
        return (
          <Tick key={id} angle={a} active={a === angle} />
        )
      })}

      {/* Animated needle */}
      <motion.div
        className="absolute"
        style={{
          top: "50%",
          left: "50%",
          width: 80,
          height: 3,
          background: tokens.deepTeal,
          transformOrigin: "left center",
          marginTop: -1.5,
        }}
        initial={{ rotate: -120 }}
        animate={{ rotate: angle }}
        transition={{ type: "spring", stiffness: 60, damping: 14, delay: 0.2 }}
      >
        <span
          className="absolute rounded-full"
          style={{
            right: -6,
            top: -4.5,
            width: 12,
            height: 12,
            background: palette.accent === tokens.cream ? tokens.coral : palette.accent,
          }}
        />
      </motion.div>

      {/* Center pivot */}
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{
          width: 14,
          height: 14,
          background: tokens.deepTeal,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}

function Tick({ angle, active }: { angle: number; active: boolean }) {
  // Draw a small line at the dial's edge at the given angle.
  return (
    <div
      className="pointer-events-none absolute top-1/2 left-1/2"
      style={{
        width: 2,
        height: 100,
        marginLeft: -1,
        marginTop: -50,
        transform: `rotate(${angle + 90}deg)`,
        transformOrigin: "center center",
      }}
    >
      <div
        className="absolute"
        style={{
          left: 0,
          top: 0,
          width: 2,
          height: active ? 14 : 8,
          background: active ? tokens.coral : tokens.ink,
          opacity: active ? 1 : 0.5,
        }}
      />
    </div>
  )
}
