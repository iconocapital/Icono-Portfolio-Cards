import { useState, useMemo, useEffect } from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import {
  ArrowLeft,
  ArrowUpDown,
  ArrowUpRight,
  Lock,
  Plus,
  Sparkles,
} from "lucide-react"

/* ========================================================================== */
/*                        ICONO DESIGN KIT v2 — TOKENS                        */
/* ========================================================================== */

// Brand-anchored when it should be. Loud when the product earns it.
const tokens = {
  deepTeal: "#1C5355",
  accentTeal: "#4EB8BC",
  cream: "#F5EFE4",
  creamWarm: "#EDE3D2",
  ink: "#0A1F20",
  inkSoft: "#2A3F40",
  citrus: "#FFB627",
  plum: "#6B2D5C",
  coral: "#FF6B5B",
  mint: "#B8E5D0",
  sky: "#A8D5E5",
  char: "#1A1A1A",
}

const fonts = {
  serif:
    "'Hedvig Letters Serif', Georgia, 'Times New Roman', serif",
  display:
    "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  sans: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace",
}

const styles = {
  display: { fontFamily: fonts.display, letterSpacing: "-0.04em" },
  serif: { fontFamily: fonts.serif },
  mono: { fontFamily: fonts.mono, letterSpacing: "0.16em" },
  body: { fontFamily: fonts.sans },
}

/* ========================================================================== */
/*                                   DATA                                     */
/* ========================================================================== */

// Latest holdings snapshots per sleeve.

// Rotational — most recent rebalance: 10/08/2025
const rotationalHoldings = [
  { date: "10/08/2025", symbol: "DTCR", weight: 12.5 },
  { date: "10/08/2025", symbol: "EUAD", weight: 12.5 },
  { date: "10/08/2025", symbol: "EUFN", weight: 7.5 },
  { date: "10/08/2025", symbol: "NLR", weight: 12.5 },
  { date: "10/08/2025", symbol: "PAVE", weight: 10.0 },
  { date: "10/08/2025", symbol: "SHLD", weight: 12.5 },
  { date: "10/08/2025", symbol: "USCI", weight: 7.5 },
  { date: "10/08/2025", symbol: "UTES", weight: 12.5 },
  { date: "10/08/2025", symbol: "XME", weight: 12.5 },
]

// Core Equity — most recent rebalance: 08/11/2025
const equityHoldings = [
  { date: "08/11/2025", symbol: "SPY", weight: 35.0 },
  { date: "08/11/2025", symbol: "QQQ", weight: 17.5 },
  { date: "08/11/2025", symbol: "VEA", weight: 10.0 },
  { date: "08/11/2025", symbol: "IEMG", weight: 7.5 },
  { date: "08/11/2025", symbol: "PIZ", weight: 7.5 },
  { date: "08/11/2025", symbol: "VB", weight: 7.5 },
  { date: "08/11/2025", symbol: "COWZ", weight: 5.0 },
  { date: "08/11/2025", symbol: "SPGP", weight: 5.0 },
  { date: "08/11/2025", symbol: "VTV", weight: 5.0 },
]

// Crypto — current target weights
const cryptoHoldings = [
  { date: "Current", symbol: "BITC", weight: 35.0 },
  { date: "Current", symbol: "AETH", weight: 20.0 },
  { date: "Current", symbol: "BITB", weight: 20.0 },
  { date: "Current", symbol: "BITQ", weight: 15.0 },
  { date: "Current", symbol: "MSTR", weight: 10.0 },
]

// Fixed Income — most recent rebalance: 10/27/2025
const fixedIncomeHoldings = [
  { date: "10/27/2025", symbol: "BND", weight: 35.0 },
  { date: "10/27/2025", symbol: "BALT", weight: 15.0 },
  { date: "10/27/2025", symbol: "BNDX", weight: 15.0 },
  { date: "10/27/2025", symbol: "EMHY", weight: 12.5 },
  { date: "10/27/2025", symbol: "SFLR", weight: 12.5 },
  { date: "10/27/2025", symbol: "CAOS", weight: 10.0 },
]

const tickerNames = {
  // Rotational
  DTCR: "Global X Data Center & Digital Infra",
  EUAD: "Select STOXX Europe Aerospace & Defense",
  EUFN: "iShares MSCI Europe Financials",
  NLR: "VanEck Uranium & Nuclear",
  PAVE: "Global X U.S. Infrastructure Development",
  SHLD: "Global X Defense Tech",
  USCI: "United States Commodity Index",
  UTES: "Virtus Reaves Utilities",
  XME: "SPDR S&P Metals & Mining",
  // Core Equity
  SPY: "SPDR S&P 500 ETF Trust",
  QQQ: "Invesco QQQ Trust (Nasdaq 100)",
  VEA: "Vanguard FTSE Developed Markets",
  IEMG: "iShares Core MSCI Emerging Markets",
  PIZ: "Invesco DWA Developed Markets Momentum",
  VB: "Vanguard Small-Cap ETF",
  COWZ: "Pacer US Cash Cows 100",
  SPGP: "Invesco S&P 500 GARP",
  VTV: "Vanguard Value ETF",
  // Crypto
  BITC: "Bitwise Crypto Industry Innovators",
  AETH: "Bitwise Ethereum Strategy",
  BITB: "Bitwise Bitcoin ETF",
  BITQ: "Bitwise Crypto Industry Leaders",
  MSTR: "MicroStrategy / Strategy Inc.",
  // Fixed Income
  BND: "Vanguard Total Bond Market",
  BALT: "Innovator Defined Wealth Shield",
  BNDX: "Vanguard Total International Bond",
  EMHY: "iShares J.P. Morgan EM High Yield Bond",
  SFLR: "Innovator Equity Managed Floor",
  CAOS: "Alpha Architect Tail Risk",
}

