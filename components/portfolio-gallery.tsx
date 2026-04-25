"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Lock, Sparkles } from "lucide-react"
import { portfolios, type Portfolio } from "../lib/portfolio-data"
import { tokens, styles } from "../lib/design-kit"
import { CardMotif } from "./motifs"
import { ParkScene } from "./park-scenes"
import { PortfolioDetail } from "./portfolio-detail"

export function PortfolioGallery() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = portfolios.find((p) => p.id === activeId)

  return (
    <div
      className="min-h-screen"
      style={{ background: tokens.cream, color: tokens.ink, fontFamily: "var(--font-sans)" }}
    >
      <header
        className="sticky top-0 z-30 backdrop-blur-xl"
        style={{ background: `${tokens.cream}cc`, borderBottom: `2px solid ${tokens.ink}` }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: tokens.accentTeal }} />
            <span className="text-lg" style={{ ...styles.display, fontWeight: 700, color: tokens.deepTeal }}>
              Iconoclastic
            </span>
            <span className="ml-1.5 text-[10px] font-bold uppercase" style={{ ...styles.mono, color: tokens.inkSoft }}>
              Capital
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: tokens.inkSoft }}>
            <a className="opacity-80 hover:opacity-100 transition-opacity" href="#series">Model Series</a>
            <a className="opacity-80 hover:opacity-100 transition-opacity" href="#">Research</a>
            <a className="opacity-80 hover:opacity-100 transition-opacity" href="#">Clients</a>
            <a className="opacity-80 hover:opacity-100 transition-opacity" href="#">About</a>
          </nav>
          <button
            className="rounded-full px-4 py-1.5 text-xs font-bold uppercase transition-transform hover:scale-105"
            style={{ background: tokens.deepTeal, color: tokens.cream, ...styles.mono, letterSpacing: "0.14em" }}
          >
            Sign in
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            <GalleryView onSelect={setActiveId} />
          </motion.div>
        ) : (
          <motion.div key={`detail-${active.id}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.4 }}>
            <DetailView portfolio={active} onBack={() => setActiveId(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-24 py-10" style={{ borderTop: `2px solid ${tokens.ink}` }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 text-xs md:flex-row md:items-center md:px-8" style={{ color: tokens.inkSoft }}>
          <p style={{ ...styles.mono, fontSize: 11, fontWeight: 700 }}>
            © {new Date().getFullYear()} ICONOCLASTIC CAPITAL · NATIONAL PARKS SERIES
          </p>
          <p className="max-w-md text-[13px]">
            Past performance is not indicative of future results. This page is for illustrative purposes and is not investment advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

function GalleryView({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <section className="pt-16 pb-12 md:pt-24" style={{ borderBottom: `2px solid ${tokens.ink}` }}>
        <p className="text-[11px] font-bold uppercase" style={{ ...styles.mono, color: tokens.accentTeal }}>
          Icono · The National Parks Series · v1
        </p>
        <h1
          className="mt-4 leading-[0.92]"
          style={{ ...styles.display, fontWeight: 700, color: tokens.deepTeal, fontSize: "clamp(48px, 8vw, 96px)" }}
        >
          Five portfolios.<br />
          <span style={{ color: tokens.coral }}>One philosophy.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: tokens.inkSoft }}>
          Brand-anchored when it should be. Loud when the product earns it. Each portfolio is named for the place that embodies its purpose, animated around what it actually does.
        </p>
      </section>

      <section id="series" className="pt-10 pb-24">
        <div className="grid grid-cols-12 gap-5 md:gap-6">
          {portfolios.map((p, i) => (
            <PortfolioCard key={p.id} portfolio={p} index={i} onSelect={onSelect} />
          ))}
        </div>
      </section>
    </div>
  )
}

function PortfolioCard({
  portfolio,
  index,
  onSelect,
}: {
  portfolio: Portfolio
  index: number
  onSelect: (id: string) => void
}) {
  const isActive = portfolio.status === "active"
  const isFlagship = portfolio.id === "voyageurs"

  // Grid rhythm across 12 cols: 7+5, 7+5, 12. The trailing card claims a
  // full row so the lineup ends on a deliberate hero, not a half-empty row.
  const span: Record<string, string> = {
    voyageurs: "col-span-12 md:col-span-7",
    zion: "col-span-12 md:col-span-5",
    arches: "col-span-12 md:col-span-7",
    sequoia: "col-span-12 md:col-span-5",
    saguaro: "col-span-12",
  }

  const minH = isFlagship ? "min-h-[440px] md:min-h-[460px]" : "min-h-[380px]"

  // Bond allocation for shield motif
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
        span[portfolio.id],
        minH,
        isActive ? "cursor-pointer" : "cursor-not-allowed opacity-90",
      ].join(" ")}
      style={{
        background: portfolio.palette.bg,
        color: portfolio.palette.fg,
        boxShadow: "0 1px 2px rgba(28,83,85,0.04), 0 8px 32px rgba(28,83,85,0.06)",
      }}
    >
      {/* PARK SCENE — base identity layer (silhouette of the actual park). */}
      <ParkScene parkId={portfolio.id} palette={portfolio.palette} />

      {/* MOTIF — sits on top of park scene, in its own contained stage. */}
      <CardMotif
        motif={portfolio.motif}
        palette={portfolio.palette}
        flagship={isFlagship}
        bondPct={bondPct}
      />

      {/* CONTENT — flex column. Header up top, YTD pinned to bottom. */}
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col p-9">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p
              className="text-[10px] font-bold"
              style={{ ...styles.mono, color: portfolio.palette.fg, opacity: 0.7 }}
            >
              {portfolio.tagline} · 0{index + 1}
            </p>
            <h3
              className={[
                "mt-3 leading-[0.92]",
                isFlagship ? "text-[64px] md:text-[80px]" : "text-[40px] md:text-[52px]",
              ].join(" ")}
              style={{ ...styles.display, fontWeight: 700, color: portfolio.palette.fg }}
            >
              {portfolio.name}
            </h3>
            <p
              className="mt-3 max-w-[300px] text-[14px] leading-snug"
              style={{ opacity: 0.78 }}
            >
              {portfolio.subtitle.replace("Target Allocation — ", "")}
            </p>
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

        <div className="flex-1" />

        {/* FOOTER — YTD + arrow on a frosted backplate so motifs don't ghost behind it. */}
        <div className="flex items-end justify-between gap-4">
          <div
            className="rounded-[16px] px-4 py-3"
            style={{
              background: `${portfolio.palette.bg}cc`,
              backdropFilter: "blur(8px)",
            }}
          >
            <p className="text-[10px] font-bold" style={{ ...styles.mono, opacity: 0.65 }}>
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
            style={{ background: portfolio.palette.fg, color: portfolio.palette.bg }}
          >
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </motion.button>
  )
}

function DetailView({ portfolio, onBack }: { portfolio: Portfolio; onBack: () => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 pb-20 pt-8">
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
