/**
 * Font configuration.
 *
 * Inter Tight — the neutral grotesk for the whole surface. Variable font,
 * so intermediate weights (450) used by labels and the H1 work natively.
 * No mono, no serif: this page is a single quiet voice.
 */

import { Inter_Tight } from 'next/font/google'

export const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})
