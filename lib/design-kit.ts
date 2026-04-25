// Iconoclastic Capital — Design Kit v2 tokens (TS access)
// CSS vars live in app/globals.css; these mirror them for inline-style use.
//
// Operating principles:
//   01 · Animate the noun.
//   02 · One bold move per card.
//   03 · 24px radius. Always.
//   04 · Mono labels, grotesk headlines.
//   05 · Lift on hover, 6px.

export const tokens = {
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
} as const

export const fonts = {
  serif: "var(--font-serif), Georgia, 'Times New Roman', serif",
  display: "var(--font-display), -apple-system, BlinkMacSystemFont, sans-serif",
  sans: "var(--font-sans), -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "var(--font-mono), ui-monospace, SFMono-Regular, monospace",
} as const

export const styles = {
  display: { fontFamily: fonts.display, letterSpacing: "-0.04em" },
  serif: { fontFamily: fonts.serif },
  mono: { fontFamily: fonts.mono, letterSpacing: "0.16em" },
  body: { fontFamily: fonts.sans },
} as const

export type Palette = {
  bg: string
  fg: string
  accent: string
}

export type MotifType = "pulse" | "burn" | "garden" | "rain" | "shield"

export function sleeveColor(id: string): string {
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