const sleeveMeta = {
  equity: {
    id: "equity",
    name: "Equity",
    ytdPerformance: 31.02,
    description:
      "Core, broad-market exposure. The engine — disciplined, diversified, designed for the long arc.",
    holdings: equityHoldings,
  },
  rotational: {
    id: "rotational",
    name: "Rotational",
    ytdPerformance: 12.51,
    description:
      "Dynamic, conviction-weighted sector tilts. Adapts to regime changes and pursues asymmetric upside.",
    holdings: rotationalHoldings,
  },
  fixedIncome: {
    id: "fixedIncome",
    name: "Fixed Income",
    ytdPerformance: 3.18,
    description:
      "High-quality bond exposure for ballast and income. The shock absorber when equity markets churn.",
    holdings: fixedIncomeHoldings,
  },
  crypto: {
    id: "crypto",
    name: "Crypto",
    ytdPerformance: 5.54,
    description:
      "Strategic digital-asset allocation. A small, deliberate bet on the next financial substrate.",
    holdings: cryptoHoldings,
  },
  cryptoLite: {
    id: "cryptoLite",
    name: "Crypto Lite",
    ytdPerformance: 5.54,
    description:
      "A measured, lower-conviction digital-asset allocation. Same holdings as Crypto, calibrated smaller for portfolios where preservation leads.",
    holdings: cryptoHoldings,
  },
}

const sleeve = (key, allocation) => ({ ...sleeveMeta[key], allocation })

// Each portfolio gets a motif type — the animation IS the product.
// bg/fg pairs come from the kit palette, used per principle: brand-anchored
// 80% of the time, deviation only when the product earns it.
const portfolios = [
  {
    id: "voyageurs",
    name: "Voyageurs",
    tagline: "Pure Growth",
    subtitle: "Target Allocation — 100% Stock",
    description:
      "Maximum growth potential with full market exposure. Designed for those with the longest time horizons and highest tolerance for market movement, seeking the greatest possible returns.",
    ytd: 8.39,
    benchmarkYtd: 5.05,
    benchmarkLabel: "S&P 500 TR",
    status: "active",
    motif: "pulse",
    palette: { bg: tokens.deepTeal, fg: tokens.cream, accent: tokens.accentTeal },
    sleeves: [sleeve("equity", 75), sleeve("rotational", 15), sleeve("crypto", 10)],
  },
  {
    id: "zion",
    name: "Zion",
    tagline: "Aggressive Growth",
    subtitle: "Target Allocation — 85% Stock, 15% Bonds",
    description:
      "Maximizes growth potential with minimal defensive positioning. Built for those with a long-term horizon who can handle market volatility in pursuit of higher returns.",
    ytd: 7.62,
    benchmarkYtd: 4.71,
    benchmarkLabel: "85/15 Blend",
    status: "active",
    motif: "burn",
    palette: { bg: tokens.coral, fg: tokens.char, accent: tokens.char },
    sleeves: [
      sleeve("equity", 63.75),
      sleeve("rotational", 13.75),
      sleeve("fixedIncome", 15.0),
      sleeve("crypto", 7.5),
    ],
  },
  {
    id: "arches",
    name: "Arches",
    tagline: "Growth",
    subtitle: "Target Allocation — 70% Stock, 30% Bonds",
    description:
      "Focused on substantial growth while maintaining some protective elements. Designed for those comfortable with more market exposure in pursuit of stronger returns.",
    ytd: 6.41,
    benchmarkYtd: 4.18,
    benchmarkLabel: "70/30 Blend",
    status: "active",
    motif: "garden",
    palette: { bg: tokens.plum, fg: tokens.cream, accent: tokens.mint },
    sleeves: [
      sleeve("equity", 56.0),
      sleeve("rotational", 9.5),
      sleeve("fixedIncome", 30.0),
      sleeve("crypto", 4.5),
    ],
  },
  {
    id: "sequoia",
    name: "Sequoia",
    tagline: "Stability & Income",
    subtitle: "Target Allocation — 50% Stock, 50% Bonds",
    description:
      "A balanced portfolio designed for reliable income with moderate growth potential. Ideal for those seeking a sustainable blend of current income and long-term appreciation.",
    ytd: 5.04,
    benchmarkYtd: 3.62,
    benchmarkLabel: "50/50 Blend",
    status: "active",
    motif: "rain",
    palette: { bg: tokens.citrus, fg: tokens.char, accent: tokens.char },
    sleeves: [
      sleeve("equity", 42.5),
      sleeve("rotational", 5.0),
      sleeve("fixedIncome", 50.0),
      sleeve("cryptoLite", 2.5),
    ],
  },
  {
    id: "saguaro",
    name: "Saguaro",
    tagline: "Capital Preservation",
    subtitle: "Target Allocation — 35% Stock, 65% Bonds",
    description:
      "Designed for those who prioritize protecting what they've built, focusing on stability while maintaining enough growth to stay ahead of inflation.",
    ytd: 3.91,
    benchmarkYtd: 3.04,
    benchmarkLabel: "35/65 Blend",
    status: "active",
    motif: "shield",
    palette: { bg: tokens.char, fg: tokens.cream, accent: tokens.accentTeal },
    sleeves: [
      sleeve("equity", 25.75),
      sleeve("rotational", 3.2),
      sleeve("fixedIncome", 70.0),
      sleeve("cryptoLite", 1.05),
    ],
  },
]

/* ========================================================================== */
/*                              FONT LOADER                                   */
/* ========================================================================== */

function useDesignKitFonts() {
  useEffect(() => {
    const id = "icono-kit-fonts"
    if (document.getElementById(id)) return
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif:opsz@12..24&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700;800&display=swap"
    document.head.appendChild(link)
  }, [])
}

/* ========================================================================== */
/*                                  ROOT                                      */
/* ========================================================================== */

