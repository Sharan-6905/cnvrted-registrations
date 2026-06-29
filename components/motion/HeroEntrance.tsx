'use client'

/**
 * HeroEntrance + HeroItem — mount-triggered entrance animation for the hero section.
 * Spec: docs/06-motion.md §3.
 *
 * Unlike FadeInUp (scroll-triggered via whileInView), the hero entrance fires
 * on initial page load via the `animate` prop — the user sees it immediately,
 * without needing to scroll. This is intentional: the hero is always above the
 * fold and should feel like the page "arrives" rather than the content "revealing."
 *
 * Sequence (from docs/06-motion.md §3, committed delays):
 *   Eyebrow:            0ms   — fadeInUp (300ms)
 *   Headline:         120ms   — fadeInUp (300ms)  → use delay={HERO_DELAYS.headline}
 *   Subheadline:      220ms   — fadeInUp (300ms)  → use delay={HERO_DELAYS.subheadline}
 *   CTA / microcopy:  320ms   — fadeInUp (300ms)  → use delay={HERO_DELAYS.form}
 *   Hero visual:      400ms   — fade only (500ms) → use delay={HERO_DELAYS.visual} fadeOnly
 *
 * HeroEntrance is a thin context provider for the animate state — it doesn't
 * wrap children in a stagger container because per-child delays are asymmetric
 * (0 / 120 / 220 / 320 / 400ms). Each HeroItem applies its own delay.
 *
 * Reduced motion (useMotionPreference() → true):
 *   All HeroItem components use fadeIn (opacity only, no translate),
 *   keeping the page feeling responsive without movement.
 *
 * D4 fix note: prior draft used heroContainer stagger (uniform 120ms gaps).
 *   The documented delays are: 0 / 120 / 220 / 320 / 400ms — variable gaps
 *   (120ms → 100ms → 100ms → 80ms, decelerating). Each HeroItem uses an
 *   explicit delay from HERO_DELAYS rather than relying on stagger propagation.
 *
 * Usage:
 *   <HeroEntrance>
 *     <HeroItem delay={HERO_DELAYS.eyebrow}>
 *       <SectionLabel>...</SectionLabel>
 *     </HeroItem>
 *     <HeroItem delay={HERO_DELAYS.headline}>
 *       <h1 id="hero-headline">...</h1>
 *     </HeroItem>
 *     <HeroItem delay={HERO_DELAYS.subheadline}>...</HeroItem>
 *     <HeroItem delay={HERO_DELAYS.form}>...</HeroItem>
 *     <HeroItem delay={HERO_DELAYS.visual} fadeOnly>...</HeroItem>
 *   </HeroEntrance>
 */

import { motion } from 'framer-motion'
import { fadeInUp, fadeIn } from '@/lib/motion'
import { useMotionPreference } from '@/components/providers/MotionProvider'
import { DURATION, EASE } from '@/lib/tokens'

// ─── HeroEntrance (container) ────────────────────────────────────────────────

interface HeroEntranceProps {
  children: React.ReactNode
  className?: string
}

/**
 * Wrapper that signals mount-time (not scroll-time) to its HeroItem children.
 * Renders as a plain div — the animation logic lives in HeroItem.
 */
export function HeroEntrance({ children, className }: HeroEntranceProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// ─── HeroItem ────────────────────────────────────────────────────────────────

interface HeroItemProps {
  children: React.ReactNode
  /**
   * Delay in seconds from page load. Use HERO_DELAYS constants from lib/tokens.ts.
   *   HERO_DELAYS.eyebrow    = 0s
   *   HERO_DELAYS.headline   = 0.12s
   *   HERO_DELAYS.subheadline = 0.22s
   *   HERO_DELAYS.form       = 0.32s
   *   HERO_DELAYS.visual     = 0.4s
   */
  delay: number
  /**
   * When true, uses fade-only (no translate). Required for the hero visual:
   *   "Fade in only (no translate — the visual is already in its final position,
   *    and moving it would feel like it's falling into place)" — docs/06-motion.md §3
   */
  fadeOnly?: boolean
  className?: string
}

export function HeroItem({
  children,
  delay,
  fadeOnly = false,
  className,
}: HeroItemProps) {
  const reducedMotion = useMotionPreference()

  // Both reduced-motion and fadeOnly collapse to opacity-only transition
  const shouldFadeOnly = reducedMotion || fadeOnly

  const hiddenState = shouldFadeOnly
    ? { opacity: 0 }
    : { opacity: 0, y: 20 }

  const visibleState = {
    opacity: 1,
    ...(shouldFadeOnly ? {} : { y: 0 }),
    transition: {
      duration: fadeOnly ? DURATION.slow : DURATION.base,
      delay,
      ease: EASE.default,
    },
  }

  return (
    <motion.div
      initial={hiddenState}
      animate={visibleState}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Re-export tokens for convenience ────────────────────────────────────────
// HeroSection imports HERO_DELAYS from lib/tokens — not from here.
// This comment exists to direct future authors to the right import path.
// import { HERO_DELAYS } from '@/lib/tokens'
