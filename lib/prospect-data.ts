// Iconoclastic Capital — public prospect view data.
// What we tease vs. what we keep behind the wall.

import type { Portfolio, Sleeve, Holding } from "./portfolio-data"

export type ViewMode = "client" | "prospect"

// Map every real ticker to a sector/category teaser label.
// What a prospect sees instead of "SPY": "U.S. Large-Cap Core."
export const tickerCategory: Record<string, string> = {
  // Rotational
  DTCR: "Data Centers & Digital Infra",
  EUAD: "Europe Aerospace & Defense",
  EUFN: "Europe Financials",
  NLR: "Uranium & Nuclear",
  PAVE: "U.S. Infrastructure",
  SHLD: "Defense Technology",
  USCI: "Diversified Commodities",
  UTES: "U.S. Utilities",
  XME: "U.S. Metals & Mining",
  // Equity
  SPY: "U.S. Large-Cap Core",
  QQQ: "U.S. Tech Mega-Cap",
  VEA: "Developed International",
  IEMG: "Emerging Markets",
  PIZ: "Developed Momentum",
  VB: "U.S. Small-Cap",
  COWZ: "U.S. Free Cash Flow",
  SPGP: "U.S. GARP",
  VTV: "U.S. Large-Cap Value",
  // Crypto
  BITC: "Crypto Industry Innovators",
  AETH: "Ethereum Strategy",
  BITB: "Spot Bitcoin",
  BITQ: "Crypto Industry Leaders",
  MSTR: "Bitcoin-Treasury Equity",
  // Fixed Income
  BND: "U.S. Aggregate Bond",
  BALT: "Defined-Outcome Buffer",
  BNDX: "International Bond",
  EMHY: "Emerging Markets High Yield",
  SFLR: "Managed Equity Floor",
  CAOS: "Tail-Risk Hedge",
}

// Round YTD to a directional range so we tease without disclosing.
// Example: 8.39 → "8–9%"; -3.2 → "-2 to -4%"
export function teaseYtd(actual: number): string {
  if (actual >= 0) {
    const lo = Math.floor(actual)
    const hi = Math.ceil(actual)
    if (lo === hi) return `~${lo}%`
    return `+${lo}–${hi}%`
  }
  const lo = Math.ceil(actual)
  const hi = Math.floor(actual)
  return `${hi} to ${lo}%`
}

// For prospect alpha — keep it sharp because alpha is the hook.
// Round to one decimal but drop the decimal if it'd be .0.
export function teaseAlpha(actual: number): string {
  const rounded = Math.round(actual * 10) / 10
  const formatted = rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)
  return `+${formatted}%`
}

// Aggregate teaser stats per portfolio for the new TLH/value-creation card.
// These are illustrative ranges, not commitments.
export const valueCreatedTeaser: Record<string, { tlh: string; rebalances: string }> = {
  voyageurs: { tlh: "$XX,XXX", rebalances: "9 strategic shifts" },
  zion: { tlh: "$XX,XXX", rebalances: "9 strategic shifts" },
  arches: { tlh: "$XX,XXX", rebalances: "9 strategic shifts" },
  sequoia: { tlh: "$X,XXX", rebalances: "9 strategic shifts" },
  saguaro: { tlh: "$X,XXX", rebalances: "9 strategic shifts" },
}

// Util — same shape as Holding but with category replacing the ticker name
// and weight sometimes blurred for the prospect view.
export function teaseHolding(h: Holding): {
  date: string
  symbol: string
  category: string
  weight: number
} {
  return {
    date: h.date,
    symbol: h.symbol,
    category: tickerCategory[h.symbol] ?? "Strategic Position",
    weight: h.weight,
  }
}

// Convenience pass-throughs so consuming components don't have to know about
// portfolio-data internals.
export type { Portfolio, Sleeve, Holding }
