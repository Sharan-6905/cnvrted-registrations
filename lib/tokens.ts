/**
 * Design token constants for use in JavaScript/TypeScript contexts —
 * primarily Framer Motion, which needs numeric values rather than CSS strings.
 *
 * CSS custom properties (colors, spacing, radius, shadows) live in
 * app/globals.css as the canonical source. This file exposes only the
 * values that motion code needs at runtime.
 *
 * Do not duplicate color or spacing values here. Reference CSS variables
 * in components via Tailwind utilities or `var(--token-name)` in inline styles.
 */

// ─── Motion durations (seconds — Framer Motion uses seconds, not ms) ─────────
export const DURATION = {
  instant: 0.11, // 110ms — hover states, button press
  fast: 0.2,     // 200ms — nav transition, card hover, small UI changes
  base: 0.3,     // 300ms — standard scroll reveal, section entrances
  slow: 0.5,     // 500ms — hero entrance visual, noise→signal animation
} as const

// ─── Easing curves (cubic-bezier arrays for Framer Motion) ───────────────────
export const EASE = {
  // Primary easing: quick start, soft landing — used for all entrances
  default: [0.16, 1, 0.3, 1] as const,
  // Hover easing: symmetric — used for bidirectional hover in/out transitions
  hover: [0.4, 0, 0.2, 1] as const,
} as const

// ─── Translate distances (px) ────────────────────────────────────────────────
export const TRANSLATE = {
  // Fixed translate-up distance for all scroll reveals and hero entrances.
  // Never varies per element — consistency is the point.
  reveal: 20,
} as const

// ─── Opacity levels ──────────────────────────────────────────────────────────
export const OPACITY = {
  hidden: 0,
  visible: 1,
  // Noise cards in the hero visual: present but clearly subordinate to the signal
  noise: 0.3,
  // Noise cards when the Reframe section is in view: even more receded
  noiseDimmed: 0.1,
} as const

// ─── Stagger delays (seconds) ────────────────────────────────────────────────
export const STAGGER = {
  // Between sibling elements in a StaggerGroup (section label → headline → body → visual)
  children: 0.08,
  // Between hero entrance elements (slightly longer to feel more deliberate)
  hero: 0.12,
} as const

// ─── Hero entrance delays (seconds, relative to page load) ───────────────────
export const HERO_DELAYS = {
  eyebrow: 0,
  headline: 0.12,
  subheadline: 0.22,
  form: 0.32,
  visual: 0.4,
} as const
