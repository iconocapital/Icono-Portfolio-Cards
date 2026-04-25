"use client"

// Icono Design Kit · Motifs — animate the noun.
// Each motif sits in its own contained stage. Stages live in the top-right
// or right edge so they never overlap the headline (top-left) or YTD footer
// (bottom-left). Pointer-events off so motifs never intercept clicks.
//
//   pulse  → live engine        (Voyageurs / Pure Growth)
//   burn   → ascending line     (Zion     / Aggressive Growth)
//   garden → growing bars       (Arches   / Growth)
//   rain   → falling coins      (Sequoia  / Stability & Income)
//   shield → preservation       (Saguaro  / Capital Preservation)

import { motion } from "framer-motion"
import { tokens, styles, type Palette, type MotifType } from "../lib/design-kit"

export function CardMotif({
  motif,
  palette,
  flagship,
  bondPct,
}: {
  motif: MotifType
  palette: Palette
  flagship?: boolean
  bondPct?: number
}) {
  switch (motif) {
    case "pulse":
      return <PulseMotif palette={palette} flagship={flagship} />
    case "burn":
      return <BurnMotif palette={palette} />
    case "garden":
      return <GardenMotif palette={palette} />
    case "rain":
      return <RainMotif palette={palette} />
    case "shield":
      return <ShieldMotif palette={palette} bondPct={bondPct} />
    default:
      return null
  }
}

export function HeroMotifStage({
  motif,
  palette,
  bondPct,
}: {
  motif: MotifType
  palette: Palette
  bondPct?: number
}) {
  // Larger rendition for the detail hero — centered in the right column.
  return (
    <div className="absolute inset-0 overflow-hidden">
      {motif === "pulse" && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                border: `2px solid ${palette.accent}`,
                width: 600,
                height: 600,
                marginLeft: -300,
                marginTop: -300,
              }}
              animate={{ scale: [0.2, 1.2], opacity: [1, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 1,
              }}
            />
          ))}
          <motion.div
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: 200,
              height: 200,
              marginLeft: -100,
              marginTop: -100,
              background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      {motif === "burn" && (
        <div className="absolute inset-x-12 top-1/4 bottom-1/4">
          <BurnInline palette={palette} />
        </div>
      )}
      {motif === "garden" && (
        <div className="absolute inset-x-16 top-16 bottom-16">
          <GardenInline palette={palette} />
        </div>
      )}
      {motif === "rain" && <RainInline palette={palette} />}
      {motif === "shield" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative" style={{ width: 280, height: 320 }}>
            <ShieldInline palette={palette} bondPct={bondPct} large />
          </div>
        </div>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                              CARD MOTIFS                                   */
/* -------------------------------------------------------------------------- */

function PulseMotif({ palette, flagship }: { palette: Palette; flagship?: boolean }) {
  const size = flagship ? 360 : 260
  return (
    <div
      className="pointer-events-none absolute"
      style={{ top: -size * 0.25, right: -size * 0.25, width: size, height: size }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${palette.accent}` }}
          animate={{ scale: [0.3, 1], opacity: [1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
            delay: i,
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 0.25,
          height: size * 0.25,
          background: `radial-gradient(circle, ${palette.accent} 0%, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

function BurnMotif({ palette }: { palette: Palette }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ right: 0, top: 24, width: "60%", height: 200 }}
    >
      <BurnInline palette={palette} />
    </div>
  )
}

function BurnInline({ palette }: { palette: Palette }) {
  return (
    <>
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <motion.path
          d="M 0 160 L 50 130 L 100 145 L 150 100 L 200 115 L 250 70 L 300 85 L 350 35 L 400 50 L 400 200 L 0 200 Z"
          fill="rgba(10,10,10,0.08)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.6, 1] }}
        />
        <motion.path
          d="M 0 160 L 50 130 L 100 145 L 150 100 L 200 115 L 250 70 L 300 85 L 350 35 L 400 50"
          fill="none"
          stroke={palette.accent}
          strokeWidth={3}
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 1] }}
        />
      </svg>
      <motion.div
        className="absolute rounded-full"
        style={{ width: 14, height: 14, background: palette.accent, top: 22, right: 8 }}
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            "0 0 0 0 rgba(10,10,10,0.4)",
            "0 0 0 12px rgba(10,10,10,0)",
            "0 0 0 0 rgba(10,10,10,0)",
          ],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  )
}

