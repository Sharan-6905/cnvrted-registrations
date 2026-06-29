'use client'

/**
 * Reads the user's reduced-motion preference from MotionProvider context.
 *
 * This hook is the single access point for motion preference across the
 * entire application. All animated components must call this hook and
 * adjust their behavior when it returns true — no component should
 * independently check window.matchMedia or Framer Motion's
 * useReducedMotion directly.
 *
 * When true:
 *   - All translate/scale values → 0/1 (no movement)
 *   - Opacity transitions remain (fades are acceptable per WCAG)
 *   - The noise→signal pulse is skipped entirely
 *   - Duration values stay the same
 */

import { useMotionPreference } from '@/components/providers/MotionProvider'

export function useReducedMotion(): boolean {
  return useMotionPreference()
}
