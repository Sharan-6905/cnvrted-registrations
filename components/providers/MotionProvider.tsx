'use client'

/**
 * MotionProvider — reads the user's prefers-reduced-motion OS preference
 * once at the app root and distributes the result via React context.
 *
 * All animated components read from useMotionPreference() rather than
 * independently calling Framer Motion's useReducedMotion or
 * window.matchMedia. This means the preference is checked exactly once,
 * and every component's behavior is consistent.
 *
 * When prefersReducedMotion is true:
 *   - All y/x translate values → 0
 *   - All scale values → 1
 *   - Only opacity transitions remain (acceptable per WCAG 2.1 §2.3.3)
 *   - The noise→signal pulse animation is skipped entirely
 */

import { createContext, useContext, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

const MotionContext = createContext<boolean>(false)

export function MotionProvider({ children }: { children: ReactNode }) {
  // Framer Motion's useReducedMotion reads window.matchMedia('(prefers-reduced-motion: reduce)')
  // Returns null on the server (SSR) and a boolean on the client.
  // We default null → false so the full motion plays on first render;
  // if the user has the preference set, it hydrates to true before the
  // first scroll animation fires.
  const prefersReducedMotion = useReducedMotion() ?? false

  return (
    <MotionContext.Provider value={prefersReducedMotion}>
      {children}
    </MotionContext.Provider>
  )
}

/**
 * Returns true if the user prefers reduced motion.
 * Use this hook in all animation wrapper components.
 */
export function useMotionPreference(): boolean {
  return useContext(MotionContext)
}
