# 03 — Copywriting Guidelines

> Tactical, sentence-level rules for writing CNVRTED copy. Where `01-brand.md` defines the voice conceptually and `02-storytelling.md` defines the narrative arc, this document defines exactly how to write a sentence, a headline, or a button label so that voice and story show up consistently in execution.

---

## 1. Core Writing Principles

1. **Cut to the shortest sentence that's still true.** If a sentence works with three fewer words, use three fewer words.
2. **Mechanism beats adjective.** "Powerful" tells the reader nothing. "Surfaces accounts the moment they start hiring for the role your product replaces" tells them something. When in doubt, replace an adjective with a mechanism.
3. **Write one idea per sentence.** Compound sentences stacking multiple claims read as marketing. Single-idea sentences read as confident.
4. **Active voice, present tense, by default.** "CNVRTED surfaces intent signals," not "Intent signals are surfaced by CNVRTED" or "CNVRTED will surface intent signals."
5. **Specific nouns over abstract nouns.** "Hiring activity," "funding announcements," "a new VP of Sales" — not "data points," "insights," "information."
6. **Never claim a number you don't have.** Per `00-product.md` §5, no fabricated stats, percentages, or outcome claims. If a sentence needs a number to feel true and there isn't a real one, rewrite the sentence so it doesn't need one.
7. **Say what it's not, occasionally.** "This isn't another list to dial through" does more trust-building than five sentences of positive claims. Use sparingly — once or twice per page, not as a tic.

---

## 2. Vocabulary System

### Words CNVRTED Uses
| Category | Preferred terms |
|---|---|
| The core unit of value | **signal**, **buying signal**, **intent signal** |
| The matching process | **match**, **ICP match**, **fit** (only when contrasting with timing) |
| The output | **opportunity**, **account**, surfaced **accounts** |
| The action | **outreach**, **context**, **reach out** |
| The connection to existing tools | **sync**, **your CRM**, **your stack** |
| The category competitors | **contact databases**, **static lists**, **lead databases** |
| The differentiator | **timing**, **intent**, **right moment**, **in-market** |

### Words CNVRTED Avoids
Banned or heavily restricted terms, and why:

| Avoid | Why |
|---|---|
| "Revolutionize," "supercharge," "unlock," "game-changing," "10x," "next-generation" | Generic AI-startup hype language explicitly called out in the brief. Disqualified outright. |
| "Leverage," "synergy," "best-in-class," "robust," "seamless" | Corporate filler — says nothing specific. |
| "AI-powered," used repeatedly as a selling point on its own | The brand is AI-native by construction, not by marketing claim — see `01-brand.md` Pillar 2. Naming the mechanism (signal detection, scoring) is always preferable to naming the technology category. |
| "Game-changer," "disruptive," "innovative" | Self-congratulatory claims the reader should conclude themselves, not be told. |
| "Easy," "simple," "just" (as in "just connect your CRM") | Minimizing language that can read as condescending to a technical RevOps buyer, and frequently isn't true. |
| Exclamation points | Reserve for genuinely rare emphasis, if ever. Default to none in primary copy. |
| Emoji in body copy or headlines | Not part of the brand's visual or written vocabulary. |

---

## 3. Headline Construction Rules

Headlines are the highest-leverage copy on the site. Three patterns to use, drawn from the voice blend in `01-brand.md`:

### Pattern A — The Reframe Headline (Apple register)
Short, declarative, states the insight directly without hedging.
> *Example shape:* "Fit was never the problem. Timing was."

### Pattern B — The Mechanism Headline (Linear register)
States what the product does, in plain mechanical terms, no adjectives.
> *Example shape:* "See who's hiring for the problem you solve."

### Pattern C — The Contrast Headline (Clay register)
Names the old way and dismisses it with confidence, not contempt.
> *Example shape:* "Your CRM has contacts. It doesn't have context."

