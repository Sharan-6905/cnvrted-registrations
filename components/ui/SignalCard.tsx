'use client'

/**
 * SignalCard — the primary product UI element.
 * Spec: docs/04-design-system.md §8.3.
 *
 * Structure (top to bottom):
 *   [HIRING tag]          Illustrative example
 *   Signal text (body, text-primary)
 *   ─── 1px rule ───────────────────────────
 *   → Implication text (body, text-secondary)
 *                                [HIGH INTENT]
 *
 * Variants:
 *   'default'  — full opacity, interactive hover lift
 *   'noise'    — 30% opacity (hero background cards — always present, never prominent)
 *   'dimmed'   — 10% opacity (noise cards when Reframe section enters viewport)
 *
 * animateOn:
 *   'scroll' — uses whileInView (default for Signal Examples section)
 *   'mount'  — animates immediately (for hero visual)
 *   'none'   — no entrance animation (design system showcase, or when pre-visible)
 */

import { motion } from 'framer-motion'
import { Tag } from './Tag'
import { Badge } from './Badge'
import { UI } from '@/content/copy'
import { cardEntrance, accentElementEntrance } from '@/lib/motion'
import { useMotionPreference } from '@/components/providers/MotionProvider'
import type { SignalCardCopy } from '@/content/copy'
import { DURATION, EASE } from '@/lib/tokens'

interface SignalCardProps {
  card: SignalCardCopy
  variant?: 'default' | 'noise' | 'dimmed'
  animateOn?: 'scroll' | 'mount' | 'none'
  /** Force hover appearance (for design system showcase) */
  forceHover?: boolean
  className?: string
}

export function SignalCard({
  card,
  variant = 'default',
  animateOn = 'scroll',
  forceHover = false,
  className = '',
}: SignalCardProps) {
  const reducedMotion = useMotionPreference()
  const isInteractive = variant === 'default' && !forceHover

  const opacity = variant === 'noise' ? 0.3 : variant === 'dimmed' ? 0.1 : 1

  const hoverAnimation =
    isInteractive && !reducedMotion
      ? {
          y: -2,
          boxShadow: '0px 6px 20px rgba(0,0,0,0.10)',
          transition: { duration: DURATION.fast, ease: EASE.hover },
        }
      : undefined

  const forcedHoverStyle = forceHover
    ? { transform: 'translateY(-2px)', boxShadow: '0px 6px 20px rgba(0,0,0,0.10)' }
    : undefined

  const entranceVariants = animateOn !== 'none' ? cardEntrance : undefined
  const accentVariants = animateOn !== 'none' ? accentElementEntrance : undefined

  const motionProps =
    animateOn === 'scroll'
      ? {
          initial: 'hidden' as const,
          whileInView: 'visible' as const,
          viewport: { once: true, amount: 0.2 as const },
        }
      : animateOn === 'mount'
      ? { initial: 'hidden' as const, animate: 'visible' as const }
      : { initial: false as const }

  return (
    <motion.article
      {...motionProps}
      variants={entranceVariants}
      whileHover={hoverAnimation}
      style={{ opacity, ...forcedHoverStyle }}
      aria-hidden={variant !== 'default'}
      className={[
        'rounded-card border border-border bg-surface-raised shadow-card',
        'py-5 px-6',
        'flex flex-col gap-md',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Top row: signal-type tag (left) + illustrative label (right) */}
      <div className="flex items-center justify-between gap-sm">
        <motion.div variants={accentVariants}>
          <Tag type={card.tag} />
        </motion.div>
        <span className="text-caption text-text-tertiary shrink-0">
          {UI.illustrativeLabel}
        </span>
      </div>

      {/* Signal text */}
      <p className="text-body text-text-primary">{card.signalText}</p>

      {/* 1px horizontal rule */}
      <hr className="border-0 border-t border-border m-0" />

      {/* Implication (left) + intent badge (bottom-right) */}
      <div className="flex items-end justify-between gap-sm">
        <p className="text-body text-text-secondary flex-1">
          → {card.implication}
        </p>
        <motion.div variants={accentVariants} className="shrink-0">
          <Badge level={card.intent} />
        </motion.div>
      </div>
    </motion.article>
  )
}