function GardenMotif({ palette }: { palette: Palette }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ right: 24, top: 32, bottom: 110, width: 200 }}
    >
      <GardenInline palette={palette} />
    </div>
  )
}

function GardenInline({ palette }: { palette: Palette }) {
  const colors = [palette.accent, tokens.mint, palette.accent, tokens.mint, palette.accent]
  return (
    <svg viewBox="0 0 200 280" preserveAspectRatio="none" className="h-full w-full">
      {colors.map((c, i) => (
        <motion.rect
          key={i}
          x={i * 38 + 6}
          y={20}
          width={28}
          height={260}
          rx={4}
          fill={c}
          style={{ transformOrigin: "center bottom" }}
          animate={{ scaleY: [0.35, 1, 0.35] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
            delay: i * 0.15,
          }}
        />
      ))}
    </svg>
  )
}

function RainMotif({ palette }: { palette: Palette }) {
  return (
    <div
      className="pointer-events-none absolute overflow-hidden"
      style={{ right: 0, top: 0, bottom: 0, width: "50%" }}
    >
      <RainCoins palette={palette} />
    </div>
  )
}

function RainInline({ palette }: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 inset-y-0 overflow-hidden">
      <RainCoins palette={palette} />
    </div>
  )
}

function RainCoins({ palette }: { palette: Palette }) {
  const coins = [
    { leftPct: 8, duration: 3.2, delay: 0 },
    { leftPct: 28, duration: 4.1, delay: 0.5 },
    { leftPct: 48, duration: 3.6, delay: 1.2 },
    { leftPct: 68, duration: 4.4, delay: 0.3 },
    { leftPct: 88, duration: 3.8, delay: 1.8 },
  ]
  return (
    <>
      {coins.map((c, i) => (
        <motion.div
          key={i}
          className="absolute flex items-center justify-center rounded-full"
          style={{
            left: `${c.leftPct}%`,
            width: 26,
            height: 26,
            background: palette.accent,
            color: palette.bg,
            ...styles.display,
            fontWeight: 700,
            fontSize: 15,
            top: -40,
          }}
          animate={{ y: [0, 520], opacity: [0, 1, 1, 0], rotate: [0, 360] }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: "linear",
            delay: c.delay,
            times: [0, 0.1, 0.9, 1],
          }}
        >
          $
        </motion.div>
      ))}
    </>
  )
}

function ShieldMotif({ palette, bondPct }: { palette: Palette; bondPct?: number }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ top: 32, right: 36, width: 160, height: 184 }}
    >
      <ShieldInline palette={palette} bondPct={bondPct} />
    </div>
  )
}

function ShieldInline({
  palette,
  bondPct,
  large,
}: {
  palette: Palette
  bondPct?: number
  large?: boolean
}) {
  const fontSize = large ? 72 : 36
  const labelSize = large ? 14 : 9
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${palette.accent} 0%, transparent 100%)`,
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 65%, 50% 100%, 0% 65%, 0% 25%)",
        }}
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute inset-0"
        style={{
          border: `2.5px solid ${palette.fg}`,
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 65%, 50% 100%, 0% 65%, 0% 25%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ color: palette.fg }}
      >
        <div
          style={{
            ...styles.display,
            fontWeight: 700,
            fontSize,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {bondPct ? Math.round(bondPct) : 65}%
        </div>
        <div
          className="mt-1 font-bold uppercase"
          style={{
            ...styles.mono,
            opacity: 0.85,
            letterSpacing: "0.16em",
            fontSize: labelSize,
          }}
        >
          bonds
        </div>
      </div>
    </>
  )
}
