# 04 — Design System

> Translates the brand personality (`01-brand.md`) into concrete, implementable visual decisions: color, type, spacing, and component logic. This document is written to be design-tool-agnostic and code-agnostic — it defines *decisions*, not implementation (implementation constraints live in `09-engineering-rules.md`).
>
> **Revision note:** Typeface is now committed (General Sans). Missing dark-mode tokens added to the color table. Signal card visual spec expanded from vague description to full field-level spec. Shadow treatment for dark section added. Section boundary treatment defined. Icon set committed (Phosphor). Focus state visual spec added.

---

## 1. Design Philosophy

Given the brief's direction — light, clean, Apple/Clay-style, with no existing brand assets — the design system is built from three working principles:

1. **Whitespace is a feature, not a gap.** Most sections should feel like they have room to breathe. If a section feels "full," it has too much in it.
2. **Hierarchy through scale and weight, not color.** Color should be reserved for meaning (signal, action, state) — not used decoratively to create visual interest. Visual interest comes from typography, spacing, and motion, not from a rainbow of brand colors.
3. **One accent color, used deliberately.** A single, confident accent — not a gradient system, not multiple "brand colors" competing for attention. This single accent becomes synonymous with *signal* (see `02-storytelling.md` §3) — every time the accent color appears, it should mean "this is the important, live thing on the page."

---

## 2. Color System

### 2.1 Palette

**Light mode (primary):**

| Token | Hex | Usage |
|---|---|---|
| `color-background` | `#FFFFFF` | Primary page background |
| `color-surface` | `#F7F7F8` | Secondary/card surfaces, subtle section differentiation |
| `color-surface-raised` | `#FFFFFF` | Cards that sit above the surface; differentiated via subtle shadow (see §7) |
| `color-border` | `#E7E7EA` | Hairline borders, dividers, nav bottom border on scroll |
| `color-text-primary` | `#0E0E10` | Headlines, primary body text — near-black, not pure black |
| `color-text-secondary` | `#5C5C66` | Supporting copy, captions, metadata |
| `color-text-tertiary` | `#9A9AA3` | Disabled states, placeholder text, least-important labels, "Illustrative example" card labels |
| `color-accent` | `#2B5CE6` | The single signal color — CTAs, links, active states, signal-type tags, intent score indicators |
| `color-accent-link` | `#1A47C8` | Inline body text links only — slightly darker than `color-accent` to meet WCAG AA 4.5:1 contrast on white; do not use for buttons |
| `color-accent-dim` | `#EDF0FF` | Accent backgrounds for signal-type tags, HIGH INTENT badges |
| `color-intent-medium-bg` | `#F5F0E8` | Background for MEDIUM INTENT score indicators |
| `color-intent-medium-text` | `#7A5C1A` | Text for MEDIUM INTENT score indicators — warm amber, distinct from accent |
| `color-success` | `#1E9E6B` | Confirmation states only (waitlist success message, form success) |
| `color-error` | `#D93025` | Form validation errors only — never used decoratively |

**Dark mode (How It Works section only):**

| Token | Hex | Usage |
|---|---|---|
| `color-dark-bg` | `#0B0B0E` | Dark section background — near-black, not pure black |
| `color-dark-surface` | `#141417` | Cards and surface elements within the dark section |
| `color-dark-border` | `#242428` | Borders within the dark section — a lighter-than-background line |
| `color-dark-text-primary` | `#F2F2F4` | Primary text in dark sections — off-white, not pure white |
| `color-dark-text-secondary` | `#9A9AA3` | Secondary text, step body copy in dark section |
| `color-dark-text-tertiary` | `#5C5C66` | Least-important labels in dark section |
| `color-accent-dark` | `#6B8FFF` | Accent color in dark section — brightened from light-mode value to clear WCAG AA on `color-dark-bg`; used for step numbers, active icons, highlights |

**Rationale for accent color revision:** `#2E5EFF` (prior value) fails WCAG AA contrast (4.5:1) for body-sized inline link text on white. Corrected to `#2B5CE6` for standard use and `#1A47C8` for inline text links — both committed values, not ranges. The `color-accent-link` token exists specifically to eliminate the "darken it slightly" ambiguity in the prior draft. At `#1A47C8` on `#FFFFFF`, contrast is approximately 7.1:1 — comfortably passes AA and AAA for normal text.

### 2.2 Color Usage Rules

