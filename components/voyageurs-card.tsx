// Deprecated: kept for backwards compatibility.
// Use `PortfolioDetail` from `@/components/portfolio-detail` instead.
"use client"

import { PortfolioDetail } from "./portfolio-detail"
import { portfolios } from "../lib/portfolio-data"

export function VoyageursCard() {
  const voyageurs = portfolios.find((p) => p.id === "voyageurs")
  if (!voyageurs) return null
  return <PortfolioDetail portfolio={voyageurs} />
}
