# 07 — Competitor Analysis & Positioning Rules

> Defines exactly how CNVRTED talks about competitors — Apollo, ZoomInfo, and Cognism are named explicitly in the product brief, so this document sets firm rules for how they're referenced, to keep every comparison confident and factual rather than disparaging or legally risky.

---

## 1. The Competitive Landscape (As Framed by CNVRTED)

It's important to be precise about what category CNVRTED is actually contrasting itself against, since sloppy framing here would undermine the brand's "intelligent, trustworthy" personality.

**Apollo, ZoomInfo, and Cognism are not incompetent or bad products.** They are mature, capable tools that solve a real problem: finding accurate, structured contact and firmographic data at scale. CNVRTED's positioning does not depend on claiming these tools are poorly built — it depends on pointing out that **they answer a different question than the one that actually predicts whether an account will respond.**

This distinction matters enormously for tone. The brand should never say or imply "Apollo/ZoomInfo/Cognism are bad." It should say, confidently: **"these tools answer 'who fits' — and that's no longer the hard part."**

| Competitor | What they do well | What they structurally cannot do |
|---|---|---|
| **Apollo** | Large contact database, integrated outbound sequencing tools, accessible pricing for SMB/mid-market | Cannot tell you *when* a fit account becomes an in-market account — its data is structural, not behavioral/real-time |
| **ZoomInfo** | Deep, accurate firmographic and contact data, strong enterprise data infrastructure | Same structural limitation — intent add-ons exist in this space generally, but the core product and core value proposition remain a static, periodically-refreshed database |
| **Cognism** | Strong international/EMEA contact data coverage, compliance-conscious data sourcing | Same structural limitation — premium data accuracy, but accuracy of *who* is not the same as timeliness of *when* |

**The one-sentence version of this entire section:** *They're good at finding the right company. CNVRTED is built to find the right moment.*

---

## 2. Rules for Naming Competitors on the Website