- **No gradients as backgrounds.** Per the brief's explicit instruction to avoid generic AI aesthetics, gradient-mesh hero backgrounds are disqualified. No exceptions.
- **No more than one accent color on screen at a time.** `color-intent-medium-bg`/`color-intent-medium-text` and `color-success`/`color-error` are functional state colors — not brand accent colors. They appear only on specific components, not as decorative elements.
- **Dark section is exactly one section.** The "How It Works" section (`05-homepage.md` §4). No other section uses the dark token set.
- **`color-accent` signals meaning.** Reserved for: primary CTA buttons, signal-type tags, intent score indicators (`HIGH INTENT`), active/live state markers, and inline links (via `color-accent-link`). Never for decorative shapes, backgrounds, or icons that don't represent action or live signal.
- **Section boundary between light and dark:** Full-bleed hard edge — no gradient fade, angled divider, or wave SVG. A clean horizontal cut. Both the entry into and exit from the dark section are hard cuts. Soft transitions read as indecision; hard cuts read as deliberate register change.

---

## 3. Typography

### 3.1 Typeface Decisions (Committed)

| Role | Typeface | Rationale |
|---|---|---|
| **Primary (headlines, UI, all text)** | **General Sans** (by Pangram Pangram) | Geometric grotesque with slightly more personality than Inter and more considered optical spacing than Geist. Precise at display sizes, warm at body sizes. Distinguishes CNVRTED from the Vercel/Linear visual ecosystem without drifting toward decorative. Available via Pangram Pangram or self-hostable. |
| **Monospace (signal tags, timestamps, step numbers, technical labels)** | **JetBrains Mono** | Strong readability at small sizes. The slight character of its letterforms (particularly the `l`, `i`, `0`) reinforces the "data you can read" personality. Available via Google Fonts (self-host for performance). |
| **Secondary typeface** | None. | General Sans handles both display and body effectively. A second typeface would add font-loading overhead without adding meaningful personality differentiation. If this decision is ever revisited, document the reason here. |

**General Sans weights used:** 400 (Regular), 500 (Medium), 600 (Semibold). Load only these three weights — no 300, no 700.
**JetBrains Mono weights used:** 500 (Medium) only. Load only this weight.

### 3.2 Type Scale (Desktop → Mobile)

| Token | Desktop size | Mobile size | Weight | Line height | Usage |
|---|---|---|---|---|---|
| `text-display` | 72px | 40px | 600 | 1.05 | Hero headline only |
| `text-h1` | 48px | 32px | 600 | 1.1 | Section headlines |
| `text-h2` | 36px | 26px | 600 | 1.15 | Subsection headlines |
| `text-h3` | 24px | 20px | 500 | 1.25 | Card titles, step labels |
| `text-body-lg` | 19px | 17px | 400 | 1.55 | Subheadlines, intro paragraphs |
| `text-body` | 16px | 15px | 400 | 1.6 | Standard body copy |
| `text-caption` | 13px | 12px | 500 | 1.4 | Section labels (eyebrow), metadata |
| `text-mono-tag` | 12px | 11px | 500 (mono) | 1.3 | Signal-type tags, step numbers, timestamps |

**Mobile hero headline note:** At 40px with the hero copy ("Your pipeline isn't empty. Your timing is off."), this headline should wrap to approximately 3 lines on a 375px viewport — test explicitly. If it wraps awkwardly mid-phrase, allow scaling down to 36px before adjusting the copy.

### 3.3 Typography Rules

- **Weight ceiling: 600.** Never use 700+ for headlines at any size. 600 at `text-display` has sufficient presence without aggression.
- **Line length:** Body copy max ~65 characters per line (not 70 — the tighter constraint is more readable at 16px). Enforce via `max-width` on text containers: approximately `38em`.
- **Letter-spacing:** 0 for all sentence-case text. `+0.08em` for uppercase section labels (`text-caption` in uppercase) — enough to feel intentional, not enough to feel stretched.
- **No italics for emphasis.** Weight or color only.
- **Headline max-width:** Display headlines should be constrained to approximately 14–18 words maximum. Anything longer at display size becomes unmanageable at mobile.

---

## 4. Spacing & Layout System

