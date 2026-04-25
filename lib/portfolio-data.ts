// Iconoclastic Capital — Model Portfolio Series ("National Parks")
// Each portfolio carries a kit palette + motif type. The motif IS the product.

import { tokens, type Palette, type MotifType } from "./design-kit"

export interface Holding {
  date: string
  symbol: string
  weight: number // expressed as % (0-100)
}

export interface Sleeve {
  id: string
  name: string
  allocation: number
  ytdPerformance: number
  description: string
  holdings?: Holding[]
}

export interface Portfolio {
  id: string
  name: string
  tagline: string
  subtitle: string
  description: string
  ytd: number
  benchmarkYtd: number
  benchmarkLabel: string
  status: "active" | "coming-soon"
  motif: MotifType
  palette: Palette
  sleeves: Sleeve[]
}

// Latest holdings snapshots per sleeve.

// Rotational — most recent rebalance: 10/08/2025
export const rotationalHoldings: Holding[] = [
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
export const equityHoldings: Holding[] = [
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
export const cryptoHoldings: Holding[] = [
  { date: "Current", symbol: "BITC", weight: 35.0 },
  { date: "Current", symbol: "AETH", weight: 20.0 },
  { date: "Current", symbol: "BITB", weight: 20.0 },
  { date: "Current", symbol: "BITQ", weight: 15.0 },
  { date: "Current", symbol: "MSTR", weight: 10.0 },
]

// Fixed Income — most recent rebalance: 10/27/2025
export const fixedIncomeHoldings: Holding[] = [
  { date: "10/27/2025", symbol: "BND", weight: 35.0 },
  { date: "10/27/2025", symbol: "BALT", weight: 15.0 },
  { date: "10/27/2025", symbol: "BNDX", weight: 15.0 },
  { date: "10/27/2025", symbol: "EMHY", weight: 12.5 },
  { date: "10/27/2025", symbol: "SFLR", weight: 12.5 },
  { date: "10/27/2025", symbol: "CAOS", weight: 10.0 },
]

export const tickerNames: Record<string, string> = {
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

type SleeveTemplate = Omit<Sleeve, "allocation">

const sleeveMeta: Record<string, SleeveTemplate> = {
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

const sleeve = (key: keyof typeof sleeveMeta, allocation: number): Sleeve => ({
  ...sleeveMeta[key],
  allocation,
})

export const portfolios: Portfolio[] = [
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

export { sleeveColor } from "./design-kit"
