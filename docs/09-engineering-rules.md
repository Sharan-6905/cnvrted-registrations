# 09 — Engineering Rules

> Implementation-level guidance for whoever builds this site. This document does not contain code — per the project brief, no React or other code is generated as part of this documentation set. Instead, it defines the technical constraints, conventions, and quality bar the eventual build should meet, so that engineering decisions stay consistent with everything defined in `04-design-system.md`, `06-motion.md`, and `08-ui-principles.md`.

---

## 1. Recommended Stack Direction (Guidance, Not Mandate)

Given the brand's technical, modern personality and the project's likely comparison points (Linear, Clay, Cognism — all built on modern web stacks), the following direction is recommended:

- **Framework:** A modern React-based framework with strong static/SSR rendering support (e.g., Next.js) — appropriate for a marketing site that needs to be fast, SEO-friendly, and easy to iterate on.
- **Styling approach:** A utility-first or design-token-driven CSS approach (e.g., Tailwind CSS configured against the exact tokens defined in `04-design-system.md`, or CSS-in-JS with a shared theme object) — the goal is that the design tokens (`color-accent`, `motion-base`, spacing scale, etc.) exist as single-source-of-truth variables referenced everywhere, never hardcoded inline in multiple places.
- **Animation library:** A production-grade animation library capable of scroll-triggered reveals and respecting reduced-motion preferences out of the box (e.g., Framer Motion or GSAP) rather than hand-rolled scroll-listener animation logic, which tends to be janky and hard to maintain.
- **Hosting:** A modern edge/static-hosting platform (e.g., Vercel) suited to a marketing site that should load instantly globally.

**This section is directional guidance for planning purposes, not a locked technical decision** — the actual build phase should confirm stack choices based on team familiarity and constraints at that time.

---

## 2. Design Token Implementation

Every value defined in `04-design-system.md` should exist as a **named token**, not a magic value scattered through code:

