"use client"

// Editorial park illustrations — hand-drawn-feeling SVG with layered washes,
// atmospheric perspective, and organic curves. Designed to read like a
// magazine illustration, not clip-art. Each scene uses kit-palette only.
//
// Common pattern: sky gradient (back) → distant landform (mid, desaturated) →
// foreground hero element (sharp, saturated) → optional atmospheric overlay.

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

/* -------------------------------------------------------------------------- */
/*                              VOYAGEURS                                     */
/*  Boundary Waters at twilight: aurora wash, lone pine,                      */
/*  glassy water with reflection, distant island silhouette.                  */
/* -------------------------------------------------------------------------- */
function VoyageursScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] overflow-hidden">
      <svg
        viewBox="0 0 800 480"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          {/* Aurora gradient — layered washes */}
          <linearGradient id="vo-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.deepTeal} stopOpacity="0" />
            <stop offset="35%" stopColor={tokens.accentTeal} stopOpacity="0.28" />
            <stop offset="70%" stopColor={tokens.mint} stopOpacity="0.1" />
            <stop offset="100%" stopColor={tokens.deepTeal} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vo-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.deepTeal} stopOpacity="0.35" />
            <stop offset="100%" stopColor={tokens.ink} stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="vo-glow" cx="0.65" cy="0.4" r="0.5">
            <stop offset="0%" stopColor={tokens.accentTeal} stopOpacity="0.4" />
            <stop offset="100%" stopColor={tokens.accentTeal} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sky glow + aurora bands (animated) */}
        <rect width={800} height={480} fill="url(#vo-glow)" />
        <motion.path
          d="M -50 90 C 150 40, 350 110, 550 70 C 700 40, 820 95, 850 70 L 850 150 C 700 130, 550 170, 350 145 C 150 120, -50 170, -50 170 Z"
          fill="url(#vo-sky)"
          animate={{ opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M -50 130 C 200 80, 400 160, 600 110 C 750 80, 820 130, 850 120 L 850 200 C 700 180, 550 220, 350 195 C 150 170, -50 220, -50 220 Z"
          fill={tokens.mint}
          opacity="0.08"
          animate={{ opacity: [0.04, 0.16, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Distant island silhouette (atmospheric haze) */}
        <path
          d="M 100 285 C 180 270, 220 278, 280 282 C 350 285, 410 280, 480 285 L 480 295 L 100 295 Z"
          fill={tokens.deepTeal}
          opacity="0.4"
        />
        {/* Two distant tiny pines on the island */}
        <g fill={tokens.deepTeal} opacity="0.55">
          <path d="M 230 282 Q 232 268 234 282 Z" />
          <path d="M 280 280 Q 283 263 286 280 Z" />
          <path d="M 340 282 Q 343 270 346 282 Z" />
          <path d="M 400 281 Q 403 266 406 281 Z" />
        </g>

        {/* Mid-ground tree line — softer, layered */}
        <path
          d="M -20 305 C 60 295, 120 300, 180 298 C 250 295, 320 300, 400 298 C 480 295, 560 302, 640 298 C 720 295, 820 305, 820 305 L 820 320 L -20 320 Z"
          fill={tokens.ink}
          opacity="0.55"
        />

        {/* HORIZON LINE — water meets shore */}
        <line x1={0} y1={320} x2={800} y2={320} stroke={tokens.accentTeal} strokeWidth={0.5} opacity="0.4" />

        {/* HERO PINE — single elegant tree, foreground left-of-center */}
        <g>
          {/* Trunk with subtle taper */}
          <path
            d="M 197 320 C 197 320, 200 310, 203 320 L 203 380 C 203 388, 197 388, 197 380 Z"
            fill={tokens.ink}
          />
          {/* Layered branches — narrow conical pine, asymmetric */}
          <path
            d="M 200 250
               C 192 260, 184 268, 180 282
               L 188 282
               C 180 290, 172 296, 166 308
               L 195 308
               L 195 320
               L 205 320
               L 205 308
               L 234 308
               C 228 296, 220 290, 212 282
               L 220 282
               C 216 268, 208 260, 200 250 Z"
            fill={tokens.ink}
          />
          {/* A few branch highlights catching ambient light */}
          <path
            d="M 200 254 C 197 264, 194 272, 192 280"
            stroke={tokens.deepTeal}
            strokeWidth={0.8}
            fill="none"
            opacity="0.6"
          />
        </g>

        {/* WATER — gradient with reflection of pine */}
        <rect x={0} y={320} width={800} height={160} fill="url(#vo-water)" />

        {/* Pine reflection (vertical mirror, faded, distorted) */}
        <g opacity="0.35">
          <path
            d="M 200 320
               C 192 310, 184 302, 180 288
               L 188 288
               C 180 280, 172 274, 166 262
               L 195 262
               L 195 320 Z"
            fill={tokens.ink}
            transform="translate(0 30) scale(1 -1) translate(0 -350)"
          />
        </g>
        {/* Reflection ripples */}
        <g stroke={tokens.accentTeal} strokeWidth={0.5} fill="none" opacity="0.45">
          <path d="M 165 350 Q 200 348, 240 350" />
          <path d="M 175 365 Q 200 363, 230 365" />
          <path d="M 180 380 Q 200 378, 225 380" />
        </g>

        {/* Subtle horizontal water highlights catching aurora */}
        <g stroke={tokens.mint} strokeWidth={0.4} fill="none" opacity="0.3">
          <path d="M 380 340 Q 450 338, 540 340" />
          <path d="M 480 360 Q 560 358, 640 360" />
          <path d="M 600 385 Q 680 383, 740 385" />
        </g>

        {/* Tiny canoe drifting — far from the hero pine for narrative scale */}
        <g transform="translate(530 360)">
          <path d="M 0 4 Q 22 -1, 44 4 Q 22 9, 0 4 Z" fill={tokens.cream} opacity="0.85" />
          <path d="M 22 4 L 22 -3" stroke={tokens.cream} strokeWidth={0.8} opacity="0.7" />
        </g>
      </svg>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                 ZION                                       */
/*  Vertical sandstone cliffs viewed from canyon floor —                      */
/*  organic curves, sun-warmed walls, vertical strata.                        */
/* -------------------------------------------------------------------------- */
function ZionScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] overflow-hidden">
      <svg
        viewBox="0 0 800 480"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="zi-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.cream} stopOpacity="0.15" />
            <stop offset="100%" stopColor={tokens.citrus} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="zi-cliff-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.plum} stopOpacity="0.55" />
            <stop offset="100%" stopColor={tokens.coral} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="zi-cliff-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.coral} stopOpacity="0.85" />
            <stop offset="60%" stopColor={tokens.coral} stopOpacity="0.95" />
            <stop offset="100%" stopColor={tokens.char} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="zi-cliff-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.char} stopOpacity="0.85" />
            <stop offset="100%" stopColor={tokens.ink} stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Warm sky wash */}
        <rect width={800} height={480} fill="url(#zi-sky)" />

        {/* DISTANT cliff face — soft, atmospheric */}
        <path
          d="M -20 200
             C 40 150, 80 120, 130 100
             C 170 85, 210 130, 260 105
             C 300 85, 340 145, 400 110
             C 460 80, 510 165, 580 130
             C 640 100, 700 175, 820 145
             L 820 480 L -20 480 Z"
          fill="url(#zi-cliff-far)"
        />

        {/* MID cliff — the iconic warm sandstone wall */}
        <path
          d="M -20 260
             C 30 220, 80 240, 130 200
             C 180 165, 230 245, 290 215
             C 350 190, 400 280, 470 240
             C 530 205, 590 295, 660 265
             C 720 235, 770 290, 820 270
             L 820 480 L -20 480 Z"
          fill="url(#zi-cliff-mid)"
        />

        {/* Vertical erosion lines on mid wall — adds texture */}
        <g stroke={tokens.char} strokeWidth={0.6} fill="none" opacity="0.18">
          <path d="M 80 240 L 78 470" />
          <path d="M 145 215 L 143 470" />
          <path d="M 220 265 L 220 470" />
          <path d="M 305 230 L 308 470" />
          <path d="M 390 290 L 388 470" />
          <path d="M 470 250 L 468 470" />
          <path d="M 550 305 L 552 470" />
          <path d="M 625 275 L 623 470" />
          <path d="M 705 290 L 703 470" />
        </g>

        {/* Horizontal stratification — geological time */}
        <g stroke={tokens.cream} strokeWidth={0.4} fill="none" opacity="0.25">
          <path d="M 0 320 C 200 318, 400 322, 800 320" />
          <path d="M 0 360 C 200 358, 400 362, 800 360" />
          <path d="M 0 400 C 200 398, 400 402, 800 400" />
        </g>

        {/* NEAR canyon edge — tight foreground anchor */}
        <path
          d="M -20 380
             C 30 355, 80 395, 140 370
             C 200 345, 250 410, 320 380
             C 390 350, 450 415, 520 385
             C 590 355, 660 410, 720 385
             C 760 372, 800 395, 820 388
             L 820 480 L -20 480 Z"
          fill="url(#zi-cliff-near)"
        />

        {/* A few scrub/juniper silhouettes near the rim */}
        <g fill={tokens.char} opacity="0.5">
          <ellipse cx={210} cy={380} rx={5} ry={3} />
          <ellipse cx={228} cy={382} rx={3} ry={2} />
          <ellipse cx={485} cy={388} rx={6} ry={3.5} />
          <ellipse cx={500} cy={390} rx={3} ry={2} />
          <ellipse cx={685} cy={395} rx={4} ry={2.5} />
        </g>

        {/* Subtle ambient sun-glow on top-right cliff */}
        <ellipse
          cx={620}
          cy={180}
          rx={180}
          ry={60}
          fill={tokens.citrus}
          opacity="0.12"
        />
      </svg>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                ARCHES                                      */
/*  Delicate Arch — slender, asymmetric, in golden-hour light.                */
/*  The actual proportions: tall, slightly leaning,                           */
/*  with a thicker right leg and an oval opening.                             */
/* -------------------------------------------------------------------------- */
function ArchesScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%] overflow-hidden">
      <svg
        viewBox="0 0 800 480"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <radialGradient id="ar-sun" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0%" stopColor={tokens.citrus} stopOpacity="0.2" />
            <stop offset="100%" stopColor={tokens.citrus} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ar-arch" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.coral} stopOpacity="0.95" />
            <stop offset="55%" stopColor={tokens.plum} stopOpacity="0.92" />
            <stop offset="100%" stopColor={tokens.char} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="ar-distant" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.mint} stopOpacity="0.45" />
            <stop offset="100%" stopColor={tokens.deepTeal} stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="ar-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.ink} stopOpacity="0.9" />
            <stop offset="100%" stopColor={tokens.char} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Sun-glow */}
        <rect width={800} height={480} fill="url(#ar-sun)" />

        {/* DISTANT La Sal Mountains — soft ridge */}
        <path
          d="M -20 280
             C 60 240, 140 270, 220 250
             C 300 230, 380 285, 460 255
             C 540 225, 620 290, 700 265
             C 760 250, 820 275, 820 275
             L 820 320 L -20 320 Z"
          fill="url(#ar-distant)"
        />
        {/* Ridge highlights — subtle */}
        <path
          d="M 220 250 L 235 240 L 250 250 M 460 255 L 475 245 L 490 255"
          stroke={tokens.cream}
          strokeWidth={0.5}
          fill="none"
          opacity="0.4"
        />

        {/* Stacked rock fins on the left horizon */}
        <g fill={tokens.coral} opacity="0.4">
          <path d="M 50 285 L 70 260 L 95 280 L 110 270 L 125 285 Z" />
          <path d="M 130 290 L 155 275 L 175 290 Z" />
        </g>

        {/* DELICATE ARCH — the hero, properly proportioned                  */}
        {/* Real-world references: 52 ft tall, slightly asymmetric.          */}
        {/* Thicker right leg, slim left leg, oval opening, slight inward    */}
        {/* lean, sandstone striations.                                      */}
        <g transform="translate(420 0)">
          {/*
            The arch as a single closed path: outer silhouette minus the
            inner opening. Drawn anti-clockwise outer + clockwise hole using
            even-odd fill rule for clean cutout.
          */}
          <path
            fillRule="evenodd"
            fill="url(#ar-arch)"
            d="
              M -50 380
              C -50 380, -55 280, -42 210
              C -32 165, -10 130, 22 122
              C 60 115, 90 145, 100 195
              C 108 240, 105 300, 105 380
              L 80 380
              C 80 380, 82 305, 75 250
              C 70 215, 55 195, 35 198
              C 18 200, 5 220, -5 250
              C -15 290, -18 340, -22 380
              Z
              M 8 220
              C -8 226, -14 250, -10 285
              C -7 318, 12 332, 32 322
              C 50 312, 58 285, 55 255
              C 52 230, 30 214, 8 220
              Z
            "
          />
          {/* Sandstone striations — horizontal layer lines on the arch */}
          <g stroke={tokens.cream} strokeWidth={0.3} fill="none" opacity="0.35">
            <path d="M -42 210 C -10 200, 50 200, 90 210" />
            <path d="M -45 250 C -10 240, 50 240, 95 250" />
            <path d="M -48 290 C -10 280, 50 280, 100 290" />
            <path d="M -50 330 C -10 322, 50 322, 105 330" />
          </g>
          {/* Right-side highlight catching sun */}
          <path
            d="M 95 200 C 102 215, 105 240, 105 270"
            stroke={tokens.citrus}
            strokeWidth={1.2}
            fill="none"
            opacity="0.5"
          />
        </g>

        {/* Slickrock floor — undulating sandstone bowl */}
        <path
          d="M -20 380
             C 60 372, 140 388, 220 382
             C 300 376, 380 392, 460 384
             C 540 378, 620 392, 700 386
             C 760 382, 820 390, 820 390
             L 820 480 L -20 480 Z"
          fill="url(#ar-floor)"
        />
        {/* Slickrock highlight ripples */}
        <g stroke={tokens.coral} strokeWidth={0.5} fill="none" opacity="0.25">
          <path d="M 0 410 C 200 405, 400 415, 800 408" />
          <path d="M 0 440 C 200 435, 400 445, 800 438" />
        </g>
      </svg>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                SEQUOIA                                     */
