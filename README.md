# Icono Portfolio Cards

Interactive product cards for **Iconoclastic Capital**'s National Parks model portfolio series — Voyageurs, Zion, Arches, Sequoia, and Saguaro.

Built on the **Icono Design Kit v2**: brand-anchored when it should be, loud when the product earns it. Each card carries a hand-drawn SVG silhouette of its actual park as base identity, with a purpose-driven motion motif animating on top.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **framer-motion** for animations
- **lucide-react** for icons
- Type stack: Space Grotesk (display), Hedvig Letters Serif (editorial), Outfit (body), JetBrains Mono (data labels)

## Run locally

```bash
pnpm install --legacy-peer-deps
pnpm dev
```

Then open <http://localhost:3000>.

## Project structure

```
app/                          → Next.js app router pages
components/
  ├─ portfolio-gallery.tsx    → Series grid + nav + footer
  ├─ portfolio-detail.tsx     → Hero + sleeves + holdings table
  ├─ park-scenes.tsx          → SVG park silhouettes (identity layer)
  └─ motifs.tsx               → Purpose-motif animations (the noun)
lib/
  ├─ design-kit.ts            → Tokens, fonts, sleeve colors
  └─ portfolio-data.ts        → Portfolios, sleeves, holdings
IconoclasticPortfolioGallery.jsx  → Single-file artifact build (standalone)
```

## The five portfolios

| Park | Tagline | Allocation | Motif |
|---|---|---|---|
| Voyageurs | Pure Growth | 100% Stock | Pulse rings (live engine) |
| Zion | Aggressive Growth | 85/15 | Burn line (ascending) |
| Arches | Growth | 70/30 | Garden bars (growth) |
| Sequoia | Stability & Income | 50/50 | Cash rain (income) |
| Saguaro | Capital Preservation | 35/65 | Tax shield (preservation) |

## The four sleeves

- **Equity** — broad-market core
- **Rotational** — dynamic sector tilts (full holdings table per CSV)
- **Fixed Income** — high-quality bonds for ballast
- **Crypto** / **Crypto Lite** — strategic digital-asset allocation

Each sleeve has a real holdings snapshot wired in. The detail view's table is sortable by symbol or weight.

## Design principles

1. **Animate the noun.** Motion describes what the product *does*.
2. **One bold move per card.** Either color, type, or motion — never all three.
3. **24px radius. Always.**
4. **Mono labels, grotesk headlines.**
5. **Lift on hover, 6px.**

## Deploy

The project is set up for Vercel. Push to this repo and import it on <https://vercel.com/new>.

---

© Iconoclastic Capital Management. The National Parks Series.
