import type { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react'

/**
 * Container — max-width + horizontal margin wrapper used by every section.
 *
 * Enforces the layout grid from docs/04-design-system.md §4.2:
 *   - Max content width: 1280px
 *   - Outer horizontal margin: 80px desktop → 24px mobile
 *   - Centered: mx-auto
 *
 * The `as` prop allows rendering as any HTML element (div, section, header, footer, nav)
 * so the Container itself doesn't impose incorrect semantic structure.
 *
 * Usage:
 *   <Container>...</Container>                          renders a <div>
 *   <Container as="section" id="hero">...</Container>  renders a <section>
 *   <Container as="nav" aria-label="...">...</Container>
 */

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className = '',
  ...rest
}: ContainerProps<T>) {
  const Tag = (as ?? 'div') as ElementType

  return (
    <Tag
      className={[
        'mx-auto',
        'w-full',
        'max-w-[1280px]',
        // Horizontal padding: 80px (5rem) on desktop, 24px (1.5rem) on mobile
        'px-6',        // mobile: 24px
        'md:px-10',    // ≥768px: 40px (intermediate)
        'lg:px-20',    // ≥1024px: 80px (full desktop spec)
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...(rest as object)}
    >
      {children}
    </Tag>
  )
}