/*  Looking up at one massive trunk with smaller trunks behind in mist.       */
/*  Forest floor, dappled light, atmospheric depth.                           */
/* -------------------------------------------------------------------------- */
function SequoiaScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%] overflow-hidden">
      <svg
        viewBox="0 0 800 480"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="sq-mist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.cream} stopOpacity="0.25" />
            <stop offset="50%" stopColor={tokens.mint} stopOpacity="0.12" />
            <stop offset="100%" stopColor={tokens.deepTeal} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sq-trunk-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.deepTeal} stopOpacity="0.45" />
            <stop offset="100%" stopColor={tokens.deepTeal} stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="sq-trunk-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.coral} stopOpacity="0.7" />
            <stop offset="40%" stopColor={tokens.char} stopOpacity="0.95" />
            <stop offset="100%" stopColor={tokens.ink} stopOpacity="1" />
          </linearGradient>
          <linearGradient id="sq-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.deepTeal} stopOpacity="0.7" />
            <stop offset="100%" stopColor={tokens.ink} stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="sq-shaft" cx="0.7" cy="0.0" r="0.7">
            <stop offset="0%" stopColor={tokens.citrus} stopOpacity="0.18" />
            <stop offset="100%" stopColor={tokens.citrus} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Light shaft from upper right */}
        <rect width={800} height={480} fill="url(#sq-shaft)" />
        {/* Forest mist */}
        <rect width={800} height={480} fill="url(#sq-mist)" />

        {/* DISTANT trunks (out of focus) */}
        <g>
          <rect x={50} y={80} width={28} height={350} fill="url(#sq-trunk-far)" opacity="0.35" rx="4" />
          <rect x={170} y={120} width={20} height={310} fill="url(#sq-trunk-far)" opacity="0.4" rx="3" />
          <rect x={580} y={100} width={26} height={330} fill="url(#sq-trunk-far)" opacity="0.4" rx="4" />
          <rect x={690} y={140} width={18} height={290} fill="url(#sq-trunk-far)" opacity="0.45" rx="3" />
        </g>

        {/* MID trunks */}
        <g>
          <path
            d="M 240 60
               C 232 60, 230 80, 232 100
               L 234 380
               C 234 392, 248 392, 250 380
               L 252 100
               C 254 80, 252 60, 244 60 Z"
            fill={tokens.char}
            opacity="0.7"
          />
          <path
            d="M 510 80
               C 502 80, 500 95, 502 110
               L 504 385
               C 504 395, 516 395, 518 385
               L 520 110
               C 522 95, 520 80, 514 80 Z"
            fill={tokens.char}
            opacity="0.65"
          />
        </g>

        {/* HERO TRUNK — center, massive, foreground.
            Slight taper, organic edge, heavy bark texture. */}
        <path
          d="M 358 0
             C 348 0, 340 30, 342 60
             L 340 100
             C 338 130, 336 200, 340 280
             L 342 380
             C 342 470, 460 470, 462 380
             L 464 280
             C 468 200, 466 130, 464 100
             L 462 60
             C 464 30, 456 0, 446 0 Z"
          fill="url(#sq-trunk-near)"
        />

        {/* Bark texture — irregular vertical ridges with subtle warmth */}
        <g stroke={tokens.coral} strokeWidth={0.7} fill="none" opacity="0.22">
          <path d="M 358 50 C 359 100, 360 160, 360 240 C 360 290, 361 350, 362 420" />
          <path d="M 380 40 C 381 100, 382 160, 382 240 C 382 290, 382 350, 383 420" />
          <path d="M 400 30 C 401 100, 401 160, 402 240 C 402 290, 402 350, 402 420" />
          <path d="M 420 30 C 421 100, 421 160, 421 240 C 421 290, 421 350, 421 420" />
          <path d="M 440 40 C 441 100, 441 160, 441 240 C 441 290, 441 350, 442 420" />
          <path d="M 458 50 C 459 100, 459 160, 459 240 C 459 290, 459 350, 458 420" />
        </g>
        {/* Subtle bark notches */}
        <g fill={tokens.ink} opacity="0.4">
          <ellipse cx={368} cy={130} rx={2} ry={5} />
          <ellipse cx={395} cy={210} rx={2.5} ry={6} />
          <ellipse cx={428} cy={170} rx={2} ry={4} />
          <ellipse cx={415} cy={310} rx={3} ry={7} />
          <ellipse cx={452} cy={250} rx={2} ry={5} />
        </g>

        {/* Rim light on the right edge of hero trunk (sun side) */}
        <path
          d="M 462 30 C 466 130, 467 240, 462 380"
          stroke={tokens.citrus}
          strokeWidth={1.5}
          fill="none"
          opacity="0.4"
        />

        {/* Forest floor — dappled */}
        <path
          d="M -20 420
             C 100 410, 200 425, 320 418
             C 440 412, 520 425, 600 418
             C 680 412, 760 425, 820 420
             L 820 480 L -20 480 Z"
          fill="url(#sq-floor)"
        />
        {/* Pine needle scatter on the floor */}
        <g stroke={tokens.coral} strokeWidth={0.5} opacity="0.3">
          <path d="M 80 445 l 6 -2" />
          <path d="M 130 455 l 5 -3" />
          <path d="M 200 450 l 7 -2" />
          <path d="M 280 460 l 5 -3" />
          <path d="M 540 450 l 6 -3" />
          <path d="M 620 458 l 5 -2" />
          <path d="M 720 452 l 7 -3" />
        </g>
      </svg>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                SAGUARO                                     */
