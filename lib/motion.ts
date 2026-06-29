/**
 * All Framer Motion animation variants, centrally defined.
 *
 * Components import and apply these — they do not define their own variants.
 * This ensures every animation on the site uses the same timing, easing,
 * and distance values from lib/tokens.ts.
 *
 * When prefersReducedMotion is true (managed by MotionProvider), all
 * y/scale values collapse to 0/1 and only opacity transitions remain.
 * This is handled by the motion wrapper components (FadeInUp, StaggerGroup,
 * HeroEntrance), not by individual variants — so the variants here always
 * define the full motion; the wrappers decide whether to apply it.
 */

import type { Variants } from 'framer-motion'
import { DURATION, EASE, TRANSLATE, OPACITY, STAGGER } from './tokens'

// ─── Standard scroll reveal ──────────────────────────────────────────────────
// Used by FadeInUp wrapper and as children of StaggerGroup.
export const fadeInUp: Variants = {
  hidden: {
    opacity: OPACITY.hidden,
    y: TRANSLATE.reveal,
  },
  visible: {
    opacity: OPACITY.visible,
    y: 0,
    transition: {
      duration: DURATION.base,
      ease: EASE.default,
    },
  },
}

// Opacity-only variant — used when prefersReducedMotion is true.
// Applied by wrapper components; same timing, no movement.
export const fadeIn: Variants = {
  hidden: { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.visible,
    transition: {
      duration: DURATION.base,
      ease: EASE.default,
    },
  },
}

// ─── Stagger container ───────────────────────────────────────────────────────
// Parent variant for StaggerGroup. Children use fadeInUp (or fadeIn if reduced motion).
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.children,
    },
  },
}

// ─── Hero entrance orchestrator ──────────────────────────────────────────────
// Applied to the HeroEntrance wrapper. Children receive delays from HERO_DELAYS
// in tokens.ts (applied as delayChildren or per-child delay props in the component).
export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.hero,
    },
  },
}

// Hero visual (signal card column) — fade only, no translate.
// The visual is already in its final position at load; movement would look like falling.
export const heroVisual: Variants = {
  hidden: { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.visible,
    transition: {
      duration: DURATION.slow,
      delay: 0.4,
      ease: EASE.default,
    },
  },
}

// ─── Noise cards (hero visual) ───────────────────────────────────────────────
// Initial state: 30% opacity (noise — present but subordinate)
export const noiseCard: Variants = {
  hidden: { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.noise, // 0.3 — never fully visible
    transition: {
      duration: DURATION.slow,
      ease: EASE.default,
    },
  },
  // Applied when Reframe section enters viewport
  dimmed: {
    opacity: OPACITY.noiseDimmed, // 0.1
    transition: {
      duration: DURATION.base,
      ease: EASE.hover,
    },
  },
}

// Signal card in the hero visual — starts hidden, reveals at full opacity
export const signalCard: Variants = {
  hidden: { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.visible,
    transition: {
      duration: DURATION.slow,
      delay: 0.15, // Appears slightly after noise cards to feel like it emerges from them
      ease: EASE.default,
    },
  },
}

// ─── Noise → signal pulse ────────────────────────────────────────────────────
// One-time pulse on the signal card when the Reframe section enters view.
// Does NOT loop. Executes once: scale up → scale back to rest.
export const signalPulse: Variants = {
  rest: { scale: 1 },
  pulse: {
    scale: 1.02,
    transition: { duration: DURATION.base, ease: EASE.hover },
  },
  back: {
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE.hover },
  },
}

// ─── Card entrance ───────────────────────────────────────────────────────────
// Used by SignalCard components. After the card body fades in, accent elements
// (tag and badge) fade in 80ms later — handled via delay in the component.
export const cardEntrance: Variants = {
  hidden: {
    opacity: OPACITY.hidden,
    y: TRANSLATE.reveal,
  },
  visible: {
    opacity: OPACITY.visible,
    y: 0,
    transition: {
      duration: DURATION.base,
      ease: EASE.default,
    },
  },
}

export const accentElementEntrance: Variants = {
  hidden: { opacity: OPACITY.hidden },
  visible: {
    opacity: OPACITY.visible,
    transition: {
      duration: DURATION.base,
      delay: 0.08, // 80ms after the card body
      ease: EASE.default,
    },
  },
}

// ─── Mobile menu ─────────────────────────────────────────────────────────────
export const mobileMenuOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.fast, ease: EASE.hover },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.fast, ease: EASE.hover },
  },
}

// ─── Form success state ──────────────────────────────────────────────────────
export const formSuccess: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.default },
  },
}