### 4.1 Spacing Scale (8px base)

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192px`

Name these semantically in code (e.g., `spacing-xs = 4px`, `spacing-sm = 8px`, through `spacing-3xl = 192px`) so they're referenced by name, not by magic number.

### 4.2 Grid

- **Desktop:** 12-column grid, max content width `1280px`, outer margins `80px` minimum. Content should never touch the viewport edge on any standard desktop resolution.
- **Section vertical rhythm:** `128px` top and bottom padding for major sections on desktop; `80px` on tablet; `64px` on mobile. This is the single most important spacing decision for premium feel — do not reduce under deadline pressure.
- **Mobile:** Single-column, `24px` outer margins.

### 4.3 Layout Principles

- **One primary message per viewport-height section.** Every section should be identifiable by its single point at a glance.
- **Alternate alignment.** Not every section should be centered. The hero is centered. The Reframe (Part A) is asymmetric (text left, visual right). The Reframe (Part B) is centered. How It Works is centered within the dark section. Signal Examples is centered. Fits Your Stack is asymmetric (text left, diagram right). Why Not a Database is a structured comparison, not centered or asymmetric. Closing CTA is centered. This alternation prevents the "template" feeling.

---

## 5. Iconography & Imagery

- **Icon set: Phosphor Icons** (committed). 1.5px stroke, rounded joins, regular weight. Do not mix with any other icon set. Do not use filled variants alongside regular variants — pick regular throughout.
- **No stock photography of people.** Disqualified.
- **No AI imagery** (neural networks, brains, circuits, robots). Disqualified.
- **Primary visual approach:** Product-adjacent UI — signal cards, feed columns, scoring indicators. Real-looking interfaces that communicate the product's output, not abstract art representing its concept.
- **Illustration:** Minimal geometric diagrams only (e.g., the CRM flow diagram in "Fits Your Stack"). No character illustration.

---

## 6. Dark Section

One dark section: "How It Works" (`05-homepage.md` §4). Maximum one additional dark section if a future content need requires it — this constraint exists to preserve the contrast moment's impact.

**Dark section tokens:** All listed in §2.1 under "Dark mode."

**Elevation within dark section:** Cards and step containers within the dark section use `color-dark-surface` (`#141417`) as the background — barely distinguishable from `color-dark-bg`, but providing enough lift. Border: 1px `color-dark-border` (`#242428`). No shadows — shadow is invisible on dark backgrounds. The border does the elevation work.

**Step number treatment:** `text-mono-tag` size, `color-accent-dark` (`#6B8FFF`), JetBrains Mono. The accent color on step numbers is the visual anchor that threads through each step — the eye follows `01 → 02 → 03 → 04` via the accent color, reinforcing the sequential nature of the pipeline.

**Section boundary:** Full-bleed hard edge, as specified in §2.2. The section above (The Reframe) ends in white. The dark section begins immediately. No transition gradient. On exit, same: dark ends, white begins.

---

## 7. Elevation & Depth

- **Default card shadow:** `0px 2px 12px rgba(0, 0, 0, 0.06)` — subtler than the prior draft's `24px` blur, which was slightly heavy for a hairline-border-first system.
- **Prefer borders over shadows.** Default signal cards use a 1px `color-border` hairline. The shadow is additive for `color-surface-raised` cards that need more separation.
- **Hover shadow (signal cards):** `0px 6px 20px rgba(0, 0, 0, 0.10)` + 2px upward translate. The shadow increase and translate happen together on the same transition.
- **Border radius system:**
  - `4px` — small interactive elements (checkboxes, toggle handles)
  - `8px` — buttons, signal-type tags, intent score badges
  - `12px` — signal cards (distinct from generic 16px cards — slightly tighter, more data-like)
  - `16px` — general content cards, form containers
  - `24px` — large modals or containers (not used on this homepage)

---

## 8. Component Specs

### 8.1 Primary CTA Button

- Background: `color-accent` (`#2B5CE6`)
- Text: `#FFFFFF`, `text-body` size (16px), 500 weight, General Sans
- Padding: `12px 24px` (vertical / horizontal)
- Border-radius: `8px`
- Hover: background shifts to `#2450CC` (10% darker), transition `motion-instant` (110ms) `ease-out`
- Active/press: scale `0.98`, transition `motion-instant`
- Focus: `2px solid #2B5CE6`, `2px offset` — the focus ring matches the button color. On the button itself, use `outline: 2px solid #FFFFFF; outline-offset: 2px` so the ring is visible against the colored button background.
- No glow, no shadow, no gradient on the button itself.

### 8.2 Secondary / Text CTA

- Text: `color-accent-link` (`#1A47C8`)
- Style: underline on hover, no underline at rest
- No background, no border
- Used only for non-competing actions (e.g., the inline "Join the waitlist →" text link in Signal Examples, "Return home" on 404)

### 8.3 Signal Card (Primary Component)

Signal cards are the most important UI element on this site. This spec is definitive.

**Dimensions:** `~360px × 180px` on desktop. Full content-width on mobile. Cards do not have a fixed height — they grow with content — but example cards should be authored to approximately this proportion.

**Structure (top to bottom, left to right):**