/*  Sonoran desert at golden hour — hero saguaro, distant mesas,              */
/*  warm gradient sky.                                                        */
/* -------------------------------------------------------------------------- */
function SaguaroScene(_: { palette: Palette }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] overflow-hidden">
      <svg
        viewBox="0 0 800 480"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="sa-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.coral} stopOpacity="0.15" />
            <stop offset="40%" stopColor={tokens.citrus} stopOpacity="0.18" />
            <stop offset="100%" stopColor={tokens.coral} stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="sa-sun" cx="0.78" cy="0.25" r="0.38">
            <stop offset="0%" stopColor={tokens.citrus} stopOpacity="0.6" />
            <stop offset="60%" stopColor={tokens.citrus} stopOpacity="0.18" />
            <stop offset="100%" stopColor={tokens.citrus} stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sa-mesa-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.plum} stopOpacity="0.5" />
            <stop offset="100%" stopColor={tokens.coral} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="sa-mesa-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.plum} stopOpacity="0.85" />
            <stop offset="100%" stopColor={tokens.char} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="sa-cactus" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.deepTeal} stopOpacity="0.95" />
            <stop offset="100%" stopColor={tokens.ink} stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Sky wash */}
        <rect width={800} height={480} fill="url(#sa-sky)" />
        {/* Sun glow */}
        <rect width={800} height={480} fill="url(#sa-sun)" />

        {/* DISTANT mesa range — soft, warm */}
        <path
          d="M -20 285
             C 80 270, 180 275, 280 268
             L 285 245 L 360 245 L 365 268
             C 460 272, 560 268, 660 273
             L 665 252 L 720 252 L 725 273
             C 760 274, 800 278, 820 278
             L 820 320 L -20 320 Z"
          fill="url(#sa-mesa-far)"
        />

        {/* MID buttes */}
        <path
          d="M -20 340
             L 140 340 L 145 315 L 240 315 L 245 340
             L 480 340 L 485 320 L 580 320 L 585 340
             L 820 340 L 820 380 L -20 380 Z"
          fill="url(#sa-mesa-near)"
        />

        {/* Stratification on mid butte */}
        <g stroke={tokens.cream} strokeWidth={0.3} fill="none" opacity="0.25">
          <path d="M 140 360 L 250 360" />
          <path d="M 480 360 L 590 360" />
        </g>

        {/* Desert floor (foreground) */}
        <path
          d="M -20 380
             C 80 376, 180 384, 280 379
             C 380 374, 480 384, 580 380
             C 680 376, 780 386, 820 382
             L 820 480 L -20 480 Z"
          fill={tokens.ink}
          opacity="0.95"
        />
        {/* Soft horizon haze line */}
        <line x1={0} y1={380} x2={800} y2={380} stroke={tokens.coral} strokeWidth={0.5} opacity="0.45" />

        {/* HERO SAGUARO — proper proportions: tall trunk with two raised arms,
            smooth curves, accordion ribs running vertically */}
        <g transform="translate(360 0)">
          <path
            fill="url(#sa-cactus)"
            d="
              M -22 380
              C -22 380, -22 250, -22 180
              C -22 140, -16 110, -10 105
              C 4 95, 18 105, 22 140
              C 25 165, 22 215, 22 250
              L 22 220
              C 22 200, 30 188, 42 188
              C 56 188, 62 200, 62 220
              L 62 260
              L 22 260
              L 22 250
              L 22 380
              Z
            "
          />
          {/* Right arm joins the trunk (wraparound continuation) */}
          <path
            fill="url(#sa-cactus)"
            d="
              M -22 195
              C -32 192, -42 200, -44 218
              L -44 256
              L -22 256
              L -22 218
              Z
            "
          />
          {/* Vertical accordion ribs — saguaro signature */}
          <g stroke={tokens.coral} strokeWidth={0.6} fill="none" opacity="0.22">
            <path d="M -16 130 L -16 375" />
            <path d="M -8 115 L -8 375" />
            <path d="M 0 110 L 0 375" />
            <path d="M 8 115 L 8 375" />
            <path d="M 16 130 L 16 375" />
            <path d="M 32 195 L 32 256" />
            <path d="M 42 192 L 42 256" />
            <path d="M 52 195 L 52 256" />
            <path d="M -32 200 L -32 256" />
          </g>
          {/* Sun-side rim highlight */}
          <path
            d="M 22 145 C 25 165, 24 215, 22 250"
            stroke={tokens.citrus}
            strokeWidth={1}
            fill="none"
            opacity="0.55"
          />
          {/* Saguaro spines — small white tick marks */}
          <g stroke={tokens.cream} strokeWidth={0.4} opacity="0.35">
            <path d="M -16 165 l 0 -3" />
            <path d="M -16 200 l 0 -3" />
            <path d="M -16 240 l 0 -3" />
            <path d="M 16 165 l 0 -3" />
            <path d="M 16 220 l 0 -3" />
            <path d="M 0 290 l 0 -3" />
          </g>
        </g>

        {/* Smaller companion saguaro — left side, in shadow */}
        <g transform="translate(140 0)" opacity="0.85">
          <path
            fill={tokens.ink}
            d="
              M -10 380
              C -10 380, -10 280, -10 230
              C -10 210, -6 195, 0 195
              C 8 195, 11 210, 11 230
              L 11 380
              Z
            "
          />
        </g>

        {/* Small barrel cactus & rocks scattered */}
        <g fill={tokens.ink} opacity="0.85">
          <ellipse cx={520} cy={398} rx={14} ry={9} />
          <ellipse cx={540} cy={401} rx={5} ry={3} />
          <ellipse cx={685} cy={402} rx={9} ry={5} />
          <ellipse cx={75} cy={400} rx={8} ry={4} />
        </g>

        {/* Tiny bird silhouette — atmospheric scale cue */}
        <path
          d="M 605 130 q 4 -3 8 0 q 4 -3 8 0"
          stroke={tokens.char}
          strokeWidth={0.8}
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  )
}
