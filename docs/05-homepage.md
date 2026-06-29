# 05 — Homepage Blueprint

> The single most important document for build. Defines every section of the homepage in order, with actual copy (not placeholders), layout intent, and the rationale tying each section back to `02-storytelling.md`'s narrative arc. This is the source of truth a developer or designer should build directly from.
>
> **Revision note:** Section order was restructured to resolve a double-reframe problem in the original draft. The hero previously delivered Beat 2 (the reframe) upfront, then Section 3 walked back to Beat 1 (the problem), then Section 4 re-delivered Beat 2. This created a narrative regression that undercut the emotional arc. The corrected order: Hero sets up the tension without resolving it; a combined Problem + Reframe section delivers the "click" moment as one unbroken movement; then mechanism and contrast follow.

---

## 0. Section Map (Overview)

| # | Section | Narrative Beat | Goal |
|---|---|---|---|
| 1 | Navigation | — | Orientation, persistent CTA access |
| 2 | Hero | Beat 1 | Surface the tension without resolving it yet |
| 3 | The Reframe | Beat 1 → 2 | Feel the problem, then land the insight as one movement |
| 4 | How It Works | Beat 3 | Mechanism transparency, signal → match → action |
| 5 | Signal Examples | Beat 3 | Show, don't tell — with inline conversion moment |
| 6 | Fits Your Stack | Beat 3 → 4 | De-risk adoption for RevOps (moved up from position 8) |
| 7 | Why Not a Database | Beat 4 | Confident category contrast |
| 8 | Closing CTA | Beat 5 | Convert to waitlist |
| 9 | Footer | — | Navigation, legal, brand close |

**Change from prior version:** "The Old Way" (formerly §3) and "The Reframe" (formerly §4) are merged into a single section (now §3). "Fits Your Stack" moved from position 8 to position 6 — it addresses the RevOps buyer's second-highest concern and should land before the competitive contrast, not after it. Signal Examples now includes an inline CTA to capture readers at peak conviction.

---

## 1. Navigation

