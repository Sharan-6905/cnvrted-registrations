/**
 * SectionLabel — uppercase eyebrow label above section headlines.
 * Spec: docs/04-design-system.md §3.2, letter-spacing 0.08em (tracking-label).
 *
 * Always renders as a <p> (not a heading — section labels are not part of the
 * document outline). Screen readers receive the text directly; no aria-hidden.
 *
 * Renders in JetBrains Mono (font-mono) to reinforce the data/signal aesthetic.
 * Color: text-tertiary — intentionally quiet, not competing with the headline.
 */

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={[
        'text-caption font-mono text-text-tertiary',
        'uppercase tracking-label',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </p>
  )
}
