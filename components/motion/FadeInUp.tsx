'use client'

/**
 * FadeInUp — scroll-triggered reveal wrapper.
 * Spec: docs/06-motion.md §4.1.
 *
 * Motion:   opacity 0→1, translateY 20px→0
 * Duration: motion-base (300ms)
 * Easing:   cubic-bezier(0.16, 1, 0.3, 1) — ease-out-expo
 * Trigger:  Intersection Observer via Framer Motion whileInView,
 *           threshold 0.2 (fires when 20% of element is visible)
 * Once:     true — does not re-animate on scroll back up
 *
 * Reduced motion: when useMotionPreference() returns true, the translate
 * is removed and only the opacity fade plays (acceptable per WCAG 2.1 §2.3.3).
 *
 * Content is rendered at its final position by default (initial={{ opacity: 1 }}
 * is NOT set — we let Framer Motion manage the initial state). If JS fails to
 * hydrate, the element remains at opacity: 0. For a pre-launch marketing site
 * this is acceptable; for critical above-fold content the Hero section uses a
 * different entrance mechanism that doesn't require IntersectionObserver.
 */

import { motion } from 'framer-motion'
import { fadeInUp, fadeIn } from '@/lib/motion'
import { useMotionPreference } from '@/components/providers/MotionProvider'

interface FadeInUpProps {
  children: React.ReactNode
  className?: string
  /** Override the viewport amount (default: 0.2). Use 0 for tall elements. */
  amount?: number
  /** Additional delay in seconds on top of the variant's own delay */
  delay?: number
}

export function FadeInUp({
  children,
  className,
  amount = 0.2,
  delay,
}: FadeInUpProps) {
  const reducedMotion = useMotionPreference()
  const variant = reducedMotion ? fadeIn : fadeInUp

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={
        delay
          ? {
              hidden: variant.hidden,
              visible: {
                ...variant.visible,
                transition: {
                  ...(variant.visible as { transition?: object }).transition,
                  delay,
                },
              },
            }
          : variant
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}
