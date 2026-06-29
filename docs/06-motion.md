# 06 — Motion & Interaction Design

> Defines how the site moves. Motion is one of the highest-risk areas for drifting into "generic AI startup" territory — this document exists to keep motion purposeful, restrained, and in service of the brand personality defined in `01-brand.md`, particularly the **Fast** and **Minimal** traits.
>
> **Revision note:** Typewriter text is now fully disqualified (no exceptions — prior draft hedged by suggesting it might be used on the hero headline). Hero entrance sequence defined. Nav transition trigger specified precisely. Stagger order within sections defined. Noise → signal visual spec consolidated here (prior draft had conflicting descriptions across this file and `05-homepage.md`; `05-homepage.md` is now the visual spec; this file is the motion spec for that visual).

---

## 1. Motion Philosophy

**Motion should clarify, never decorate.** Every animation on the site should answer one of three questions for the user:
1. *Where did that come from?* (origin/transition clarity)
2. *What just changed?* (state feedback)
3. *What should I look at next?* (attention guidance)

If a piece of motion doesn't answer one of these three questions, it shouldn't exist. This is the single governing rule for every decision in this document.

**Motion should feel fast, not busy.** Per the brand's "Fast" trait (`01-brand.md` §2), speed is communicated through quick, decisive motion — not through having a lot of things moving at once. A page with one element animating crisply feels faster than a page with ten elements animating slowly and simultaneously.

---

## 2. Timing & Easing

### 2.1 Duration Scale (Committed Values)

| Token | Duration | Usage |
|---|---|---|
| `motion-instant` | `110ms` | Hover states, button press feedback |
| `motion-fast` | `200ms` | Nav scroll transition, card hover lift, small UI state changes |
| `motion-base` | `300ms` | Standard scroll-reveal entrance (opacity + translate) |
| `motion-slow` | `500ms` | Hero entrance sequence, noise→signal visual |

**Rule:** Nothing animates slower than `500ms` on this site. `1s+` animations read as sluggish regardless of easing and undercut the "Fast" brand trait directly.

### 2.2 Easing

- **Default easing for all scroll-reveals and entrances:** `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo). Quick start, soft landing. Feels immediate and confident.
- **Default easing for hover and state changes:** `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out). Slightly more symmetric for bidirectional transitions (hover in / hover out).
- **No bounce or elastic easing.** Playful/toylike — inconsistent with the premium, technical personality.
- **No linear easing for user-facing motion.** Linear reads as mechanical.

---

## 3. Hero Entrance Sequence

The hero is the first thing a visitor sees. This is the most important motion moment on the site. It is also the most likely to be over-engineered. The spec below is deliberately simple.

**Sequence (all triggered on initial page load, not scroll):**

