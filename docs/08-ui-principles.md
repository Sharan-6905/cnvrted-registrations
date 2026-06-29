# 08 — UI Principles

> Where `04-design-system.md` defines the visual building blocks (color, type, spacing) and `06-motion.md` defines how things move, this document defines how the interface should *behave* — interaction patterns, responsive logic, accessibility standards, and layout heuristics that aren't strictly visual but are essential to a premium, trustworthy execution.

---

## 1. Core UI Principles

1. **Clarity beats cleverness.** If a user has to pause to figure out what an interactive element does, the element has failed — regardless of how visually polished it is.
2. **Every interactive element looks interactive.** No mystery-meat navigation, no clickable text that doesn't visually signal it's clickable (proper link styling, cursor states, hover feedback). This matters especially for a "trustworthy, intelligent" brand — ambiguity erodes trust in subtle ways.
3. **The page should never make the user wait without acknowledgment.** Any action with latency (form submission, navigation) needs immediate visual feedback, even if the actual process takes a moment.
4. **Default to showing real content, not skeleton placeholders, wherever feasible.** Since this is a largely static marketing site without heavy data-fetching, content should be present and stable on load rather than appearing via loading skeletons — skeleton-loading patterns are a tell of a different kind of product (data-heavy SaaS apps) and aren't necessary here.
5. **Respect the reader's time.** No content gating ("enter your email to keep reading"), no forced multi-step modals before showing the waitlist form. The entire site should be frictionless to read end-to-end.

---

## 2. Layout Heuristics

### 2.1 The "One Job Per Section" Rule
Reiterating and operationalizing `04-design-system.md` §4.3: before building any section, define its single job in one sentence. If the answer requires "and," the section is doing two jobs and should be split. This applies to UI density as much as copy — a section with one headline, one supporting visual, and one CTA is doing its job; a section with three competing visual elements and two CTAs is not.

### 2.2 F-Pattern and Z-Pattern Awareness
For text-heavy sections (e.g., "The Old Way," "Fits Your Stack"), respect natural reading patterns: the most important phrase in a paragraph should land in the first line, since users scan before they read. For visual/text combination sections, use a deliberate Z-pattern (eye moves top-left → top-right → bottom-left → bottom-right) to guide the eye from headline to visual to CTA, rather than letting placement be arbitrary.

### 2.3 Visual Anchoring for the Single CTA
Because the entire site converges on one conversion action (`00-product.md` §6), the "Join the waitlist" CTA should always be the single highest-contrast interactive element in its section — never visually competing with a secondary action of equal weight. If a section needs a secondary link (e.g., "See how it works ↓" jumping to another section), it must be visually subordinate — text link styling, not button styling.

---

## 3. Responsive Behavior

### 3.1 Breakpoint Philosophy
Design content-out, not device-out: define breakpoints based on where the layout actually breaks (where line lengths get awkward, where a two-column layout gets cramped), not arbitrary device-width assumptions. As a practical starting framework:

| Breakpoint | Approx. width | Primary layout shift |
|---|---|---|
| Mobile | < 640px | Single column throughout, stacked sections |
| Tablet | 640–1024px | Some two-column sections collapse to single column; nav may simplify |
| Desktop | 1024–1440px | Full multi-column layouts as designed |
| Large desktop | > 1440px | Content max-width caps engage; extra space becomes margin, not stretched content |

### 3.2 Mobile-Specific Rules
- **Hero headline sizing:** Must scale down enough that the full reframe headline ("Fit was never the problem. Timing was.") reads comfortably in 2–3 lines on a mobile viewport — never so large that it awkwardly breaks word-by-word per line.
- **Signal cards on mobile:** Stack vertically, full-width within margins, rather than horizontally scrolling. Horizontal scroll-snap card carousels are permitted only as a deliberate, clearly-affordanced pattern (with visible partial-next-card peeking) — never as a hidden/undiscoverable interaction.
- **Navigation on mobile:** Collapse to a simple hamburger/menu icon revealing a full-screen or slide-in menu — but keep the "Join the waitlist" CTA visible in the persistent mobile header bar even when the rest of nav is collapsed, since it's the page's single conversion goal and shouldn't be buried inside a menu.
- **Dark "How It Works" section on mobile:** The four-step sequence (`05-homepage.md` §5) should stack vertically with clear visual separation between steps (not just paragraph breaks) so the sequence remains easy to follow without the horizontal step-indicator layout available on desktop.

---

## 4. Forms & Input Behavior

