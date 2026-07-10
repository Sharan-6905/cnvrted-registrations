import { NAV } from '@/content/copy'

export function Footer() {
  return (
    <footer
      className="overflow-hidden bg-background"
      role="contentinfo"
    >
      {/* Top bar — legal nav links removed for this deployment; the Privacy/
          Terms/Contact pages don't exist in this trimmed-down codebase. */}
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-20 py-6 border-b border-border">
        <p className="text-caption text-text-tertiary">
          &copy; 2025 {NAV.brand}.
        </p>
      </div>

      {/* Giant half-visible outlined wordmark — cropped to the top ~50% of the
          letterforms. Font-size and container height scale together at a fixed
          ratio (unlike the original clamp values, which mismatched across
          breakpoints and made the crop look broken/illegible on mobile) so the
          same clean half-crop appears at every viewport width. */}
      <div
        className="relative w-full overflow-hidden select-none pointer-events-none"
        aria-hidden="true"
        style={{ height: 'clamp(60px, 11vw, 160px)' }}
      >
        <p
          className="absolute left-1/2 whitespace-nowrap font-sans font-bold leading-none"
          style={{
            fontSize: 'clamp(120px, 22vw, 320px)',
            letterSpacing: '-0.03em',
            top: 0,
            transform: 'translateX(-50%)',
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(0,0,0,0.22)',
          }}
        >
          {NAV.brand}
        </p>
      </div>
    </footer>
  )
}
