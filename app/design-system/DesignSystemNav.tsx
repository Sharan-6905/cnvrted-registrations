'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'typography',     label: 'Typography' },
  { id: 'colors',         label: 'Colors' },
  { id: 'buttons',        label: 'Buttons' },
  { id: 'tags',           label: 'Tags & Badges' },
  { id: 'section-labels', label: 'Section Labels' },
  { id: 'signal-card',    label: 'Signal Card' },
  { id: 'motion',         label: 'Motion' },
  { id: 'spacing',        label: 'Spacing' },
  { id: 'theme',          label: 'Theme' },
]

export function DesignSystemNav() {
  const [active, setActive] = useState('typography')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        // Fire when section top hits 25% down from viewport top
        { rootMargin: '-25% 0% -65% 0%', threshold: 0 },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav aria-label="Design system sections">
      <ul className="flex flex-col" role="list">
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={[
                  'flex items-center gap-sm py-[7px] px-md rounded-md text-body',
                  'transition-colors duration-[110ms] select-none',
                  isActive
                    ? 'text-accent bg-accent-dim font-medium'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface',
                ].join(' ')}
              >
                {isActive && (
                  <span
                    className="block w-[3px] h-[14px] rounded-full bg-accent shrink-0"
                    aria-hidden="true"
                  />
                )}
                {label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
