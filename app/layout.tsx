import type { Metadata } from 'next'
import {
  Hedvig_Letters_Serif,
  Outfit,
  Space_Grotesk,
  JetBrains_Mono,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Icono Design Kit v2 — full type stack
const hedvig = Hedvig_Letters_Serif({
  subsets: ["latin"],
  variable: "--font-hedvig",
})
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: 'The National Parks Series — Iconoclastic Capital',
  description:
    "Brand-anchored when it should be. Loud when the product earns it. Iconoclastic Capital's National Parks portfolio series.",
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={[
        hedvig.variable,
        outfit.variable,
        spaceGrotesk.variable,
        jetBrainsMono.variable,
      ].join(" ")}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