**Layout:** Fixed top bar, transparent over hero, transitions to solid white with a hairline bottom border (`color-border`) on scroll. Transition triggers when the hero headline leaves the viewport — not at scroll pixel 1, not at section boundary, but at the specific moment the headline disappears (approximately 70–80% of the hero's viewport height scrolled). Duration: `motion-fast` (200ms), `ease-out-expo`.

**Structure:**
- Left: CNVRTED wordmark (no tagline appended — clean)
- Center: 3 nav items — `Product` · `How it works` · `Why CNVRTED`
- Right: Single CTA button — **Join the waitlist**

**Anchor mapping (explicit — do not leave to developer discretion):**
- `Product` → `#signal-examples` (Section 5 — the closest to a product preview)
- `How it works` → `#how-it-works` (Section 4)
- `Why CNVRTED` → `#why-not-a-database` (Section 7)
- `Join the waitlist` (nav) → `#closing-cta` (Section 8, the closing form — not the hero form, to create a complete read-through before the ask)

**Mobile nav:** Collapses to a hamburger icon. Expanded state is a full-screen overlay (background: `color-background`, z-index above all content). Nav items listed vertically, center-aligned, at `h2` scale. A persistent "Join the waitlist" button remains visible in the collapsed mobile header bar at all times — it does not disappear when the menu is open. Close affordance: tap the hamburger icon again (which transforms to an X on open) or tap outside the menu area.

**Rule:** No "Pricing," "Login," or "Sign up" in nav — none of these exist yet (`00-product.md` §6, §8).

---

## 2. Hero

**Narrative job:** Beat 1 — surface the tension. The hero does not resolve anything. It names the problem precisely, makes it feel true, and ends in a state of productive tension that the next section resolves. The hero earns the reader's attention; the Reframe section earns their conviction.

**Why this order:** Delivering the reframe in the hero ("Fit was never the problem. Timing was.") before the reader has felt the problem is like explaining a punchline before the joke. The insight only lands if the tension is present first. The hero builds that tension; section 3 releases it.

**Layout:** Centered. Generous vertical padding — minimum 160px top on desktop. The display headline is the first visual weight the eye hits. Below the headline and CTA, a hero visual fills roughly 40–50% of the viewport height: a mocked signal feed — 5–7 signal cards in a stacked/slightly offset arrangement, all rendered at low contrast (desaturated, near `color-surface` tone) except one, which renders at full fidelity with the accent color active on its signal-type tag and intent score. This is the noise→signal metaphor made literal and static at hero load; it becomes the live animation subject in §4.3 of `06-motion.md`.

**Hero visual (definitive spec, resolving conflict between prior homepage and motion docs):** A vertically stacked column of signal cards (approximately 5 cards visible, with the top and bottom cards partially cropped to imply a feed). Cards 1, 2, 4, 5 render in a muted, low-opacity state (approximately 30% opacity, no color). Card 3 (center) renders fully: company name placeholder ("Meridian Corp" — clearly fictional), signal type tag in accent color (`HIRING`), one-line signal text ("Posted 4 new Sales Engineering roles this week"), and an intent score indicator (described fully in `04-design-system.md` §8). On scroll into the Reframe section, the muted cards fade further; the center card scales up slightly and its accent elements brighten — one visual resolution of noise → signal. On mobile: the hero visual is repositioned above the CTA button (not below), reduced to 3 cards visible, to ensure it appears above the fold.

**Copy:**

> **Eyebrow:** Real-time buying signals for B2B sales teams
>
> **Headline:** Your pipeline isn't empty. Your timing is off.
>
> **Subheadline:** Most accounts in your database fit your ICP. Almost none of them are ready to buy right now. CNVRTED shows you the ones that are — and exactly why, today.
>
> **Primary CTA:** Join the waitlist
>
> **Microcopy below CTA:** No spam. First access when we launch.

**Rationale:** The headline ("Your pipeline isn't empty. Your timing is off.") names the precise frustration of a RevOps or sales leader who has a full CRM and a leaking pipeline. It does not explain the solution — it creates productive tension. The eyebrow is now a literal description of the product category rather than a competitive contrast statement (that belongs in Section 7). The subheadline extends the tension with a specific observation ("Almost none of them are ready to buy right now") before gesturing at the resolution — grounding the abstract claim without pre-empting the Reframe section's job.

**Vocabulary check:** "Lead lists" removed. "Fit your ICP" and "ready to buy" are plain language. No hype words.

---

## 3. The Reframe

**Narrative job:** Beat 1 → 2 — this section does both jobs in one continuous movement. The first half makes the problem feel specific and undeniable. The second half delivers the insight. The transition between the two halves — from problem to reframe — is the single most important moment on the entire site.

**Layout:** Two-part section, visually connected. Part A (problem): two-column asymmetric layout — copy left, the muted noise visual right (the same hero visual column of cards, now rendered at even lower contrast, implying the visual has "traveled down the page" from the hero and arrived here in its most noise-like state). Part B (reframe): the layout opens up. The noise visual fades or shifts off-screen as this copy enters. Generous centered whitespace. A single signal card at full fidelity — the same center card from the hero, now isolated, accent color fully active, surrounded by negative space. The density contrast between Part A and Part B is itself the visual reframe: clutter → clarity.

**Section ID:** `#the-reframe`

**Part A — The Problem:**

> **Section label (mono-tag style):** THE PROBLEM
>
> **Headline:** Your CRM has thousands of contacts. Almost none of them are ready.
>
> **Body:** Every account in your database technically fits your ICP. Right industry, right size, right title. But fit doesn't tell you who's actually looking for a solution today — it just tells you who looked right on paper six months ago, when the list was built.
>
> The result: reps working through contacts that match a profile but show no real sign of intent. High volume. Low reply rates. A pipeline that looks full and converts like it's empty.

**Visual break:** After this body copy, a short horizontal rule or a tight vertical whitespace gap (48px) signals a shift — not a new section, but a pivot within this one. The noise visual dims further. The layout transitions toward center-aligned.

**Part B — The Reframe:**

> **Headline:** Fit was never the problem. Timing was.
>
> **Body:** A company that just posted five new sales roles, switched marketing platforms, and raised a Series B last month isn't a better fit than it was a year ago. It's the same company. What's changed is timing.
>
> Timing is the one thing a contact database cannot show you. CNVRTED is built for exactly that — reading the public signals that reveal when an account is in-market, matching them against your ICP, and surfacing the ones worth reaching out to today.

**Rationale:** The "click" of the reframe — "Fit was never the problem. Timing was." — lands with full force here because the reader has just felt the problem in Part A. The hero built tension; Part A sharpened it; Part B releases it. The reframe headline is now in the right structural position. The body copy in Part B eliminates the grammatically awkward original clause ("the moment they happen") and completes the thought cleanly.

---

## 4. How It Works

**Narrative job:** Beat 3 — mechanism transparency. The section that does the trust-building work that social proof would do for an established product.

**Section ID:** `#how-it-works`

**Layout:** The one dark-mode contrast section on the page (`04-design-system.md` §6). Background: `#0B0B0E`. This dark treatment is a deliberate visual signal: "this is the technical core — look closely." Four-step sequence, horizontal on desktop (each step in its own column, connected by a thin accent-colored line or subtle arrow), vertical on mobile (steps stacked, with clear step-number indicators so the sequence reads as intentional, not just paragraphs).

**Section boundary treatment:** The transition from the white Reframe section to the dark How It Works section is a full-bleed hard edge — no gradient fade, no angled divider, no wave SVG. A clean, confident horizontal cut. The darkness arrives at once, signaling a register change. (Soft fades read as indecision; hard cuts read as intention.)

**Copy:**

> **Section label:** HOW IT WORKS
>
> **Headline:** Signal detected. Account surfaced. Context delivered.
>
> **Step 1 — Detect:** CNVRTED continuously monitors hiring activity, funding announcements, technology changes, and public conversations for signs that an account is actively moving.
>
> **Step 2 — Match:** Every signal is matched against your ICP — industry, size, role, tech stack, geography — and scored for relevance and urgency. Noise filtered out. Signal surfaced.
>
> **Step 3 — Contextualize:** Each surfaced account arrives with the reasoning: which signal triggered it, what it implies, and what your team should say. Not a contact. A conversation starter.
>
> **Step 4 — Sync:** Opportunities, signal context, and enrichment data sync into your existing CRM. No new system. Intent data lives where your team already works.

**Step visual spec (per step, within the dark section):**
- Step number: `caption` size, monospace, accent-dark-mode color (`#5B7FFF`)
- Step label (e.g., "Detect"): `h3` size, off-white (`#F2F2F4`), 500 weight
- Step body: `body` size, secondary dark text (new token `color-text-secondary-dark`: `#9A9AA3`)
- Small icon: 24×24px, 1.5px stroke, accent-dark-mode color — representing the step's action (a pulse/radar icon for Detect; a filter/funnel for Match; a message-draft icon for Contextualize; a sync/loop icon for Sync). Icons from a single set (Phosphor or Lucide — pick one in `04-design-system.md`; do not mix).

**Dark section boundary (exit):** Same full-bleed hard cut back to white. The return to white signals: "mechanism explained, now see it in practice."

**Rationale:** Headline changed from "From public signal to qualified opportunity — automatically" (which used "automatically" in a slightly hype-adjacent way) to "Signal detected. Account surfaced. Context delivered." — three declarative past-tense phrases that read as a description of something that already happened, implying reliability without claiming it explicitly.

---

## 5. Signal Examples

**Narrative job:** Beat 3 continued — the "show, don't tell" moment. This section is where abstract mechanism becomes something the reader can see and evaluate.

**Section ID:** `#signal-examples`

**Layout:** White background (return from dark). Section label + headline centered at top. Below: a row of 3 signal cards on desktop, stacked vertically on mobile. Below the cards: a single, inline secondary conversion moment (not a competing CTA — a contextually-placed waitlist mention).

**Inline conversion note:** After the signal cards, before the caption, add a brief persuasion moment: readers who find the signal examples compelling are at peak conviction right here — not at the closing CTA. Capturing them now is a higher-intent conversion than asking them to scroll through two more sections. The inline treatment should be visually subordinate (text link + short prompt, not a full button), so it doesn't compete with the section's primary job.

**Copy:**

> **Section label:** WHAT A SIGNAL LOOKS LIKE
>
> **Headline:** Not a contact. A conversation you can actually start.
>
> **Card 1 — Hiring Signal:**
> `HIRING` *(signal type tag, monospace)*
> "Posted 4 new Sales Engineering roles in the past 10 days."
> → Scaling outbound capacity. Likely evaluating tools their new hires will use.
> `HIGH INTENT` *(score indicator)*
>
> **Card 2 — Funding Signal:**
> `FUNDING` *(signal type tag, monospace)*
> "Announced a $40M Series B, with 'go-to-market expansion' cited in press release."
> → New budget cycle, new initiatives. The 60-day window after a funding round is historically when new vendor decisions are made.
> `HIGH INTENT` *(score indicator)*
>
> **Card 3 — Technology Signal:**
> `TECH CHANGE` *(signal type tag, monospace)*
> "Removed HubSpot from listed requirements across 6 open roles in the last 2 weeks."
> → Possible migration or consolidation in progress. The roles suggest they're not renewing.
> `MEDIUM INTENT` *(score indicator — intentionally not all HIGH, to read as credible rather than uniformly promotional)*
>
> **Inline conversion prompt (below cards, above caption):**
> "This is what your feed looks like. [Join the waitlist →](#closing-cta)" *(text link, not a button)*
>
> **Caption:** All examples are illustrative. Real signals are detected continuously and scored against your specific ICP.

**Signal card visual spec (definitive — see also `04-design-system.md` §8 for component token details):**
- Card dimensions: approximately 360px wide × 180px tall on desktop; full-width on mobile
- Border: 1px `color-border`, border-radius: `12px` (distinct from the generic 16px card — signal cards are a unique component and should feel slightly tighter/more data-like)
- Background: `color-surface-raised` (white with subtle shadow: `0px 2px 12px rgba(0,0,0,0.06)`)
- Signal type tag: top-left, monospace font, 12px, 500 weight, `color-accent` text on `color-accent-dim` background, 4px border-radius, 6px vertical / 10px horizontal padding
- Signal text: `body` size (16px), `color-text-primary`, occupies the middle of the card
- Implication text (the "→" line): `body` size, `color-text-secondary`, slightly indented or visually separated by a thin rule
- Intent score: bottom-right, pill shape. `HIGH INTENT`: `color-accent-dim` background, `color-accent` text. `MEDIUM INTENT`: `#F5F0E8` background, `#8A6A20` text (a warm amber that reads as "worth watching" without urgency). No score below MEDIUM appears in illustrative examples — the existence of score gradation is what signals a real system, not a binary on/off flag.
- "Example signal" label: a small, secondary text label in `color-text-tertiary` positioned in the top-right corner of each card: "Illustrative example"

**Signal card 3 rationale:** The original Card 3 ("Removed a competing tool from their job postings' tech stack requirements") was confusing — unclear mechanism, unclear what "job posting requirements" means in this context. Revised to "Removed HubSpot from listed requirements across 6 open roles" — more specific, more legible, and the implication is naturally inferrable. HubSpot is used here only as a named illustration (not as a confirmed CNVRTED-detected data point), consistent with `00-product.md` §7's guidance on using well-known tools descriptively. The "Illustrative example" card label covers this.

---

## 6. Fits Your Stack

**Narrative job:** Beat 3 → 4 — de-risk adoption for the RevOps buyer before the competitive contrast section. This section was moved from position 8 in the prior draft. A RevOps leader's second-highest concern is workflow integration (`00-product.md` §4 priority ranking #2). Addressing this before the competitive contrast section means the reader arrives at "Why Not a Database" already reassured that adopting CNVRTED doesn't require dismantling their existing stack.

**Section ID:** `#fits-your-stack`

**Layout:** Light section. Two-column on desktop: left column is copy; right column is a simple abstract diagram — a flow illustration showing: [Signal Feed] → [CNVRTED] → [Your CRM], with generic CRM representation (no specific logo, as no integrations are confirmed per `00-product.md` §7; use a simple database/stack icon). The diagram should feel functional and minimal, not decorative — a schematic, not an illustration. On mobile: stacked, copy above diagram.

**Copy:**

> **Section label:** BUILT TO FIT
>
> **Headline:** Intent data that lives in your CRM, not a separate tab.
>
> **Body:** The most common reason a new tool gets abandoned isn't the product — it's the habit. Reps don't check a new platform. RevOps can't maintain two sources of truth.
>
> CNVRTED is built to sync signal context, scored accounts, and enrichment data directly into your existing CRM and sales tooling. Your team works where it already works. The signals just show up there.

**Rationale:** Prior version's headline ("This isn't another tab your team forgets to open.") is strong — kept in spirit but sharpened. The body has been restructured: the original opened with a product description; the revised version opens with a behavioral truth about tool adoption (the RevOps reader will recognize this immediately), then delivers the product answer. This order — problem acknowledgment first, product answer second — is the same Pattern C (contrast headline) logic applied at paragraph level.

---

## 7. Why Not a Database

**Narrative job:** Beat 4 — direct, confident category contrast. By this point the reader has seen the mechanism, seen example signals, and understood the workflow fit. The competitive contrast now lands on a reader who already understands what CNVRTED does — so it reads as confident clarification rather than defensive positioning.

**Section ID:** `#why-not-a-database`

**Layout:** Light section. Simple two-statement layout: one row for "what they answer" / one row for "what CNVRTED answers" — not a feature table with checkmarks. Two clean contrast statements, each with a brief body sentence. No logos, no brand colors from competitors, no visual adversarialism.

**Copy:**

> **Section label:** THE HONEST COMPARISON
>
> **Headline:** Apollo, ZoomInfo, and Cognism answer "who fits." CNVRTED answers "who's ready."
>
> **Row 1 — Contact databases:**
> *What they answer:* Who matches your ICP profile?
> *How they answer it:* A static list of contacts that fit your firmographic criteria — updated periodically, not in real time.
> *What they can't show you:* Whether any of those contacts are actively in-market today.
>
> **Row 2 — CNVRTED:**
> *What we answer:* Which of those accounts are showing real buying signals right now?
> *How we answer it:* Continuous monitoring of public signals — hiring, funding, tech changes, public conversations — matched against your ICP and scored for urgency.
> *What we don't replace:* Your contact database. We work alongside it, not instead of it.
>
> **Bridge line (below the comparison):** If you already use one of these tools, CNVRTED tells you which accounts in your existing database to call first — and why, today.

**"What we don't replace" rationale:** This addition is new and important. The original draft positioned CNVRTED as categorically distinct from databases but never addressed whether a buyer still *needs* both. A RevOps leader thinking about budget allocation will immediately ask "do I cancel Apollo for this?" The honest answer is probably no — and saying so directly ("we don't replace your contact database; we work alongside it") is more trustworthy than leaving that question unanswered. It also removes a purchase objection before it forms.

**Note on intent-data platforms:** 6sense, Bombora, and G2 Buyer Intent are intentionally not named here, consistent with `07-competitor-analysis.md` §6 (no competitive claims without dedicated research). If CNVRTED wants to position against intent-data-as-a-layer specifically, that comparison requires its own section — drafted once internal research is complete and positioned under "Why Not Intent Data" as a separate row in this section or a separate page. Do not improvise this comparison in copy.

---

## 8. Closing CTA

**Narrative job:** Beat 5 — the invitation. By this point the reader has felt the problem, understood the reframe, seen the mechanism, evaluated signal examples, been reassured about workflow fit, and processed the competitive comparison. This is the clean close.

**Section ID:** `#closing-cta`

**Layout:** Centered, maximum whitespace. Visually mirrors the hero — same generous vertical padding, same center alignment — to create a deliberate bookend feeling. No competing visual elements. The form is the only thing in this section besides the copy.

**Copy:**

> **Headline:** The window to move first is open. It won't be forever.
>
> **Body:** CNVRTED is in early access. The teams joining now will be the first to run on real-time intent — while their competitors are still dialing through static lists.
>
> **Form:** Single email field. Label: "Work email". Button: **Join the waitlist**
>
> **Microcopy below button:** No spam. You'll hear from us when access opens — and not before.

**Rationale:** Prior version's headline ("Be early to a different way of selling") is weak — "be early" is a pre-launch cliché, and "a different way of selling" is abstract after a page of specifics. The revised headline ("The window to move first is open. It won't be forever.") uses the same timing-as-competitive-advantage logic that anchors the entire product, now applied to the act of joining the waitlist itself. This is not manufactured scarcity — it's a true statement (the window to be a category-early adopter is real and finite) that echoes the brand's central idea. "While their competitors are still dialing through static lists" reactivates the problem from Section 3, giving the closing a narrative callback that a generic "sign up now" prompt does not have.

**Remove:** "CNVRTED is opening access in stages" — this implies a staged rollout infrastructure that may not exist. Per `00-product.md` §5's no-fabrication rule, claims about operational process (staged access, invite waves) must only be made if they are real. If staged access is genuinely planned, reintroduce this line with specific language ("We're onboarding teams in cohorts of 25"). If not, the revised copy handles the same emotional beat without the factual commitment.

**Post-submission state (in-place replacement of the form):**

> **Heading:** You're in.
>
> **Body:** We'll reach out directly before we open access. Keep an eye on your work inbox.
>
> **Optional secondary prompt (if social accounts are live):** Follow us on [X / LinkedIn] for updates. *(text link only — omit entirely if accounts are not active)*

**Rationale for "You're in" over prior "You're on the list":** "You're on the list" sounds like a numbered queue that may or may not move. "You're in" is more definitive, warmer, and reads as earned rather than logged. "We'll reach out directly before we open access" sets a specific expectation (direct contact, before open access) without fabricating a timeline.

---

## 9. Footer

**Section ID:** `#footer`

**Layout:** Minimal single-row or two-row footer. Not a multi-column sitemap.

**Structure:**
- Row 1: CNVRTED wordmark (left) + one-line descriptor: "Buying signals for the accounts that matter right now." (replaces prior "Revenue intelligence built on real buying signals, not static lists" — shorter, second-person-adjacent, closes on the product's core value rather than the category label)
- Row 2: Minimal nav repeat: `Product` · `How it works` · `Why CNVRTED` (left) | Privacy Policy · Terms (right)
- Row 3: `© [Year] CNVRTED. All rights reserved.`

**Rule:** No social icons unless accounts are active and maintained. No fake follower counts. No "trusted by" logos.

---

## 10. 404 Page

**This page is required and must be designed before launch.** A pre-launch product shared widely on LinkedIn and X will generate broken links.

**Copy:**

> **Headline:** This page doesn't exist. The signal does.
>
> **Body:** Whatever you were looking for isn't here. But CNVRTED is.
>
> **CTA:** [Return home →](/) or [Join the waitlist →](#closing-cta)

**Layout:** Center-aligned, minimal, same visual language as the site. Not a joke, not an error code dump — brand-consistent, brief, functional.

---

## 11. Page-Level Rules

- **One CTA label, used consistently.** "Join the waitlist" appears in nav, hero, signal examples (inline text link), and closing CTA. The inline text link in Section 5 is not a competing CTA — it's a lower-friction alternative path to the same destination for readers who convert before the closing section.
- **No pop-ups, exit-intent modals, or sticky conversion banners.** Inconsistent with the premium/minimal personality.
- **No countdown timers or fabricated scarcity.** Per `00-product.md` §5.
- **Section count:** 8 content sections (reduced from 9 by merging Problem + Reframe into a single section). This is the ceiling. Any future section must displace an existing one, not be added on top.
- **OG / Social card (required before launch):** When this site is shared on LinkedIn or X, the link preview is the first visual impression most people will have. The OG image should use the hero headline ("Your pipeline isn't empty. Your timing is off."), the CNVRTED wordmark, and the accent color on a white or near-white background — clean, typographic, no illustrative elements. Dimensions: 1200×630px. This asset must be created and tested before the site goes live.
