import type { Metadata } from "next"
import { PortfolioGallery } from "../../components/portfolio-gallery"

export const metadata: Metadata = {
  title: "Public Preview — Iconoclastic Capital",
  description:
    "A preview of how Iconoclastic Capital's National Parks model portfolios are built. Real holdings and performance data are reserved for clients.",
}

export default function PreviewPage() {
  return <PortfolioGallery mode="prospect" />
}