| Element | Delay | Duration | Motion |
|---|---|---|---|
| Eyebrow label | `0ms` | `motion-base` (300ms) | Fade in, translate up 20px |
| Headline | `120ms` | `motion-base` (300ms) | Fade in, translate up 20px |
| Subheadline | `220ms` | `motion-base` (300ms) | Fade in, translate up 20px |
| CTA button + microcopy | `320ms` | `motion-base` (300ms) | Fade in, translate up 20px |
| Hero visual (signal card column) | `400ms` | `motion-slow` (500ms) | Fade in only (no translate — the visual is already in its final position, and moving it would feel like it's falling into place) |

**Total entrance duration:** approximately 900ms from page load to fully visible. Fast enough to feel instant; staggered enough to feel crafted.

**Rule:** Every element fades in from `opacity: 0`. No slide-in from left or right. No scale-from-zero. Translate-up on the text elements only (not the visual). The hero entrance is a sequence of confident arrivals, not a performance.

---

## 4. Scroll-Triggered Motion

### 4.1 The Standard Reveal

- **Motion:** Fade in (`opacity: 0 → 1`) + translate up (`translateY: 20px → 0`). Fixed 20px — not a range, not per-element tuning.
- **Duration:** `motion-base` (300ms).
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Trigger:** Intersection Observer, `threshold: 0.2` — animation begins when 20% of the element is in the viewport.
- **Content default:** All content is rendered visible in the DOM at its final position. Motion is a progressive enhancement layered on top (opacity/translate are set via a `.will-animate` class added only when JS is available). If JS fails, content is visible immediately.

### 4.2 Stagger Order Within Sections

For sections with multiple elements, reveal in this order with `80ms` between each:

1. Section label (eyebrow, mono-tag style)
2. Headline
3. Subheadline or body copy
4. Visual element or card group
5. For card groups: cards stagger left → right (desktop) or top → bottom (mobile), `80ms` per card

**Example — Signal Examples section:**
- `0ms`: "WHAT A SIGNAL LOOKS LIKE" label
- `80ms`: "Not a contact. A conversation you can actually start." headline
- `160ms`: Card 1
- `240ms`: Card 2
- `320ms`: Card 3
- `400ms`: Inline conversion prompt + caption

**Example — How It Works steps:**
- `0ms`: "HOW IT WORKS" label
- `80ms`: Headline
- `160ms`: Step 1 (label + body appear together)
- `240ms`: Step 2
- `320ms`: Step 3
- `400ms`: Step 4

### 4.3 What NOT to Do

- **No parallax scrolling.** Disqualified, no exceptions.
- **No scroll-jacking.** The site always responds to the user's scroll.
- **No gradient blobs, floating shapes, or ambient background motion.** Disqualified, no exceptions.
- **No typewriter text.** Fully disqualified — no exceptions, including the hero headline. This technique has been overused in AI-product launches to the point where it signals "generic" rather than "deliberate." The hero headline's impact comes from its content and typography, not its reveal. Prior draft hedged on this; the hedge is removed.

---

## 5. Component-Level Motion

### 5.1 Buttons

- **Hover:** Background color shift only (`color-accent` → `#2450CC`, 10% darker). No scale, no glow, no shadow. Duration: `motion-instant` (110ms).
- **Active/press:** `scale(0.98)`. Duration: `motion-instant`.
- **Focus:** Focus ring appears instantly (no transition). Focus is not animated — it's immediate, per accessibility best practice.
- **Loading state (form submit):** Button label changes to "Joining…" and becomes non-interactive. A subtle inline spinner (16px, white, `motion-slow` rotation loop) appears to the left of the label. No full-page overlay.

### 5.2 Signal Cards

- **Entrance:** Standard reveal (§4.1), with one addition: after the card fades in, the signal-type tag and intent score badge each fade in `80ms` later than the rest of the card. This draws the eye to the accent-colored elements last — the "signal resolves out of the noise" beat at micro scale.
- **Hover:** `translateY(-2px)` + shadow increase (`0px 2px 12px → 0px 6px 20px rgba(0,0,0,0.10)`). Duration: `motion-fast` (200ms), ease-in-out.

### 5.3 Noise → Signal Visual (Hero)

The hero's signal card column (described fully in `05-homepage.md` §2) has the following motion behavior:

**On page load:**
- Cards 1, 2, 4, 5 (the "noise" cards): fade in at 30% opacity, no translate. Duration: `motion-slow` (500ms). They remain at 30% opacity — they are a permanent visual state, not a transition.
- Card 3 (the "signal" card): fades in at full opacity. Duration: `motion-slow` (500ms). Its signal-type tag and intent score badge fade in `120ms` after the card itself.

**On scroll into The Reframe section (§3 of homepage):**
- Noise cards (1, 2, 4, 5): fade from 30% → 10% opacity. Duration: `motion-base` (300ms). The noise becomes even quieter as the reframe lands.
- Signal card (3): no opacity change — it's already at 100%. A subtle `scale(1.02)` for `300ms` then returns to `scale(1)` — a single small pulse that says "this is the one." Not a loop. One pulse.

**No looping animations in the hero visual.** The signal card column is essentially static after its entrance and the one scroll-triggered pulse. It should not float, breathe, or continuously animate.

**Restraint rule:** Total motion for this visual = entrance (500ms) + one scroll-triggered pulse (300ms). That is all. Any additional motion added to this visual is a violation of the "clarify, never decorate" principle.

### 5.4 Navigation Bar

- **Scroll trigger:** The nav transitions from transparent to solid white when the hero headline scrolls past the top of the viewport. Implementation: watch the hero headline element with an Intersection Observer (`threshold: 0`); when it leaves the viewport (top edge), add the `.scrolled` class to the nav. Do not use a pixel-offset scroll listener.
- **Transition:** `motion-fast` (200ms), `ease-in-out`. Background color: transparent → `color-background`. Border-bottom: `0px solid transparent` → `1px solid color-border`.
- **No hide-on-scroll-down behavior.** Nav persists at all times.

---

## 6. Page Transitions

- **Anchor scroll (nav links → sections):** Smooth scroll, `behavior: 'smooth'`, capped at `700ms` via JS for long scrolls. Easing: `ease-out`.
- **Route changes (if multi-page):** Simple opacity fade, `motion-base` (300ms). No choreography.

---

## 7. Accessibility & Motion Preferences

- **`prefers-reduced-motion` is a hard requirement.** When this OS preference is enabled: all translate animations are removed (fade only, `motion-base` duration). Hero entrance uses fade only. Noise→signal pulse is removed. Hover states use color change only (no translate or scale). The nav scroll transition is instant.
- **Implementation:** A single shared `useReducedMotion()` hook or equivalent CSS media query wrapper governs all animated components. Not per-component. The check happens once; the behavior propagates everywhere.
- **Content visibility:** All content is rendered in its final position and opacity by default (CSS `initial` state). Animation classes are added by JS. If JS never runs, everything is visible.

---

## 8. Motion Decision Checklist

Before adding any motion:

- [ ] Does it answer one of the three governing questions (§1: origin, state, attention)?
- [ ] Is its duration within the scale in §2.1?
- [ ] Is it on the disqualified list in §4.3?
- [ ] Would removing it make the page feel broken, or just less decorated? (Less decorated → remove it.)
- [ ] Does it respect `prefers-reduced-motion`?
- [ ] Is this the absolute minimum motion needed to communicate the idea?
