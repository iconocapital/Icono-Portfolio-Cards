"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpDown, Sparkles, ArrowUpRight, Plus } from "lucide-react"
import {
  tickerNames,
  sleeveColor,
  type Holding,
  type Sleeve,
  type Portfolio,
} from "../lib/portfolio-data"
import { tokens, styles } from "../lib/design-kit"
import { HeroMotifStage } from "./motifs"
import { ParkScene } from "./park-scenes"

type SortKey = "symbol" | "weight"
type SortDirection = "asc" | "desc"

export function PortfolioDetail({ portfolio }: { portfolio: Portfolio }) {
  // Top performer is whichever sleeve has the highest YTD inside THIS portfolio.
  const topPerformerId = portfolio.sleeves.reduce(
    (best, s) => (s.ytdPerformance > best.ytdPerformance ? s : best),
    portfolio.sleeves[0]
  ).id
  const [expandedSleeve, setExpandedSleeve] = useState<string | null>(topPerformerId)
  const [sortKey, setSortKey] = useState<SortKey>("weight")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDirection("desc")
    }
  }

  const alpha = (portfolio.ytd - portfolio.benchmarkYtd).toFixed(2)

  // Bond % drives the shield motif label.
  const bondPct = portfolio.sleeves
    .filter((s) => s.id === "fixedIncome")
    .reduce((acc, s) => acc + s.allocation, 0)

  return (
    <div className="w-full">
      {/* HERO */}
      <section
        className="relative isolate overflow-hidden rounded-[24px]"
        style={{
          background: portfolio.palette.bg,
          color: portfolio.palette.fg,
          boxShadow: "0 4px 12px rgba(28,83,85,0.08), 0 24px 64px rgba(28,83,85,0.18)",
        }}
      >
        <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="px-8 py-12 md:px-14 md:py-16 lg:py-24">
            <p className="mb-5 text-[11px] font-bold uppercase" style={{ ...styles.mono, color: portfolio.palette.accent }}>
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

            <p className="mt-6 max-w-xl text-base leading-relaxed md:text-lg" style={{ opacity: 0.7 }}>
              {portfolio.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Pill bg={`${portfolio.palette.accent}26`} fg={portfolio.palette.fg}>
                <span style={{ ...styles.mono, fontSize: 11, fontWeight: 700 }}>YTD</span>
                <span style={{ ...styles.display, fontWeight: 700, fontSize: 18 }}>+{portfolio.ytd.toFixed(2)}%</span>
              </Pill>
              <Pill bg="rgba(255,255,255,0.05)" fg={portfolio.palette.fg}>
                <span style={{ ...styles.mono, fontSize: 11, fontWeight: 700, opacity: 0.7 }}>
                  VS {portfolio.benchmarkLabel.toUpperCase()}
                </span>
                <span style={{ fontSize: 14 }}>+{portfolio.benchmarkYtd.toFixed(2)}%</span>
              </Pill>
              <Pill bg={`${portfolio.palette.accent}26`} fg={portfolio.palette.accent} ring>
                <Sparkles className="h-4 w-4" strokeWidth={2.5} />
                <span style={{ ...styles.display, fontWeight: 700, fontSize: 16 }}>+{alpha}% alpha</span>
              </Pill>
            </div>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[44rem]">
            <ParkScene parkId={portfolio.id} palette={portfolio.palette} />
            <HeroMotifStage
              motif={portfolio.motif}
              palette={portfolio.palette}
              bondPct={bondPct}
            />
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard label="YTD Return" value={`+${portfolio.ytd.toFixed(2)}%`} accent />
        <StatCard label={`vs ${portfolio.benchmarkLabel}`} value={`+${alpha}%`} sublabel="alpha" />
        <StatCard label="Inception" value="Jan 2026" sublabel="live track record" />
      </section>

      <section className="mt-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase" style={{ ...styles.mono, color: tokens.accentTeal }}>
              Inside the portfolio
            </p>
            <h2
              className="mt-2 leading-[0.92]"
              style={{ ...styles.display, fontWeight: 700, color: tokens.deepTeal, fontSize: "clamp(40px, 5vw, 56px)" }}
            >
              The sleeves.
            </h2>
            <p className="mt-2 text-[15px]" style={{ color: tokens.inkSoft }}>
              {portfolio.sleeves.length} proprietary Icono sleeves, each doing one job exceptionally well.
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
              onToggle={() => setExpandedSleeve(expandedSleeve === s.id ? null : s.id)}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          ))}
        </div>
      </section>

      <section
        className="mt-10 overflow-hidden rounded-[24px] p-9"
        style={{ background: tokens.creamWarm, border: `2px solid ${tokens.ink}` }}
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase" style={{ ...styles.mono, color: tokens.accentTeal }}>
              Target allocation
            </p>
            <h3 className="mt-2" style={{ ...styles.display, fontWeight: 700, color: tokens.deepTeal, fontSize: 36, lineHeight: 0.95 }}>
              {portfolio.subtitle.replace("Target Allocation — ", "")}
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase" style={{ ...styles.mono, color: tokens.inkSoft }}>
            {portfolio.sleeves.length} sleeves
          </span>
        </div>

        <div className="mt-6 flex h-3 overflow-hidden rounded-full" style={{ background: "rgba(0,0,0,0.05)" }}>
          {portfolio.sleeves.map((s) => (
            <div
              key={s.id}
              style={{ width: `${s.allocation}%`, background: sleeveColor(s.id), transition: "all 500ms" }}
              title={`${s.name}: ${s.allocation}%`}
            />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {portfolio.sleeves.map((s) => (
            <LegendDot key={s.id} color={sleeveColor(s.id)} label={s.name} value={`${s.allocation}%`} />
          ))}
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Pill({ children, bg, fg, ring }: { children: React.ReactNode; bg: string; fg: string; ring?: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-4 py-2"
      style={{ background: bg, color: fg, boxShadow: ring ? `inset 0 0 0 1px ${fg}33` : undefined }}
    >
      {children}
    </div>
  )
}

function StatCard({
  label,
  value,
  sublabel,
  accent,
}: {
  label: string
  value: string
  sublabel?: string
  accent?: boolean
}) {
  return (
    <div
      className="rounded-[24px] p-7 transition-all"
      style={{
        background: accent ? tokens.deepTeal : tokens.creamWarm,
        border: `2px solid ${tokens.ink}`,
        color: accent ? tokens.cream : tokens.ink,
      }}
    >
      <p className="text-[10px] font-bold uppercase" style={{ ...styles.mono, color: accent ? tokens.accentTeal : tokens.inkSoft }}>
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

function LegendDot({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-3 w-3 rounded-full" style={{ background: color, flexShrink: 0 }} />
      <span className="truncate text-[13px]" style={{ color: tokens.inkSoft }}>
        {label}
      </span>
      <span className="ml-auto" style={{ ...styles.mono, fontWeight: 700, color: tokens.deepTeal, fontSize: 12 }}>
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
}: {
  sleeve: Sleeve
  isTopPerformer: boolean
  isExpanded: boolean
  onToggle: () => void
  sortKey: SortKey
  sortDirection: SortDirection
  onSort: (k: SortKey) => void
}) {
  const standout = isTopPerformer
  const hasHoldings = !!sleeve.holdings && sleeve.holdings.length > 0

  // Each sleeve sorts its OWN holdings.
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
              style={{ ...styles.mono, color: standout ? tokens.accentTeal : tokens.inkSoft }}
            >
              Sleeve · {sleeve.id.toUpperCase()}
            </p>
            {standout && (
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase"
                style={{ ...styles.mono, background: tokens.coral, color: tokens.char, letterSpacing: "0.16em" }}
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
          <p className="mt-2 max-w-2xl text-[14px]" style={{ opacity: 0.75 }}>
            {sleeve.description}
          </p>
        </div>

        <div className="text-right">
          <p className="text-[10px] font-bold uppercase" style={{ ...styles.mono, opacity: 0.65 }}>YTD</p>
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
                inverted={!!standout}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function HoldingsTable({
  sortKey,
  sortDirection,
  onSort,
  sortedHoldings,
  inverted,
}: {
  sortKey: SortKey
  sortDirection: SortDirection
  onSort: (k: SortKey) => void
  sortedHoldings: Holding[]
  inverted: boolean
}) {
  const total = sortedHoldings.reduce((s, h) => s + h.weight, 0)
  const max = Math.max(...sortedHoldings.map((h) => h.weight))
  const fg = inverted ? tokens.cream : tokens.ink
  const fgSoft = inverted ? `${tokens.cream}cc` : tokens.inkSoft
  const rowBorder = inverted ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"

  return (
    <div
      className="overflow-hidden rounded-[18px]"
      style={{
        background: inverted ? "rgba(255,255,255,0.04)" : tokens.cream,
        border: `1.5px solid ${inverted ? "rgba(255,255,255,0.15)" : tokens.ink}`,
      }}
    >
      <div
        className="flex items-center justify-between px-5 pt-4 pb-3"
        style={{ borderBottom: `1px solid ${rowBorder}` }}
      >
        <div>
          <p className="text-[10px] font-bold uppercase" style={{ ...styles.mono, color: fgSoft }}>
            Current holdings
          </p>
          <p className="mt-0.5 text-[13px]" style={{ color: fg }}>
            As of last rebalance — {sortedHoldings[0]?.date}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase" style={{ ...styles.mono, color: fgSoft }}>
          <ArrowUpRight className="h-3.5 w-3.5" />
          Sortable
        </div>
      </div>

      <div
        className="grid grid-cols-[1.1fr_1.5fr_0.6fr_0.9fr] items-center gap-4 px-5 py-3 text-[10px] font-bold uppercase"
        style={{ ...styles.mono, color: fgSoft }}
      >
        <button onClick={() => onSort("symbol")} className="flex items-center gap-1 opacity-90 transition-opacity hover:opacity-100">
          Symbol
          <ArrowUpDown className={`h-3 w-3 transition-opacity ${sortKey === "symbol" ? "opacity-100" : "opacity-40"}`} />
        </button>
        <span>Name</span>
        <button
          onClick={() => onSort("weight")}
          className="flex items-center justify-end gap-1 opacity-90 transition-opacity hover:opacity-100"
        >
          Weight
          <ArrowUpDown className={`h-3 w-3 transition-opacity ${sortKey === "weight" ? "opacity-100" : "opacity-40"}`} />
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
            style={{ borderTop: `1px solid ${rowBorder}` }}
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
              <span style={{ ...styles.display, fontWeight: 600, fontSize: 15, color: fg }}>{h.symbol}</span>
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
        <span
          style={{
            ...styles.mono,
            fontWeight: 700,
            fontSize: 11,
            color: fg,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Total
        </span>
        <span className="text-[13px]" style={{ color: fgSoft }}>
          {sortedHoldings.length} positions
        </span>
        <span
          className="text-right tabular-nums"
          style={{ ...styles.mono, fontWeight: 700, fontSize: 13, color: fg }}
        >
          {total.toFixed(2)}%
        </span>
        <span />
      </div>
    </div>
  )
}