```
┌─────────────────────────────────────────────────┐
│ [HIRING]              "Illustrative example"     │  ← top row: tag (left) + label (right)
│                                                  │
│ Posted 4 new Sales Engineering roles             │  ← signal text (body, primary color)
│ in the past 10 days.                             │
│                                                  │
│ ─────────────────────────────────────            │  ← 1px rule, color-border
│                                                  │
│ → Scaling outbound capacity. Likely evaluating   │  ← implication (body, secondary color)
│   tools their new hires will use.                │
│                                                  │
│                               [HIGH INTENT]      │  ← intent score badge (bottom right)
└─────────────────────────────────────────────────┘
```

**Token mapping:**
- Card background: `color-surface-raised` with `0px 2px 12px rgba(0,0,0,0.06)` shadow
- Card border: 1px `color-border`
- Card border-radius: `12px`
- Card padding: `20px 24px`
- Signal-type tag (`[HIRING]`, `[FUNDING]`, `[TECH CHANGE]`): `text-mono-tag` (12px, 500 weight, JetBrains Mono), `color-accent` text, `color-accent-dim` background, `8px` border-radius, `4px 10px` padding
- "Illustrative example" label: `text-caption` (13px, 500 weight, General Sans), `color-text-tertiary`, right-aligned in the top row
- Signal text: `text-body` (16px, 400 weight), `color-text-primary`
- Horizontal rule: 1px `color-border`, full card width minus padding
- Implication text (the "→" line): `text-body` (16px, 400 weight), `color-text-secondary`
- "→" prefix on implication: rendered in General Sans, not as an arrow glyph — ensures visual consistency
- Intent score badge (`[HIGH INTENT]`, `[MEDIUM INTENT]`):
  - HIGH INTENT: `color-accent-dim` background, `color-accent` text
  - MEDIUM INTENT: `color-intent-medium-bg` background, `color-intent-medium-text` text
  - Both: `text-mono-tag` size, `8px` border-radius, `4px 10px` padding, bottom-right position
- Hover state: `0px 6px 20px rgba(0,0,0,0.10)` shadow + `translateY(-2px)`, `motion-fast` (200ms) ease-out

### 8.4 Navigation Bar

- Height: `64px` on desktop, `56px` on mobile
- Logo: left-aligned, `text-h3` scale
- Nav links: `text-body` (16px), `color-text-secondary` at rest, `color-text-primary` on hover, `motion-instant` transition
- CTA button: primary button style (§8.1), slightly reduced padding `10px 20px` to fit the nav height
- Transparent background at hero; transitions to `color-background` with `1px solid color-border` bottom border as the hero headline scrolls past the viewport. Transition: `motion-fast` (200ms).
- No backdrop blur on the solid nav state — clean white, not frosted.

### 8.5 Waitlist Form

- Field: full-width text input, `48px` height, 1px `color-border` border, `8px` border-radius, `text-body` inside, placeholder text in `color-text-tertiary`
- Label: `text-caption` (13px, 500 weight), above the field, `color-text-secondary`. Always visible — not a floating label, not placeholder-only.
- Button: sits directly adjacent (right, on desktop; below, on mobile), primary CTA style
- Focus state on input: border changes to `color-accent`, `2px` box-shadow spread in `color-accent-dim` — not an outline, a border-and-glow treatment that feels more refined than a browser default focus ring

### 8.6 Focus States (All Interactive Elements)

Focus states are a brand expression, not an afterthought. The CNVRTED focus treatment:

- **Buttons and links:** `2px solid color-accent` outline, `3px offset`. Clean, visible, matches brand color.
- **Form inputs:** Border shifts to `color-accent` (`2px`), plus a soft `0px 0px 0px 3px color-accent-dim` box-shadow spread — softer than a hard outline, feels more native to the form component.
- **Nav links:** Underline in `color-accent`, `2px` thickness, `2px offset`.
- All focus states must be visible at a 3:1 contrast ratio against their surrounding background (WCAG 2.1 SC 1.4.11 — Non-text contrast).
- `outline: none` is **never** used without a replacement. Any element that removes the default outline must replace it with one of the above treatments.

---

## 9. Design Anti-Patterns (Explicit Exclusions)

- No gradient-mesh or aurora backgrounds.
- No glassmorphism.
- No particle/node network animations.
- No neon glow on buttons or cards.
- No stock photography of people.
- No AI iconography (brains, robots, circuits, neural networks).
- No second accent hue on screen.
- No bold/black (700+) headline weights.
- No centered-everything layouts as the exclusive pattern across the page.
- No mixing of Phosphor and any other icon set.
- No border-radius less than `8px` on interactive elements (too sharp for this brand's warmth).
- No inline pixel values in code — all spacing, color, and typography must reference named tokens.
