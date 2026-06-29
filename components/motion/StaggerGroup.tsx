'use client'

/**
 * StaggerGroup + StaggerItem — scroll-triggered stagger container.
 * Spec: docs/06-motion.md §4.2.
 *
 * StaggerGroup is the parent: sets up the stagger timing and IntersectionObserver.
 * StaggerItem wraps each child that should animate in sequence.
 *
 * Usage:
 *   import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
 *
 *   <StaggerGroup>
 *     <StaggerItem>...</StaggerItem>
 *     <StaggerItem>...</StaggerItem>
 *   </StaggerGroup>
 *
 * Stagger order: DOM order (authors control visual sequence via markup).
 * 80ms between each child (STAGGER.children from lib/tokens.ts).
 *
 * Reduced motion: stagger container still fires (sequencing is not motion), but
 * each StaggerItem uses fadeIn (opacity only, no translate) instead of fadeInUp.
 *
 * Note: compound component patterns (StaggerGroup.Item = ...) are not reliably
 * resolved by Turbopack's static generation workers in Next.js 16. Named exports
 * are used instead.
 */

import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp, fadeIn } from '@/lib/motion'
import { useMotionPreference } from '@/components/providers/MotionProvider'

interface StaggerGroupProps {
  children: React.ReactNode
  className?: string
  /** Fraction of the container that must be visible before the stagger fires. */
  amount?: number
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function StaggerGroup({ children, className, amount = 0.2 }: StaggerGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reducedMotion = useMotionPreference()
  const variant = reducedMotion ? fadeIn : fadeInUp

  return (
    <motion.div variants={variant} className={className}>
      {children}
    </motion.div>
  )
}