1. **Naming is allowed and factually accurate.** Apollo, ZoomInfo, and Cognism are real, named products in a comparable category, and the brief itself frames CNVRTED against them. Factual, non-disparaging comparative statements are standard and acceptable marketing practice.
2. **Never make false or unverifiable claims about a competitor's product.** Any comparative statement must describe what CNVRTED does differently — not assert something negative or unverifiable about how a competitor's product performs ("ZoomInfo data is often outdated" is a claim that needs evidence CNVRTED doesn't have; "ZoomInfo is built to answer who fits your ICP, not who's in-market right now" is a structural, defensible category statement).
3. **Never use a competitor's logo, trademark, or visual brand identity** anywhere on the site without permission. Competitor names should appear as plain text only.
4. **Frame at the category level, not the feature level.** Avoid "Unlike Apollo, we have X feature" line-item comparisons (this invites an endless feature arms-race framing and looks defensive). Instead, frame the difference at the level of *the question each product answers* — this is both more strategically durable (features change; the category question doesn't) and more consistent with the brand's intelligent, confident personality (`01-brand.md` §2).
5. **No comparison tables with checkmarks/X-marks against named competitors.** This pattern (common in SaaS marketing) reads as adversarial and slightly insecure — inconsistent with the "premium, minimal, trustworthy" brand personality. If a comparison visual is used at all, it should be a simple, confident statement format (see `05-homepage.md` §7), not a dense feature grid.
6. **Mention competitors sparingly — once, in one section.** The "Why Not a Database" section (`05-homepage.md` §7) is the appropriate, singular place for named comparison. Competitor names should not be scattered repeatedly throughout the site as a recurring rhetorical device — that would read as insecure rather than confident.

---

## 3. Approved Comparative Language

Use as direct inspiration/templates — not necessarily verbatim final copy, but representative of the correct tone and claim structure:

> "Apollo, ZoomInfo, and Cognism will tell you who fits. CNVRTED tells you who's ready."

> "Contact databases answer a question that hasn't been the hard part for years — finding people who match a profile. The hard part has always been knowing when to reach them."

> "A great contact database and a great account to call right now are two different things. CNVRTED is built for the second one."

---

## 4. Disallowed Comparative Language

Examples of what NOT to write, with the specific problem flagged:

| Disallowed example | Problem |
|---|---|
| "Apollo and ZoomInfo are outdated tools stuck in the past." | Disparaging, unsubstantiated, contrary to brand restraint. |
| "Unlike ZoomInfo's inaccurate, stale data, CNVRTED's data is always fresh." | Makes an unverifiable negative claim about a specific competitor's data quality — legally and factually risky. |
| "Why pay for Cognism when CNVRTED does everything it does, plus more?" | False completeness claim (CNVRTED doesn't yet replicate Cognism's full data depth/compliance infrastructure) and a feature-count framing the brand should avoid (§2.4 above). |
| A logo wall showing "Apollo ❌ / CNVRTED ✅" style graphics | Visually adversarial, inconsistent with premium/minimal personality, and a legal/trademark risk (§2.3). |

---

## 5. The Broader Category Narrative (For Use Beyond the Comparison Section)

Beyond the direct "Why Not a Database" section, the *idea* of this competitive distinction should run as connective tissue through the entire site (per `02-storytelling.md`'s narrative arc) without needing to repeatedly name competitors. The reframe in Section 4 of the homepage ("Stop asking who fits. Start asking who's ready.") *is* the competitive positioning — just expressed as a category insight rather than a named comparison. This is the more elegant, more brand-consistent way to win the comparison: by making the reader reach the conclusion themselves before a competitor is ever named.

---

## 6. The Intent-Data Platform Gap — Priority Research Item Before Launch

This section identifies the most significant competitive positioning gap in the current documentation. It does not resolve it — resolution requires internal research — but it flags the risk clearly so it is not deferred past launch.

### The problem

A RevOps leader who reads "CNVRTED surfaces real-time buying intent signals" will immediately ask: **"How is this different from 6sense, Bombora, or G2 Buyer Intent?"** These platforms have been in market for years, have enterprise customer bases, and use very similar language ("intent data," "in-market signals," "buying signals") to describe what they do.

If the site has no answer to this comparison, a skeptical RevOps reader will not give CNVRTED the benefit of the doubt. They will conclude it's a cheaper, earlier-stage version of a category they already know.

The current documentation positions CNVRTED only against static contact databases (Apollo, ZoomInfo, Cognism). That comparison is correct and well-handled. But it does not address the intent-data layer, which is the more proximate competitive context for a buyer who is already familiar with the market.

### What is known (structurally, without product research)

Intent data platforms like 6sense and Bombora primarily aggregate **third-party intent data** — behavioral signals inferred from B2B content consumption across publisher networks (which sites a company's employees visit, what topics they read about). These signals are:
- Modeled and aggregated, not raw-observable
- Delayed by the data aggregation pipeline (typically days to weeks)
- Expensive, often six-figure annual contracts
- Sold as enterprise additions to existing CRM/MAP stacks

CNVRTED's described approach — monitoring **public, first-hand observable signals** (actual job postings, actual funding announcements, actual technology changes, actual public conversations on LinkedIn/X/Reddit) — is structurally different: the signals are directly observable, not modeled; they are event-driven (a job post or funding round has a timestamp), not aggregated; and they are accessible without publisher-network partnerships.

This is a meaningful structural difference that CNVRTED can speak to honestly — but only if the team has validated that CNVRTED's signals are genuinely public/directly observable rather than modeled. **This validation is required before any comparative claim is made.**

### Required before launch

Before the site ships, CNVRTED must decide one of the following:

**Option A:** Explicitly address the intent-data comparison in the "Why Not a Database" section (`05-homepage.md` §7) by adding a third row to the comparison covering intent data platforms — with copy drafted under the same rules as §2 of this document (factual, category-level, non-disparaging). This requires:
1. A dedicated research pass confirming how CNVRTED's signal methodology differs from 6sense/Bombora's modeled intent
2. Copy drafted and reviewed against the rules in this document and `03-copywriting.md`
3. A decision on whether to name these platforms (per §2.1 — naming is allowed if factually defensible)

**Option B:** Reframe the product description to make the public/observable signal distinction explicit in the product copy itself, so that the differentiation is embedded in how the product is described rather than handled as a separate comparison. This means the hero subheadline, How It Works section, and Signal Examples all emphasize "publicly observable" signals — which implicitly answers the intent-data question without requiring a direct comparison.

**Option C:** Make no claim and accept the gap — suitable only if internal research concludes that CNVRTED and 6sense/Bombora are genuinely complementary tools targeting different buyer profiles and use cases, and that RevOps buyers are unlikely to evaluate them head-to-head.

### What not to do

Do not improvise copy that implies CNVRTED is cheaper or simpler than 6sense/Bombora without a basis. Do not add "unlike intent data platforms" language to any copy until this research is complete. The same rigor applied to the Apollo/ZoomInfo comparison in §2 applies here.
