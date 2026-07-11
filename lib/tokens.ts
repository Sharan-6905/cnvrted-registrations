/**
 * CNVRTED questionnaire — design tokens.
 *
 * Morphic-style quiet premium dark. Monochrome: white is the accent.
 * Borders, never shadows, define edges. One ambient glow, static.
 * These values are mirrored as CSS custom properties in app/globals.css;
 * this file is the source of truth.
 */

export const tokens = {
  color: {
    bg: {
      page: "#0A0A0A",
      section: "#171717",
      card: "#1C1C1C",
    },
    surface: {
      input: "rgba(255,255,255,0.03)",
      chip: "rgba(255,255,255,0.06)",
    },
    border: {
      hairline: "rgba(255,255,255,0.08)",
      input: "rgba(255,255,255,0.10)",
      inputHover: "rgba(255,255,255,0.16)",
      inputFocus: "rgba(255,255,255,0.35)",
      ghost: "rgba(255,255,255,0.12)",
      /** Glass card edge: gradient border, brightest at top where it catches the glow. */
      cardEdge:
        "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06) 22%, rgba(255,255,255,0.06) 78%, rgba(255,255,255,0.10))",
    },
    text: {
      primary: "#FAFAFA",
      secondary: "#A1A1A1",
      tertiary: "#6B6B6B",
      onPrimary: "#0A0A0A",
    },
    error: "#E5484D",
    /** The one atmospheric move: cool grey-blue radial glow behind the card. */
    glow: "rgba(120,140,180,0.14)",
    /** Static film grain (SVG turbulence) and masked dot grid, both near-invisible. */
    grainOpacity: 0.04,
    dotGridOpacity: 0.05,
    /** Soft outer glow on focus: 0 0 0 4px. */
    focusRing: "rgba(255,255,255,0.06)",
  },

  type: {
    family: "'Inter Tight', system-ui, -apple-system, sans-serif",
    h1: { size: "clamp(34px, 5.2vw, 56px)", weight: 450, tracking: "-0.03em", leading: 1.05 },
    section: { size: "20px", weight: 500 },
    body: { size: "16px", leading: 1.6 },
    label: { size: "14px", weight: 450 },
    helper: { size: "13px" },
    chip: { size: "12px" },
  },

  radius: {
    card: "14px",
    input: "14px",
    pill: "9999px",
  },

  motion: {
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    fast: "200ms",
    base: "240ms",
    slow: "260ms",
    loadStagger: "60ms",
    loadRise: "12px",
  },

  layout: {
    navHeight: "64px",
    heroMax: "640px",
    cardMax: "720px",
    buttonHeight: "44px",
    mobileGutter: "20px",
  },
} as const;

export type Tokens = typeof tokens;