- Colors: `color-background`, `color-accent`, `color-text-primary`, etc. — implemented as CSS custom properties or a theme config, never as raw hex codes typed directly into component styles.
- Spacing: The 8px-based scale from `04-design-system.md` §4.1 implemented as a spacing scale (e.g., Tailwind's spacing config, or a shared `spacing.ts` token file) — never arbitrary pixel values like `padding: 37px`.
- Typography: Type scale tokens (`display`, `h1`, `h2`, etc. from `04-design-system.md` §3.2) implemented as reusable text style definitions, not repeated font-size/line-height combinations inline.
- Motion: Duration and easing tokens from `06-motion.md` §2 implemented as shared constants (`motionFast = 200ms`, the shared easing curve) — never inline magic numbers per animation.

**Why this matters beyond tidiness:** A token-based system is what makes the design system in `04-design-system.md` actually enforceable over time. Without it, "one accent color" and "consistent spacing rhythm" silently drift as different people touch the code.

---

## 3. Performance Requirements

Translating `08-ui-principles.md` §6 into concrete engineering targets:

- **Largest Contentful Paint (LCP):** < 2.5s on throttled mobile (Lighthouse mobile, simulated throttling).
- **Cumulative Layout Shift (CLS):** < 0.1 — achieved via explicit image dimensions, font-loading strategy (e.g., `font-display: optional` or preloaded critical fonts with fallback metrics matched), and no dynamically-injected above-the-fold content that shifts layout.
- **Total JavaScript payload:** Keep the initial bundle lean — this is a marketing site, not an app; avoid pulling in heavy component libraries or animation engines beyond what's actually used. Code-split anything below the fold that isn't needed for first paint.
- **Images:** Serve modern formats (WebP/AVIF with fallback), responsive `srcset`/`sizes` so mobile devices don't download desktop-resolution assets, and lazy-load any imagery below the first viewport.
- **Fonts:** Self-host or use a performant font-loading strategy (e.g., `next/font` if using Next.js) rather than blocking render on a third-party font CDN request. Limit to the minimum number of font weights actually used (per `04-design-system.md` §3.1's "headline weight ceiling: 600" — likely only 2–3 weights total needed: a regular/400, a medium/500, and a semibold/600).

---

## 4. Animation Implementation Rules

Direct implementation translation of `06-motion.md`:

- **Respect `prefers-reduced-motion` at the system level**, not per-component. Implement a single shared hook/utility (e.g., `useReducedMotion()`) that all animated components check, rather than each developer remembering to add the media query individually — consistency here is an architecture decision, not a per-component habit.
- **Scroll-triggered reveals** should use an Intersection Observer–based approach (native or via the chosen animation library), not scroll-event-listener polling — Intersection Observer is more performant and avoids jank, directly serving the "no jank" rule in `08-ui-principles.md` §6.
- **Animations must not block interactivity.** A user should be able to click the CTA button immediately, even mid-scroll-animation elsewhere on the page — no animation should ever attach a blocking event handler or freeze the main thread.
- **Test all motion against the actual timing tokens** in `06-motion.md` §2 — don't let "feels about right" replace the defined duration scale; consistency across the site depends on actually using the shared values.

---

## 5. Accessibility Implementation Checklist

Direct implementation translation of `08-ui-principles.md` §5:

- [ ] Semantic landmarks present: `<nav>`, `<main>`, `<footer>`, proper `<h1>`–`<h3>` hierarchy (one `<h1>` per page, used for the hero headline).
- [ ] All interactive elements are real `<button>`/`<a>` elements, not `<div onClick>` — this alone resolves most keyboard and screen-reader issues automatically.
- [ ] Focus-visible styles implemented and never removed without replacement.
- [ ] Form inputs have associated, visible `<label>` elements (using `htmlFor`/`id` pairing, or wrapping).
- [ ] Color contrast checked programmatically (e.g., via an automated Lighthouse/axe accessibility audit in CI) against the actual implemented colors, not just the documented hex values — implementation can introduce drift (opacity layering, gradients) that changes effective contrast.
- [ ] Alt text present and meaningful for any image conveying information; empty `alt=""` for purely decorative images.
- [ ] Run an automated accessibility audit (axe-core, Lighthouse) as part of the build/CI process, not just as a manual one-time check.

---

## 6. Responsive Implementation

- Build mobile-first in code (base styles target mobile, breakpoint overrides scale up), even though design conception in `08-ui-principles.md` is content-driven rather than device-first — mobile-first CSS is simply the more maintainable implementation default regardless of design process.
- Use the breakpoint values defined in `08-ui-principles.md` §3.1 as shared, named breakpoint tokens (not magic numbers repeated in every media query).
- Test real devices/viewport sizes, not just browser dev-tool resizing, before considering responsive work complete — particularly for touch-target sizing (minimum ~44×44px tappable area) on mobile CTAs and nav elements.

---

## 7. Content & Copy Implementation

- **Copy should live in a single, structured source** (e.g., a content/copy config file or CMS-like structure) rather than hardcoded directly and redundantly across components — this makes it possible to update copy against `03-copywriting.md` without hunting through component code, and makes future localization or A/B testing far easier if ever needed.
- **The "illustrative example" labeling requirement** (`03-copywriting.md` §7) should be implemented as a reusable component/pattern (e.g., a small `<ExampleLabel />` badge) applied consistently to every signal-card example — not manually re-typed as a string in each instance, which invites inconsistency or accidental omission.

---

## 8. SEO & Metadata Baseline

Not explicitly covered elsewhere, but a standard requirement for any production marketing site:

- Proper `<title>` and meta description reflecting the positioning statement (`01-brand.md` §1) — concise, accurate, no keyword-stuffing.
- Open Graph / Twitter Card metadata for clean link previews when the site is shared (especially relevant for a waitlist-driven launch likely to be shared on LinkedIn/X by early supporters).
- A single canonical URL structure; avoid duplicate-content issues from trailing-slash or www/non-www inconsistencies.
- `sitemap.xml` and `robots.txt` present, even for a small single-page-feeling site — trivial to implement, easy to forget.

---

## 9. Form Submission & Data Handling (Waitlist)

- Waitlist email submissions should be validated both client-side (immediate feedback per `08-ui-principles.md` §4.1) and server-side (never trust client validation alone).
- Store submitted emails securely and use them only for the stated purpose (launch notification) — the confirmation microcopy ("No spam. Just access when we launch.") in `05-homepage.md` §9 is a commitment the implementation must actually honor, not just a copy line.
- Consider basic spam/bot protection (e.g., honeypot field or lightweight challenge) given public-facing forms are a common spam target — but avoid visible CAPTCHAs if possible, since they add friction inconsistent with the minimal-friction goal in `00-product.md` §6.

---

## 10. Code Quality & Maintainability Baseline

- Component structure should mirror the section structure in `05-homepage.md` — one clearly-named component per homepage section (e.g., `HeroSection`, `ReframeSection`, `HowItWorksSection`) rather than one monolithic page file, so future copy or design updates can be made section-by-section without risk of breaking unrelated parts of the page.
- Shared design tokens (§2 above) should be the single source of truth consumed by every component — no component should define its own one-off color or spacing value that isn't traceable back to `04-design-system.md`.
- Document any deliberate deviation from this documentation set directly in code comments at the point of deviation, so future contributors understand *why* a real implementation differs from the spec, rather than assuming the spec is simply out of date.

---

## 11. What This Document Intentionally Does Not Cover

Per the project brief's explicit instruction, this documentation set contains no React code, no component implementations, and no actual configuration files. This document defines *rules and constraints* for the engineering phase — the actual build (components, styling implementation, animation code) is a separate, subsequent phase of work that should reference this entire `/docs` folder as its specification.