### 4.1 The Waitlist Form
Given `00-product.md` §6's emphasis on minimal friction:
- **Single field default:** Work email only. Do not require name, company, or role unless a deliberate future decision is made to gather more qualification data — and if so, that decision should be revisited as a documented update to this file, not implemented ad hoc.
- **Inline validation:** Validate email format on blur (when the user leaves the field), not on every keystroke — keystroke-level validation feels naggy and premature.
- **Submission feedback:** Button state changes immediately on click (per `06-motion.md` §4.1) and the form should replace itself with a confirmation message in place (not a separate modal/page redirect) — keeping the experience contained and calm.
- **Error handling:** A single, clear inline message beneath the field for invalid input or submission failure — never a browser-default alert() popup.

### 4.2 Accessibility of Forms
- Every input must have a properly associated `<label>` (visually present, not just a placeholder — placeholder-only labels disappear on focus and harm usability, especially for users with cognitive or memory considerations).
- Focus states must be clearly visible (a visible outline or border-color shift using the accent color) — never `outline: none` without a replacement focus indicator.

---

## 5. Accessibility Standards

This site should meet **WCAG 2.1 AA** as a baseline, non-negotiable standard — consistent with the "trustworthy" brand trait, which extends to building a product (and a site) that works for everyone, not just an idealized fast-connection desktop user.

### 5.1 Color Contrast
- Body text against background must meet a minimum 4.5:1 contrast ratio; large headline text may use the relaxed 3:1 large-text threshold, but should still be checked — the near-black (`#0E0E10`) on white (`#FFFFFF`) palette defined in `04-design-system.md` comfortably clears this, but any text rendered in the secondary/tertiary gray tones must be checked against whatever background it sits on, especially in the dark "How It Works" section.
- The accent color (`#2E5EFF`) on white must be checked for contrast when used for body-sized link text (not just large buttons) — if it falls short, use the button/large-text context for the lightest version of the accent, or darken it slightly for inline text links specifically.

### 5.2 Keyboard Navigation
- Every interactive element (nav links, CTA buttons, form fields) must be reachable and operable via keyboard alone, in a logical tab order matching visual layout.
- No keyboard traps — especially relevant if a mobile menu or any modal-like overlay is used; focus must be able to escape via Tab and Escape key.

### 5.3 Screen Reader Considerations
- Semantic HTML structure (proper heading hierarchy, `<nav>`, `<main>`, `<footer>` landmarks) rather than div-soup with visual-only structure.
- Decorative visuals (e.g., the noise→signal animated illustration in the hero) should be marked `aria-hidden` or given empty alt text, since they're illustrative rather than informational — but any illustrative signal card example that conveys actual example content (`05-homepage.md` §6) should have meaningful, readable alt/label text.
- Motion-based reveals must not delay or block screen reader access to content — content should exist in the DOM and be announced normally regardless of its visual animation state (reinforcing `06-motion.md` §6).

### 5.4 Reduced Motion
Full cross-reference to `06-motion.md` §6 — implement `prefers-reduced-motion` media query support as a hard requirement, not an enhancement.

---

## 6. Performance as a UI Principle

Given the "Fast" brand trait (`01-brand.md` §2) is explicitly about *felt* speed, performance is treated here as a UI/UX concern, not purely an engineering concern (detailed technical implementation lives in `09-engineering-rules.md`).

- **Largest Contentful Paint target:** Under 2.5 seconds on a throttled mid-tier mobile connection. The hero headline and primary visual are almost certainly the LCP element — they must be optimized accordingly (no unnecessarily large hero images/animations blocking render).
- **No layout shift during load.** Images, embedded fonts, and dynamically-loaded content must reserve their layout space up front (explicit width/height, font-display strategies) so the page doesn't visibly jump as it loads — this is a basic trust signal as much as a technical metric.
- **Animations should never cause jank.** If a scroll-reveal or hover effect causes visible stutter, it should be simplified or removed — a perfectly smooth, simpler animation always beats an elaborate, stuttering one for the "premium" brand trait.

---

## 7. UI Decision Checklist

Before shipping any interface element, check it against this list:

- [ ] Is its purpose immediately clear without explanation?
- [ ] Does it visually signal whether it's interactive?
- [ ] Does it work correctly at every breakpoint in §3.1?
- [ ] Is it operable via keyboard alone?
- [ ] Does it meet WCAG 2.1 AA contrast and semantic requirements?
- [ ] Does it respect `prefers-reduced-motion`?
- [ ] Is it doing one job, or is it quietly doing two (per §2.1)?
- [ ] Would a RevOps lead reviewing this site find it instantly trustworthy and clear, or would they have to puzzle over it?
