'use client'

/**
 * Interactive motion demos for the design system showcase.
 * Client components — isolated here so page.tsx stays a Server Component.
 * Each demo has a "Replay ↺" button that remounts the animated element
 * by changing a React key, resetting Framer Motion's whileInView state.
 */

import { useState } from 'react'
import { FadeInUp } from '@/components/motion/FadeInUp'
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup'
import { Tag } from '@/components/ui/Tag'
import { Badge } from '@/components/ui/Badge'
import { SIGNAL_EXAMPLES } from '@/content/copy'

function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        'inline-flex items-center gap-xs',
        'text-caption font-mono text-accent',
        'hover:text-accent-hover transition-colors duration-[110ms]',
        'rounded-md px-md py-xs',
        'border border-accent-dim hover:border-accent bg-accent-dim hover:bg-accent-dim',
      ].join(' ')}
    >
      Replay ↺
    </button>
  )
}

export function FadeInUpDemo() {
  const [key, setKey] = useState(0)

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption font-mono text-text-tertiary uppercase tracking-label">
            FadeInUp
          </p>
          <p className="text-caption text-text-secondary mt-xs">
            opacity 0→1 · translateY 20px→0 · 300ms · ease-out-expo
          </p>
        </div>
        <ReplayButton onClick={() => setKey((k) => k + 1)} />
      </div>

      <FadeInUp key={key} amount={0}>
        <div className="rounded-card border border-border bg-surface-raised shadow-card py-5 px-6">
          <p className="text-h3 text-text-primary mb-sm">
            Signal detected. Account surfaced.
          </p>
          <p className="text-body text-text-secondary">
            This element fades in from 0% opacity and 20px below its final
            position, arriving over 300ms with an ease-out-expo curve.
          </p>
        </div>
      </FadeInUp>
    </div>
  )
}

export function StaggerGroupDemo() {
  const [key, setKey] = useState(0)

  return (
    <div className="flex flex-col gap-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caption font-mono text-text-tertiary uppercase tracking-label">
            StaggerGroup
          </p>
          <p className="text-caption text-text-secondary mt-xs">
            children stagger · 80ms between each · same fadeInUp per child
          </p>
        </div>
        <ReplayButton onClick={() => setKey((k) => k + 1)} />
      </div>

      <StaggerGroup key={key} amount={0} className="flex flex-col gap-lg">
        {SIGNAL_EXAMPLES.cards.map((card) => (
          <StaggerItem key={card.tag}>
            <div className="rounded-card border border-border bg-surface-raised shadow-card py-4 px-6 flex items-center justify-between gap-lg">
              <Tag type={card.tag} />
              <p className="text-body text-text-secondary flex-1 min-w-0 truncate">
                {card.signalText}
              </p>
              <Badge level={card.intent} />
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  )
}