**Rule:** Avoid stacking two patterns in one headline (e.g., a reframe + a contrast in the same sentence) — each headline should do exactly one rhetorical job.

**Rule:** No question-mark headlines as a crutch ("Tired of cold outreach that doesn't work?"). Questions are a default move in lead-gen copywriting and read as generic. State the insight; don't ask the reader to agree to it first.

---

## 4. Subheadline Rules

Subheadlines exist to do one job the headline can't: add one layer of specificity or mechanism. A subheadline should never just restate the headline in longer words.

- If the headline makes an emotional or conceptual claim (Pattern A), the subheadline should ground it in mechanism.
  > Headline: "Fit was never the problem. Timing was."
  > Subhead: "CNVRTED tracks hiring, funding, and technology signals to show you exactly which accounts are in-market — and why, right now."
- If the headline already states mechanism (Pattern B), the subheadline should state outcome or contrast, not repeat the mechanism in different words.

---

## 5. CTA (Call-to-Action) Copy Rules

Given the single conversion goal (`00-product.md` §6), CTA copy must be specific, low-friction, and consistent across the entire site.

**Approved primary CTA language:**
- "Join the waitlist"
- "Get early access"
- "Request early access"

**Avoid:**
- "Get started" / "Sign up" (implies a live self-serve product that doesn't exist yet)
- "Learn more" (too passive to be a primary CTA; can be used only for genuinely secondary, non-competing actions like jumping to an explainer section)
- "Book a demo" / "Talk to sales" (implies a sales-led motion that doesn't exist at this stage — see `00-product.md` §6)

**Rule:** Use the *same* primary CTA label across the entire site (pick one of the approved options and standardize it — recommended: **"Join the waitlist"**) so the action never feels like it's asking something different in different places. Supporting microcopy below the CTA button can vary slightly (e.g., "Be first to know when we launch" / "No spam. Just early access.") but the button label itself should not.

---

## 6. Microcopy & UI Text Rules

- **Form labels:** Plain and literal ("Work email," not "Your email" or "Email address*"). No cleverness in functional UI text — save personality for headlines and section copy, not for form fields.
- **Error/validation states:** Direct and helpful, never cute ("Enter a valid work email" — not "Oops! That doesn't look right 👀").
- **Confirmation states (post-waitlist-signup):** This is a moment to use brand voice with warmth — Apple-register restraint, not exclamation-point excitement. E.g., "You're on the list. We'll be in touch when it's time." Not "Woohoo! You're in! 🎉"
- **Navigation labels:** Short, literal nouns (e.g., "Product," "How it works," "Why CNVRTED") — no cute renaming of standard nav patterns.

---

## 7. Labeling Illustrative Examples (Pre-Launch Honesty Rule)

Per `02-storytelling.md` §5, the site will show illustrative signal-to-insight examples (e.g., a mocked example of "Company posts 3 sales engineering roles → surfaced as high-intent"). These must be **clearly and consistently labeled as illustrative**, never presented in a way that could be mistaken for a real captured signal or real customer data.

**Required labeling language (use consistently):**
- "Example signal" / "Illustrative example" as a small label near any mocked signal card or UI mockup.
- Caption language such as: "An example of how a signal might appear in your feed."

**Never:**
- Present a mocked signal with a real, identifiable company name.
- Imply, through copy adjacent to the example, that this is a real result CNVRTED has already delivered ("This is how we helped a team close a deal" — not true yet, not permitted).

This rule protects both brand integrity (`01-brand.md` §5) and basic factual accuracy, and should be treated as non-negotiable, not a stylistic suggestion.

---

## 8. Sentence-Level Style Rules

- **Sentence length:** Vary it, but bias short. A good paragraph on this site reads like it could be read aloud in one breath per sentence.
- **Oxford comma:** Use it.
- **Contractions:** Permitted and encouraged in body copy ("doesn't," "isn't," "it's") — they make Linear/Apple-register copy feel spoken rather than written-at the reader. Avoid contractions only in the rare instance of a formal legal/footer context.
- **Numbers:** Spell out one through nine in body copy; use numerals for 10+ and always for any UI/data context.
- **Em dashes:** Use sparingly for a single sharp aside per paragraph, not as a recurring tic — over-use of em dashes is a common AI-writing tell and undermines the "intelligent, minimal" personality.
- **Second person ("you/your"):** Default mode of address. The reader is a RevOps lead being spoken to directly, not described in third person.
- **No rhetorical "imagine if" openers.** Another common generic-AI-copy pattern. Open with a statement, not a hypothetical invitation.

---

## 9. Worked Examples: Hero and Closing CTA Copy

### Hero (committed copy — from `05-homepage.md` §2)

The hero was revised from the original draft. The original delivered the reframe headline ("Fit was never the problem. Timing was.") before the reader had felt the problem, breaking the narrative arc. The revised hero surfaces the tension; the Reframe section resolves it. See `02-storytelling.md` and `05-homepage.md` for the structural rationale.

> **Eyebrow:** Real-time buying signals for B2B sales teams
>
> **Headline:** Your pipeline isn't empty. Your timing is off.
>
> **Subheadline:** Most accounts in your database fit your ICP. Almost none of them are ready to buy right now. CNVRTED shows you the ones that are — and exactly why, today.
>
> **Primary CTA:** Join the waitlist
>
> **Supporting microcopy:** No spam. First access when we launch.

**Why this works:** Beat 1 headline (tension, not reframe — reframe is in §3 of homepage). Subheadline adds one specific layer of mechanism without being a list. Single CTA. No hype. "Be early" removed from microcopy — it's a pre-launch cliché. "First access when we launch" is slightly more specific about what the reader gets.

**Vocabulary check:** "Fit your ICP" and "ready to buy right now" — plain language, no banned terms. Eyebrow is a literal product description, not a competitive contrast or marketing claim. "Lead Lists" (prior draft eyebrow) removed — inconsistent with the `contact databases` vocabulary decision in §2.

---

### Closing CTA (committed copy — from `05-homepage.md` §8)

> **Headline:** The window to move first is open. It won't be forever.
>
> **Body:** CNVRTED is in early access. The teams joining now will be the first to run on real-time intent — while their competitors are still dialing through static lists.
>
> **Primary CTA:** Join the waitlist
>
> **Supporting microcopy:** No spam. You'll hear from us when access opens — and not before.
>
> **Post-submission:** You're in. We'll reach out directly before we open access. Keep an eye on your work inbox.

**Why this is stronger than the prior draft:** "Be early to a different way of selling" (prior) is a cliché opening on the most important persuasion moment on the page. The revised headline applies the brand's core idea — timing as competitive advantage — to the act of joining the waitlist. "While their competitors are still dialing through static lists" is a callback to the problem established in §3 of the homepage, giving the close a narrative arc rather than a generic signup prompt. "Opening access in stages" (prior) was removed — it implied a staged rollout infrastructure that may not exist, violating `00-product.md` §5's no-fabrication rule.

---

## 10. Copy Review Checklist

Before any copy ships, check it against this list:

- [ ] Does it avoid every word in the banned vocabulary list (§2)?
- [ ] Does every claim trace back to something true and unfabricated (`00-product.md` §5)?
- [ ] Is the CTA language consistent with the rest of the site (§5)?
- [ ] Could this sentence be shorter without losing meaning?
- [ ] Does it sound like Linear/Clay/Apple/Cognism blended — or does it sound like generic AI-startup copy?
- [ ] If it references an example or signal, is it clearly labeled illustrative (§7)?
- [ ] Does it serve one of the five narrative beats in `02-storytelling.md`, or is it filler?
- [ ] Does the eyebrow use `contact databases` (not "lead lists") when referring to the competitor category (§2 vocabulary system)?
- [ ] Does the closing CTA avoid manufactured urgency while still creating genuine anticipation?
