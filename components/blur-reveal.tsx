"use client"

// BlurReveal — a wrapper that visually obscures real client data.
//
// Two patterns:
//   <BlurNumber value={"8.39"} prospect /> — replaces the number with a blurred
//     placeholder pattern. Keeps layout dimensions identical.
//   <BlurField text="SPY" prospect /> — same idea for short text spans.
//   <BlurOverlay prospect>...</BlurOverlay> — wraps a whole block (table row,
//     etc.) with a frosted overlay + an invitation to talk.

import type { ReactNode } from "react"
import { Lock } from "lucide-react"
import { tokens, styles } from "../lib/design-kit"

export function BlurNumber({
  value,
  prospect,
}: {
  value: string
  prospect: boolean
}) {
  if (!prospect) return <>{value}</>
  // Use the same character count for stable layout, replace with X.
  // E.g. "12.51" → "XX.XX"
  const masked = value.replace(/[0-9]/g, "X")
  return (
    <span
      style={{
        filter: "blur(4px)",
        userSelect: "none",
        opacity: 0.75,
      }}
      aria-label="Hidden — available to clients"
    >
      {masked}
    </span>
  )
}

export function BlurField({
  text,
  prospect,
}: {
  text: string
  prospect: boolean
}) {
  if (!prospect) return <>{text}</>
  const masked = text.replace(/[A-Za-z0-9]/g, "·")
  return (
    <span
      style={{
        filter: "blur(3px)",
        userSelect: "none",
        opacity: 0.7,
      }}
      aria-label="Hidden — available to clients"
    >
      {masked.length > 0 ? masked : "·····"}
    </span>
  )
}

export function BlurOverlay({
  prospect,
  children,
  label = "Holdings unlock when you become a client.",
  ctaHref = "https://iconocapital.com/get-started",
  ctaLabel = "Start the conversation",
}: {
  prospect: boolean
  children: ReactNode
  label?: string
  ctaHref?: string
  ctaLabel?: string
}) {
  if (!prospect) return <>{children}</>
  return (
    <div className="relative">
      <div style={{ filter: "blur(6px)", userSelect: "none", pointerEvents: "none" }}>
        {children}
      </div>
      {/* Frosted overlay with CTA */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 py-10 text-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(245,239,228,0.6), rgba(245,239,228,0.92))",
          backdropFilter: "blur(2px)",
        }}
      >
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase"
          style={{
            ...styles.mono,
            background: tokens.deepTeal,
            color: tokens.cream,
            letterSpacing: "0.18em",
          }}
        >
          <Lock className="h-3 w-3" />
          Client view
        </span>
        <p
          className="mt-4 max-w-sm text-[15px] md:text-[16px] leading-snug"
          style={{ color: tokens.ink }}
        >
          {label}
        </p>
        <a
          href={ctaHref}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-bold uppercase transition-transform hover:scale-105"
          style={{
            ...styles.mono,
            background: tokens.coral,
            color: tokens.char,
            letterSpacing: "0.16em",
          }}
        >
          {ctaLabel}
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  )
}
