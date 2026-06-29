'use client'

/**
 * Returns true when the element with the given ID has scrolled past the top
 * of the viewport — used to trigger the nav's transparent → solid transition.
 *
 * Implementation follows docs/06-motion.md §5.4:
 *   "Implementation: watch the hero headline element with an Intersection Observer
 *    (threshold: 0); when it leaves the viewport (top edge), add the .scrolled
 *    class to the nav. Do not use a pixel-offset scroll listener."
 *
 * Uses element ID (not a ref) so the Nav can observe an element defined in a
 * separate component tree (the Hero section) without prop drilling or shared state.
 * The element is looked up once after mount; if it doesn't exist on this page
 * (e.g., non-homepage routes), scrolled stays false (nav stays transparent).
 *
 * @param elementId  The id of the DOM element to observe (default: 'hero-headline')
 */

import { useState, useEffect } from 'react'

export function useNavScrolled(elementId: string = 'hero-headline'): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const el = document.getElementById(elementId)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Not intersecting = element has left the viewport = user has scrolled past it
        setScrolled(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [elementId])

  return scrolled
}