export default function IconoclasticPortfolioGallery() {
  useDesignKitFonts()
  const [activeId, setActiveId] = useState(null)
  const active = portfolios.find((p) => p.id === activeId)

  return (
    <MotionConfig reducedMotion="user">
    <div
      className="min-h-screen"
      style={{
        background: tokens.cream,
        color: tokens.ink,
        fontFamily: fonts.sans,
      }}
    >
      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GalleryView onSelect={setActiveId} />
          </motion.div>
        ) : (
          <motion.div
            key={`detail-${active.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4 }}
          >
            <DetailView portfolio={active} onBack={() => setActiveId(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer
        className="mt-24 py-10"
        style={{ borderTop: `2px solid ${tokens.ink}` }}
      >
        <div
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 text-xs md:flex-row md:items-center md:px-8"
          style={{ color: tokens.inkSoft }}
        >
          <p style={{ ...styles.mono, fontSize: 11, fontWeight: 700 }}>
            © {new Date().getFullYear()} ICONOCLASTIC CAPITAL · NATIONAL PARKS SERIES
          </p>
          <p className="max-w-md text-[13px]">
            Past performance is not indicative of future results. This page is
            for illustrative purposes and is not investment advice.
          </p>
        </div>
      </footer>
    </div>
    </MotionConfig>
  )
}

/* ========================================================================== */
/*                                GALLERY                                     */
/* ========================================================================== */

function GalleryView({ onSelect }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <section
        className="pt-16 pb-12 md:pt-24"
        style={{ borderBottom: `2px solid ${tokens.ink}` }}
      >
        <p
          className="text-[11px] font-bold uppercase"
          style={{ ...styles.mono, color: tokens.accentTeal }}
        >
          Icono · The National Parks Series · v1
        </p>
        <h1
          className="mt-4 leading-[0.92]"
          style={{
            ...styles.display,
            fontWeight: 700,
            color: tokens.deepTeal,
            fontSize: "clamp(48px, 8vw, 96px)",
          }}
        >
          Five portfolios.
          <br />
          <span style={{ color: tokens.coral }}>One philosophy.</span>
        </h1>
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: tokens.inkSoft }}
        >
          Brand-anchored when it should be. Loud when the product earns it. Each
          portfolio is named for the place that embodies its purpose, animated
          around what it actually does.
        </p>
      </section>

      <section id="series" className="pt-10 pb-24">
        <div className="grid grid-cols-12 gap-5 md:gap-6">
          {portfolios.map((p, i) => (
            <PortfolioCard
              key={p.id}
              portfolio={p}
              index={i}
              onSelect={onSelect}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function PortfolioCard({ portfolio, index, onSelect }) {
  const isActive = portfolio.status === "active"
  const isFlagship = portfolio.id === "voyageurs"
  const isFinale = portfolio.id === "saguaro"
  // Grid rhythm: 7+5, 7+5, 12 (finale).
  const span = {
    voyageurs: "col-span-12 md:col-span-7",
    zion: "col-span-12 md:col-span-5",
    arches: "col-span-12 md:col-span-7",
    sequoia: "col-span-12 md:col-span-5",
    saguaro: "col-span-12",
  }[portfolio.id]

  const minH = isFinale
    ? "min-h-[480px] md:min-h-[580px]"
    : isFlagship
    ? "min-h-[440px] md:min-h-[460px]"
    : "min-h-[380px]"

  // Bond allocation label for shield motif (Saguaro, etc.)
  const bondPct = portfolio.sleeves
    .filter((s) => s.id === "fixedIncome")
    .reduce((acc, s) => acc + s.allocation, 0)

  return (
    <motion.button
      type="button"
      onClick={() => isActive && onSelect(portfolio.id)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className={[
        "group relative isolate overflow-hidden rounded-[24px] text-left transition-shadow duration-500",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf7]",
        span,
        minH,
        isActive ? "cursor-pointer" : "cursor-not-allowed opacity-90",
      ].join(" ")}
      style={{
        background: portfolio.palette.bg,
        color: portfolio.palette.fg,
        boxShadow:
          "0 1px 2px rgba(28,83,85,0.04), 0 8px 32px rgba(28,83,85,0.06)",
        "--tw-ring-color": tokens.coral,
      }}
    >
      {/* PARK SCENE — base identity layer. Hand-drawn silhouette of the park
          using kit colors only. Sits behind motif and text. */}
      <ParkScene parkId={portfolio.id} palette={portfolio.palette} />

      {/* MOTIF — sits on top of park scene, in its own contained stage. */}
      <CardMotif
        motif={portfolio.motif}
        palette={portfolio.palette}
        flagship={isFlagship}
        bondPct={bondPct}
      />

      {/* CONTENT — flex column. Header up top, YTD pinned to bottom.
          z-10 keeps text above motif. The motif zones sit in non-text areas. */}
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col p-9">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p
              className="text-[10px] font-bold"
              style={{
                ...styles.mono,
                color: portfolio.palette.fg,
                opacity: 0.7,
              }}
            >
              {portfolio.tagline} · 0{index + 1}
            </p>
            <h3
              className={[
                "mt-3 leading-[0.92]",
                isFinale
                  ? "text-[80px] md:text-[120px]"
                  : isFlagship
                  ? "text-[64px] md:text-[80px]"
                  : "text-[40px] md:text-[52px]",
              ].join(" ")}
              style={{
                ...styles.display,
                fontWeight: 700,
                color: portfolio.palette.fg,
              }}
            >
              {portfolio.name}
            </h3>
            <p
              className={[
                "mt-3 leading-snug",
                isFinale
                  ? "max-w-[460px] text-[16px] md:text-[18px]"
                  : "max-w-[300px] text-[14px]",
              ].join(" ")}
              style={{ opacity: 0.78 }}
            >
              {portfolio.subtitle.replace("Target Allocation — ", "")}
            </p>
            {isFinale && (
              <p
                className="mt-4 max-w-[460px] text-[14px] italic leading-relaxed"
                style={{
                  ...styles.serif,
                  opacity: 0.85,
                  color: portfolio.palette.fg,
                }}
              >
                And for those who&apos;d rather the journey arrive on time.
              </p>
            )}
          </div>

          {isFlagship && (
            <span
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase"
              style={{
                ...styles.mono,
                background: tokens.accentTeal,
                color: tokens.ink,
                letterSpacing: "0.16em",
              }}
            >
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
              Flagship
            </span>
          )}
          {!isActive && (
            <span
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase backdrop-blur-md"
              style={{
                ...styles.mono,
                background: "rgba(255,255,255,0.1)",
                color: portfolio.palette.fg,
                letterSpacing: "0.16em",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <Lock className="h-3 w-3" />
              Soon
            </span>
          )}
        </div>

        {/* SPACER — lets the motif breathe */}
        <div className="flex-1" />

        {/* FOOTER — YTD + arrow. Anchored at bottom of flex column.
            Sits inside a frosted backplate so motifs don't ghost behind it. */}
        <div className="flex items-end justify-between gap-4">
          <div
            className="rounded-[16px] px-4 py-3"
            style={{
              background: `${portfolio.palette.bg}cc`,
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              className="text-[10px] font-bold"
              style={{ ...styles.mono, opacity: 0.65 }}
            >
              YTD · VS {portfolio.benchmarkLabel.toUpperCase()}
            </p>
            <div className="mt-1 flex items-baseline gap-3">
              <span
                className={isFlagship ? "text-[56px]" : "text-[40px]"}
                style={{
                  ...styles.display,
                  fontWeight: 700,
                  color: portfolio.palette.accent,
                  lineHeight: 0.9,
                }}
              >
                +{portfolio.ytd.toFixed(2)}%
              </span>
              <span className="text-[13px]" style={{ opacity: 0.55 }}>
                vs +{portfolio.benchmarkYtd.toFixed(2)}%
              </span>
            </div>
          </div>

          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110"
            style={{
              background: portfolio.palette.fg,
              color: portfolio.palette.bg,
            }}
          >
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </motion.button>
  )
}

/* ========================================================================== */
/*                          PARK SCENES — identity                            */
/* ========================================================================== */
//
// Each scene is a hand-drawn SVG silhouette of the actual national park,
// occupying the bottom 60-70% of the card. Fills use the portfolio's own
// palette + kit accents so each scene reads as part of the kit. The motif
// (pulse, burn, garden, rain, shield) sits ON TOP in the upper area —
// motion = the product purpose, scene = the park identity.

function ParkScene({ parkId, palette }) {
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
function VoyageursScene({ palette }) {
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

function ZionScene({ palette }) {
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

function ArchesScene({ palette }) {
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

function SequoiaScene({ palette }) {
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

function SaguaroScene({ palette }) {
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
 {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] overflow-hidden">
      <svg viewBox="0 0 800 360" preserveAspectRatio="xMidYMax slice" className="h-full w-full">
        {/* Sun gradient */}
        <defs>
          <radialGradient id="saguaro-sun" cx="0.7" cy="0.3" r="0.6">
            <stop offset="0%" stopColor={tokens.citrus} stopOpacity={0.4} />
            <stop offset="100%" stopColor={tokens.citrus} stopOpacity={0} />
          </radialGradient>
        </defs>
        <rect x={0} y={0} width={800} height={360} fill="url(#saguaro-sun)" />
        {/* Distant mesa */}
        <path
          d="M 0 220 L 100 220 L 130 195 L 280 195 L 310 220 L 800 220 L 800 360 L 0 360 Z"
          fill={tokens.coral}
          opacity={0.4}
        />
        {/* Mid mesa */}
        <path
          d="M 0 260 L 200 260 L 240 240 L 420 240 L 460 260 L 800 260 L 800 360 L 0 360 Z"
          fill={tokens.plum}
          opacity={0.5}
        />
        {/* Desert floor */}
        <rect x={0} y={310} width={800} height={50} fill={tokens.ink} opacity={0.85} />
        {/* Saguaro cacti — hand-drawn classic shape */}
        <g fill={tokens.accentTeal}>
          {/* Hero saguaro center */}
          <path d="
            M 380 310
            L 380 200
            Q 380 175 395 170
            Q 415 170 415 200
            L 415 220
            Q 415 200 432 200
            Q 448 200 448 215
            L 448 245
            L 432 245
            L 432 235
            L 415 235
            L 415 310
            Z
          " />
          <path d="
            M 348 310
            L 348 240
            Q 348 222 358 218
            Q 372 218 372 240
            L 372 310
            Z
          " />
          {/* Left saguaro */}
          <path d="
            M 130 310
            L 130 220
            Q 130 200 145 198
            Q 162 198 162 220
            L 162 240
            Q 162 222 175 222
            Q 188 222 188 235
            L 188 260
            L 175 260
            L 175 250
            L 162 250
            L 162 310
            Z
          " />
          {/* Right saguaro */}
          <path d="
            M 620 310
            L 620 230
            Q 620 215 632 213
            Q 645 213 645 230
            L 645 310
            Z
          " />
          <path d="
            M 670 310
            L 670 250
            Q 670 235 682 233
            Q 695 233 695 250
            L 695 270
            Q 695 255 708 255
            Q 720 255 720 268
            L 720 290
            L 708 290
            L 708 282
            L 695 282
            L 695 310
            Z
          " />
        </g>
        {/* Cactus ridge lines */}
        <g stroke={tokens.ink} strokeWidth={1} opacity={0.3}>
          <line x1={397} y1={185} x2={397} y2={305} />
          <line x1={140} y1={210} x2={140} y2={305} />
          <line x1={681} y1={245} x2={681} y2={305} />
        </g>
      </svg>
    </div>
  )
}

/* ========================================================================== */
/*                       CARD MOTIFS — animate the noun                       */
/* ========================================================================== */

function CardMotif({ motif, palette, flagship, bondPct }) {
  // Each motif sits in its own contained stage. Stages live in the
  // top-right / right edge so they never overlap the headline (top-left)
  // or YTD footer (bottom-left). Pointer-events off so motifs never
  // intercept clicks.
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

// 01 — Pulse: live engine. Voyageurs (Pure Growth)
// Stage: top-right corner, bleeds outside card for drama.
function PulseMotif({ palette, flagship }) {
  const size = flagship ? 360 : 260
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        top: -size * 0.25,
        right: -size * 0.25,
        width: size,
        height: size,
      }}
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

// 02 — Burn: ascending line. Zion (Aggressive Growth)
// Stage: top-right, ~180px tall. Sits above the YTD footer.
function BurnMotif({ palette }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        right: 0,
        top: 24,
        width: "60%",
        height: 200,
      }}
    >
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
        style={{
          width: 14,
          height: 14,
          background: palette.accent,
          top: 22,
          right: 8,
        }}
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
    </div>
  )
}

// 03 — Garden: bars growing. Arches (Growth)
// Stage: right side, full height, narrow strip.
function GardenMotif({ palette }) {
  const colors = [palette.accent, tokens.mint, palette.accent, tokens.mint, palette.accent]
  return (
    <div
      className="pointer-events-none absolute"
      style={{ right: 24, top: 32, bottom: 110, width: 200 }}
    >
      <svg
        viewBox="0 0 200 280"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
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
    </div>
  )
}

// 06 — Cash Rain: dividends. Sequoia (Stability & Income)
// Stage: confined to right 50% so coins don't fall through the title.
function RainMotif({ palette }) {
  const coins = [
    { leftPct: 8, duration: 3.2, delay: 0 },
    { leftPct: 28, duration: 4.1, delay: 0.5 },
    { leftPct: 48, duration: 3.6, delay: 1.2 },
    { leftPct: 68, duration: 4.4, delay: 0.3 },
    { leftPct: 88, duration: 3.8, delay: 1.8 },
  ]
  return (
    <div
      className="pointer-events-none absolute overflow-hidden"
      style={{
        right: 0,
        top: 0,
        bottom: 0,
        width: "50%",
      }}
    >
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
          animate={{
            y: [0, 460],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
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
    </div>
  )
}

// 07 — Shield: preservation. Saguaro (Capital Preservation)
// Stage: top-right corner, dimensioned shield with the bond %.
function ShieldMotif({ palette, bondPct }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ top: 32, right: 36, width: 160, height: 184 }}
    >
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
            fontSize: 36,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {bondPct ? Math.round(bondPct) : 65}%
        </div>
        <div
          className="mt-1 text-[9px] font-bold uppercase"
          style={{ ...styles.mono, opacity: 0.85, letterSpacing: "0.16em" }}
        >
          bonds
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/*                                 DETAIL                                     */
/* ========================================================================== */

function DetailView({ portfolio, onBack }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-20 md:px-8">
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center gap-2 text-sm transition-colors"
        style={{ ...styles.mono, color: tokens.inkSoft, fontWeight: 700, letterSpacing: "0.14em" }}
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        BACK TO SERIES
      </button>

      <PortfolioDetail portfolio={portfolio} />
    </div>
  )
}

function PortfolioDetail({ portfolio }) {
  // Top performer is whichever sleeve has the highest YTD inside THIS portfolio.
  const topPerformerId = portfolio.sleeves.reduce(
    (best, s) => (s.ytdPerformance > best.ytdPerformance ? s : best),
    portfolio.sleeves[0]
  ).id
  const [expandedSleeve, setExpandedSleeve] = useState(topPerformerId)
  const [sortKey, setSortKey] = useState("weight")
  const [sortDirection, setSortDirection] = useState("desc")

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("desc")
    }
  }

  const alpha = (portfolio.ytd - portfolio.benchmarkYtd).toFixed(2)

  return (
    <div className="w-full">
      {/* HERO — full Apple-meets-design-kit treatment */}
      <section
        className="relative isolate overflow-hidden rounded-[24px]"
        style={{
          background: portfolio.palette.bg,
          color: portfolio.palette.fg,
          boxShadow:
            "0 4px 12px rgba(28,83,85,0.08), 0 24px 64px rgba(28,83,85,0.18)",
        }}
      >
        <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-8 py-12 md:px-14 md:py-16 lg:py-24">
            <p
              className="mb-5 text-[11px] font-bold uppercase"
              style={{ ...styles.mono, color: portfolio.palette.accent }}
            >
              Iconoclastic · Model Series · {portfolio.id.toUpperCase()}
            </p>

            <h1
              className="leading-[0.9]"
              style={{
                ...styles.display,
                fontWeight: 700,
                fontSize: "clamp(64px, 10vw, 144px)",
                color: portfolio.palette.fg,
              }}
            >
              {portfolio.name}
            </h1>

            <p
              className="mt-4 text-2xl md:text-3xl"
              style={{
                ...styles.serif,
                fontStyle: "italic",
                color: portfolio.palette.fg,
                opacity: 0.92,
              }}
            >
              {portfolio.tagline}.
            </p>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
              style={{ opacity: 0.7 }}
            >
              {portfolio.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Pill bg={`${portfolio.palette.accent}26`} fg={portfolio.palette.fg}>
                <span style={{ ...styles.mono, fontSize: 11, fontWeight: 700 }}>YTD</span>
                <span style={{ ...styles.display, fontWeight: 700, fontSize: 18 }}>
                  +{portfolio.ytd.toFixed(2)}%
                </span>
              </Pill>
              <Pill bg="rgba(255,255,255,0.05)" fg={portfolio.palette.fg}>
                <span style={{ ...styles.mono, fontSize: 11, fontWeight: 700, opacity: 0.7 }}>
                  VS {portfolio.benchmarkLabel.toUpperCase()}
                </span>
                <span style={{ fontSize: 14 }}>+{portfolio.benchmarkYtd.toFixed(2)}%</span>
              </Pill>
              <Pill bg={`${portfolio.palette.accent}26`} fg={portfolio.palette.accent} ring>
                <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                <span style={{ ...styles.display, fontWeight: 700, fontSize: 16 }}>
                  +{alpha}% alpha
                </span>
              </Pill>
            </div>
          </div>

          {/* Right side: park identity + animated motif */}
          <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[44rem]">
            <ParkScene parkId={portfolio.id} palette={portfolio.palette} />
            <DetailMotifStage portfolio={portfolio} />
          </div>
        </div>
      </section>

      {/* Stat strip — three big numbers, mono labels, grotesk values */}
      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="YTD Return" value={`+${portfolio.ytd.toFixed(2)}%`} accent />
        <StatCard label={`vs ${portfolio.benchmarkLabel}`} value={`+${alpha}%`} sublabel="alpha" />
        <StatCard label="Inception" value="Jan 2026" sublabel="live track record" />
      </section>

      {/* WIDGETS — Allocation Atlas + Portfolio Compass */}
      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AllocationAtlas portfolio={portfolio} />
        <PortfolioCompass portfolio={portfolio} />
      </section>

      {/* Sleeves */}
      <section className="mt-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p
              className="text-[10px] font-bold uppercase"
              style={{ ...styles.mono, color: tokens.accentTeal }}
            >
              Inside the portfolio
            </p>
            <h2
              className="mt-2 leading-[0.92]"
              style={{
                ...styles.display,
                fontWeight: 700,
                color: tokens.deepTeal,
                fontSize: "clamp(40px, 5vw, 56px)",
              }}
            >
              The sleeves.
            </h2>
            <p className="mt-2 text-[15px]" style={{ color: tokens.inkSoft }}>
              {portfolio.sleeves.length} proprietary Icono sleeves, each doing
              one job exceptionally well.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {portfolio.sleeves.map((s) => (
            <SleeveRow
              key={s.id}
              sleeve={s}
              isTopPerformer={s.id === topPerformerId}
              isExpanded={expandedSleeve === s.id}
              onToggle={() =>
                setExpandedSleeve(expandedSleeve === s.id ? null : s.id)
              }
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          ))}
        </div>
      </section>

      {/* Allocation */}
      <section
        className="mt-10 overflow-hidden rounded-[24px] p-9"
        style={{
          background: tokens.creamWarm,
          border: `2px solid ${tokens.ink}`,
        }}
      >
        <div className="flex items-end justify-between">
          <div>
            <p
              className="text-[10px] font-bold uppercase"
              style={{ ...styles.mono, color: tokens.accentTeal }}
            >
              Target allocation
            </p>
            <h3
              className="mt-2"
              style={{
                ...styles.display,
                fontWeight: 700,
                color: tokens.deepTeal,
                fontSize: 36,
                lineHeight: 0.95,
              }}
            >
              {portfolio.subtitle.replace("Target Allocation — ", "")}
            </h3>
          </div>
          <span
            className="text-[10px] font-bold uppercase"
            style={{ ...styles.mono, color: tokens.inkSoft }}
          >
            {portfolio.sleeves.length} sleeves
          </span>
        </div>

        <div
          className="mt-6 flex h-3 overflow-hidden rounded-full"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          {portfolio.sleeves.map((s) => (
            <div
              key={s.id}
              style={{
                width: `${s.allocation}%`,
                background: sleeveColor(s.id),
                transition: "all 500ms",
              }}
              title={`${s.name}: ${s.allocation}%`}
            />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {portfolio.sleeves.map((s) => (
            <LegendDot
              key={s.id}
              color={sleeveColor(s.id)}
              label={s.name}
              value={`${s.allocation}%`}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

function DetailMotifStage({ portfolio }) {
  // Larger motif rendition for hero — same tokens, more breathing room.
  const palette = portfolio.palette
  const bondPct = portfolio.sleeves
    .filter((s) => s.id === "fixedIncome")
    .reduce((acc, s) => acc + s.allocation, 0)
  return (
    <div className="absolute inset-0">
      {portfolio.motif === "pulse" && (
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
      {portfolio.motif === "burn" && (
        <BurnMotif palette={palette} />
      )}
      {portfolio.motif === "garden" && (
        <GardenMotif palette={palette} />
      )}
      {portfolio.motif === "rain" && <RainMotif palette={palette} />}
      {portfolio.motif === "shield" && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative" style={{ width: 280, height: 320 }}>
            <ShieldMotif palette={palette} bondPct={bondPct} />
          </div>
        </div>
      )}
    </div>
  )
}

/* ========================================================================== */
/*                                 PIECES                                     */
/* ========================================================================== */

function Pill({ children, bg, fg, ring }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2"
      style={{
        background: bg,
        color: fg,
        boxShadow: ring ? `inset 0 0 0 1px ${fg}33` : undefined,
      }}
    >
      {children}
    </div>
  )
}

function sleeveColor(id) {
  switch (id) {
    case "equity":
      return tokens.deepTeal
    case "rotational":
      return tokens.accentTeal
    case "fixedIncome":
      return tokens.sky
    case "crypto":
      return tokens.citrus
    case "cryptoLite":
      return tokens.mint
    default:
      return tokens.inkSoft
  }
}

function StatCard({ label, value, sublabel, accent }) {
  return (
    <div
      className="rounded-[24px] p-7 transition-all"
      style={{
        background: accent ? tokens.deepTeal : tokens.creamWarm,
        border: `2px solid ${tokens.ink}`,
        color: accent ? tokens.cream : tokens.ink,
      }}
    >
      <p
        className="text-[10px] font-bold uppercase"
        style={{
          ...styles.mono,
          color: accent ? tokens.accentTeal : tokens.inkSoft,
        }}
      >
        {label}
      </p>
      <p
        className="mt-3"
        style={{
          ...styles.display,
          fontWeight: 700,
          fontSize: 56,
          lineHeight: 0.9,
          color: accent ? tokens.accentTeal : tokens.deepTeal,
        }}
      >
        {value}
      </p>
      {sublabel && (
        <p className="mt-2 text-[13px]" style={{ opacity: 0.7 }}>
          {sublabel}
        </p>
      )}
    </div>
  )
}

function LegendDot({ color, label, value }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="h-3 w-3 rounded-full"
        style={{ background: color, flexShrink: 0 }}
      />
      <span
        className="truncate text-[13px]"
        style={{ color: tokens.inkSoft }}
      >
        {label}
      </span>
      <span
        className="ml-auto"
        style={{
          ...styles.mono,
          fontWeight: 700,
          color: tokens.deepTeal,
          fontSize: 12,
        }}
      >
        {value}
      </span>
    </div>
  )
}

function SleeveRow({
  sleeve,
  isTopPerformer,
  isExpanded,
  onToggle,
  sortKey,
  sortDirection,
  onSort,
}) {
  const standout = isTopPerformer
  const hasHoldings = !!sleeve.holdings && sleeve.holdings.length > 0

  // Each sleeve sorts its OWN holdings, so the table reflects what's in the
  // sleeve currently expanded — not a global rotational table.
  const sortedHoldings = useMemo(() => {
    if (!sleeve.holdings) return []
    return [...sleeve.holdings].sort((a, b) => {
      const m = sortDirection === "asc" ? 1 : -1
      if (sortKey === "symbol") return m * a.symbol.localeCompare(b.symbol)
      return m * (a.weight - b.weight)
    })
  }, [sleeve.holdings, sortKey, sortDirection])

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="group overflow-hidden rounded-[24px] transition-all"
      style={{
        background: standout ? tokens.deepTeal : tokens.creamWarm,
        border: `2px solid ${tokens.ink}`,
        color: standout ? tokens.cream : tokens.ink,
      }}
    >
      <button
        onClick={hasHoldings ? onToggle : undefined}
        className={[
          "flex w-full items-center gap-5 p-6 text-left transition-colors md:p-7",
          hasHoldings ? "hover:bg-black/5" : "cursor-default",
        ].join(" ")}
      >
        {/* Allocation chip — mono, bold, brutalist */}
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[14px]"
          style={{
            background: standout ? tokens.accentTeal : tokens.deepTeal,
            color: standout ? tokens.ink : tokens.cream,
            ...styles.display,
            fontWeight: 700,
            fontSize: 18,
          }}
        >
          {sleeve.allocation}%
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p
              className="text-[10px] font-bold uppercase"
              style={{
                ...styles.mono,
                color: standout ? tokens.accentTeal : tokens.inkSoft,
              }}
            >
              Sleeve · {sleeve.id.toUpperCase()}
            </p>
            {standout && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                style={{
                  ...styles.mono,
                  background: tokens.coral,
                  color: tokens.char,
                  letterSpacing: "0.16em",
                }}
              >
                <Sparkles className="h-3 w-3" />
                Top
              </span>
            )}
          </div>
          <h3
            className="mt-1"
            style={{
              ...styles.display,
              fontWeight: 700,
              fontSize: 32,
              lineHeight: 0.95,
              color: standout ? tokens.cream : tokens.deepTeal,
            }}
          >
            {sleeve.name}
          </h3>
          <p
            className="mt-2 max-w-2xl text-[14px]"
            style={{ opacity: 0.75 }}
          >
            {sleeve.description}
          </p>
        </div>

        <div className="text-right">
          <p
            className="text-[10px] font-bold uppercase"
            style={{ ...styles.mono, opacity: 0.65 }}
          >
            YTD
          </p>
          <p
            className="mt-1"
            style={{
              ...styles.display,
              fontWeight: 700,
              fontSize: 40,
              lineHeight: 0.9,
              color: standout ? tokens.accentTeal : tokens.deepTeal,
            }}
          >
            +{sleeve.ytdPerformance}%
          </p>
        </div>

        {hasHoldings && (
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: standout ? tokens.cream : tokens.deepTeal,
              color: standout ? tokens.deepTeal : tokens.cream,
            }}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </motion.div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && hasHoldings && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 md:px-7">
              <HoldingsTable
                sortKey={sortKey}
                sortDirection={sortDirection}
                onSort={onSort}
                sortedHoldings={sortedHoldings}
                inverted={standout}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function HoldingsTable({ sortKey, sortDirection, onSort, sortedHoldings, inverted }) {
  const total = sortedHoldings.reduce((s, h) => s + h.weight, 0)
  const max = Math.max(...sortedHoldings.map((h) => h.weight))
  const fg = inverted ? tokens.cream : tokens.ink
  const fgSoft = inverted ? `${tokens.cream}cc` : tokens.inkSoft

  return (
    <div
      className="rounded-[18px] overflow-hidden"
      style={{
        background: inverted ? "rgba(255,255,255,0.04)" : tokens.cream,
        border: `1.5px solid ${inverted ? "rgba(255,255,255,0.15)" : tokens.ink}`,
      }}
    >
      <div className="flex items-center justify-between px-5 pt-4 pb-3" style={{ borderBottom: `1px solid ${inverted ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}` }}>
        <div>
          <p
            className="text-[10px] font-bold uppercase"
            style={{ ...styles.mono, color: fgSoft }}
          >
            Current holdings
          </p>
          <p className="mt-0.5 text-[13px]" style={{ color: fg }}>
            As of last rebalance — {sortedHoldings[0]?.date}
          </p>
        </div>
        <div
          className="hidden items-center gap-2 text-[10px] font-bold uppercase sm:flex"
          style={{ ...styles.mono, color: fgSoft }}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
          Sortable
        </div>
      </div>

      <div
        className="grid grid-cols-[1.1fr_1.5fr_0.6fr_0.9fr] items-center gap-4 px-5 py-3 text-[10px] font-bold uppercase"
        style={{ ...styles.mono, color: fgSoft }}
      >
        <button
          onClick={() => onSort("symbol")}
          className="flex items-center gap-1 hover:opacity-100 opacity-90 transition-opacity"
        >
          Symbol
          <ArrowUpDown
            className={`h-3 w-3 transition-opacity ${sortKey === "symbol" ? "opacity-100" : "opacity-40"}`}
          />
        </button>
        <span>Name</span>
        <button
          onClick={() => onSort("weight")}
          className="flex items-center justify-end gap-1 hover:opacity-100 opacity-90 transition-opacity"
        >
          Weight
          <ArrowUpDown
            className={`h-3 w-3 transition-opacity ${sortKey === "weight" ? "opacity-100" : "opacity-40"}`}
          />
        </button>
        <span className="text-right">Visualization</span>
      </div>

      <div>
        {sortedHoldings.map((h, i) => (
          <motion.div
            key={h.symbol}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.025 }}
            className="grid grid-cols-[1.1fr_1.5fr_0.6fr_0.9fr] items-center gap-4 px-5 py-3.5 transition-colors"
            style={{
              borderTop: `1px solid ${inverted ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="inline-flex h-8 w-8 items-center justify-center rounded-[8px]"
                style={{
                  background: tokens.ink,
                  color: tokens.cream,
                  ...styles.mono,
                  fontWeight: 700,
                  fontSize: 10,
                }}
              >
                {h.symbol.slice(0, 4)}
              </span>
              <span style={{ ...styles.display, fontWeight: 600, fontSize: 15, color: fg }}>
                {h.symbol}
              </span>
            </div>
            <span className="truncate text-[13px]" style={{ color: fgSoft }}>
              {tickerNames[h.symbol] ?? "—"}
            </span>
            <span
              className="text-right tabular-nums"
              style={{ ...styles.mono, fontWeight: 700, fontSize: 13, color: fg }}
            >
              {h.weight.toFixed(2)}%
            </span>
            <div className="flex justify-end">
              <div
                className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full"
                style={{ background: inverted ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(h.weight / max) * 100}%` }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.03 }}
                  className="h-full rounded-full"
                  style={{ background: tokens.accentTeal }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="grid grid-cols-[1.1fr_1.5fr_0.6fr_0.9fr] items-center gap-4 px-5 py-3.5"
        style={{
          borderTop: `1px solid ${inverted ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
          background: inverted ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
        }}
      >
        <span style={{ ...styles.mono, fontWeight: 700, fontSize: 11, color: fg, letterSpacing: "0.16em", textTransform: "uppercase" }}>
          Total
        </span>
        <span className="text-[13px]" style={{ color: fgSoft }}>
          {sortedHoldings.length} positions
        </span>
        <span className="text-right tabular-nums" style={{ ...styles.mono, fontWeight: 700, fontSize: 13, color: fg }}>
          {total.toFixed(2)}%
        </span>
        <span />
      </div>
    </div>
  )
}

/* ========================================================================== */
/*                  WIDGETS — Allocation Atlas + Portfolio Compass            */
/* ========================================================================== */

function AllocationAtlas({ portfolio }) {
  return (
    <div
      className="relative overflow-hidden rounded-[24px] p-9"
      style={{ background: tokens.sky, color: tokens.ink, minHeight: 360 }}
    >
      <p className="text-[10px] font-bold" style={{ ...styles.mono, opacity: 0.7 }}>
        Diversification · ATLAS
      </p>
      <h3
        className="mt-3 leading-[0.92]"
        style={{ ...styles.display, fontWeight: 700, fontSize: 44, color: tokens.ink }}
      >
        Allocation
        <br />
        Atlas
      </h3>
      <p className="mt-3 max-w-[260px] text-[14px]" style={{ opacity: 0.78 }}>
        Every dollar mapped. {portfolio.sleeves.length} sleeves, working in concert.
      </p>

      <AtlasDonut sleeves={portfolio.sleeves} />

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

function AtlasDonut({ sleeves }) {
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
        <circle cx={50} cy={50} r={r} fill="none" stroke="rgba(10,31,32,0.08)" strokeWidth={14} />
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

const COMPASS_ORDER = ["saguaro", "sequoia", "arches", "zion", "voyageurs"]

function compassAngleFor(portfolioId) {
  const idx = COMPASS_ORDER.indexOf(portfolioId)
  if (idx < 0) return 0
  const start = -120
  const step = 240 / (COMPASS_ORDER.length - 1)
  return start + idx * step
}

function positionLabel(id) {
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

function PortfolioCompass({ portfolio }) {
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
      <p className="text-[10px] font-bold" style={{ ...styles.mono, color: tokens.inkSoft }}>
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

function CompassDial({ angle, palette }) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ bottom: 70, right: 36, width: 200, height: 200 }}
    >
      <div className="absolute inset-0 rounded-full" style={{ border: `1.5px solid ${tokens.ink}` }} />
      <div
        className="absolute rounded-full"
        style={{ inset: 24, border: `1.5px dashed ${tokens.ink}`, opacity: 0.4 }}
      />
      <div
        className="absolute rounded-full"
        style={{ inset: 48, border: `1.5px dashed ${tokens.ink}`, opacity: 0.4 }}
      />

      {COMPASS_ORDER.map((id, i) => {
        const a = -120 + i * (240 / (COMPASS_ORDER.length - 1))
        return <CompassTick key={id} angle={a} active={a === angle} />
      })}

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

function CompassTick({ angle, active }) {
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
