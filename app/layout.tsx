import type { Metadata, Viewport } from 'next'
import { sans } from '@/styles/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'CNVRTED - Real-time buying signals for B2B sales teams',
  description:
    'Most accounts in your database fit your ICP. Almost none of them are ready to buy right now. CNVRTED shows you which ones are - and exactly why, today.',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'CNVRTED - Real-time buying signals for B2B sales teams',
    description:
      'Stop dialing through contacts that match a profile but show no real sign of intent. CNVRTED surfaces the accounts that are in-market right now, and tells you exactly why.',
    images: [
      {
        url: 'https://register.cnvrted.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CNVRTED - Surface buying intent. Win more deals.',
      },
    ],
    type: 'website',
    url: 'https://register.cnvrted.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CNVRTED - Real-time buying signals for B2B sales teams',
    description:
      'Stop dialing through contacts that match a profile but show no real sign of intent. CNVRTED surfaces the accounts that are in-market right now, and tells you exactly why.',
    images: ['https://register.cnvrted.com/og-image.jpg'],
  },
  metadataBase: new URL('https://register.cnvrted.com'),
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${sans.variable} h-full antialiased`}>
      <head>
        <meta property="og:image" content="https://register.cnvrted.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://register.cnvrted.com/og-image.jpg" />
      </head>
      <body className="min-h-full font-sans">
        {/* Skip-to-content — first focusable element in the tab order. */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
