'use client'

/**
 * Nav — fixed site-wide navigation bar.
 *
 * Simplified for this registration-only subdomain: no nav links, no
 * hamburger/mobile-menu (nothing left to put in it once NAV.links is
 * empty) — just the wordmark and a persistent "Join our Slack" link,
 * visible at every viewport width.
 *
 * Scroll behaviour: watches #hero-headline via useNavScrolled; falls back
 * to a translucent state on routes (like this one) that don't have that id.
 */

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useNavScrolled } from '@/lib/hooks/useNavScrolled'
import { NAV } from '@/content/copy'

export function Nav() {
  const scrolled = useNavScrolled('hero-headline')
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 60) { setVisible(true); lastScrollY.current = y; return }
      setVisible(y < lastScrollY.current)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      role="banner"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-120%)', transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)' }}
      className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <div
        className={[
          'pointer-events-auto flex items-center justify-between gap-xl',
          'h-12 px-5 rounded-full',
          'transition-[background-color,border-color,box-shadow] duration-[200ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
          'border',
          scrolled
            ? 'bg-background border-border shadow-sm'
            : 'bg-background/80 border-border/60 backdrop-blur-sm',
        ].join(' ')}
        style={{ minWidth: 0, maxWidth: 1000, width: '100%', margin: '0 auto' }}
      >

        {/* ── Wordmark ─────────────────────────────────────────────────── */}
        <Link
          href="/"
          aria-label="CNVRTED — return to homepage"
          className={[
            'text-h3 text-text-primary shrink-0 leading-none',
            'focus-visible:outline-none rounded-sm',
            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
          ].join(' ')}
        >
          {NAV.brand}
        </Link>

        {/* ── Join our Slack — visible at every viewport width ───────────── */}
        <a
          href="https://join.slack.com/t/cnvrted/shared_invite/zt-4388qsrbr-x~RlkFSChnmWY7JojhV1fA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-body text-text-secondary hover:text-text-primary transition-colors duration-[110ms] border border-border rounded-full px-4 py-1.5 hover:border-text-secondary shrink-0"
        >
          {/* Slack icon (inline, 4-color) */}
          <svg viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: 16, height: 16, display: 'block', flexShrink: 0 }}>
            <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"/>
            <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"/>
            <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"/>
            <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.249m14.336 0v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"/>
          </svg>
          Join our Slack
        </a>

      </div>
    </header>
  )
}
