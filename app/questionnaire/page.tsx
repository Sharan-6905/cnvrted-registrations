import type { Metadata } from 'next'
import Link from 'next/link'
import { QuestionnaireForm } from '@/components/questionnaire/QuestionnaireForm'

export const metadata: Metadata = {
  title: 'Questionnaire — CNVRTED',
  description:
    'Tell us about yourself and your team so we can build CNVRTED for you.',
}

const SLACK_URL =
  'https://join.slack.com/t/cnvrted/shared_invite/zt-4388qsrbr-x~RlkFSChnmWY7JojhV1fA'

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="2" fill="#FAFAFA" />
        <path
          d="M8 1.5A6.5 6.5 0 0 1 14.5 8"
          stroke="rgba(250,250,250,0.55)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 14.5A6.5 6.5 0 0 1 1.5 8"
          stroke="rgba(250,250,250,0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[15px] font-medium tracking-tight text-[var(--text-primary)]">
        CNVRTED
      </span>
    </span>
  )
}

export default function QuestionnairePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Film grain — static, sits over everything */}
      <div className="grain" aria-hidden="true" />

      {/* Slim sticky nav */}
      <header className="sticky top-0 z-20 h-16 backdrop-blur-md bg-[rgba(10,10,10,0.72)] hairline-b">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-5">
          <Link href="/" aria-label="CNVRTED home">
            <Wordmark />
          </Link>
          <a
            href={SLACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Join our Slack
          </a>
        </div>
      </header>

      <main id="main-content" className="relative">
        {/* Atmosphere — one static glow, one masked dot grid */}
        <div className="hero-grid" aria-hidden="true" />
        <div className="ambient-glow" aria-hidden="true" />

        {/* Hero */}
        <section className="relative z-10 mx-auto max-w-[640px] px-5 pt-24 pb-16 text-center sm:pt-32">
          <div className="fade-up fade-up-1">
            <span className="chip">
              <span className="chip-dot" aria-hidden="true" />
              A few questions
            </span>
          </div>
          <h1 className="h1 fade-up fade-up-2 mt-7">
            Help us build this for you.
            <span className="h1-muted block">Two minutes, no sales pitch.</span>
          </h1>
          <p className="fade-up fade-up-3 mx-auto mt-6 max-w-[500px] text-[16px] leading-relaxed text-[var(--text-secondary)] [text-wrap:balance]">
            We&rsquo;re building CNVRTED for revenue teams like yours. Every
            answer shapes what we build next and how we prioritise your
            onboarding.
          </p>
        </section>

        {/* Form card */}
        <section className="relative z-10 mx-auto max-w-[720px] px-5 pb-12">
          <div className="fade-up fade-up-4">
            <QuestionnaireForm slackUrl={SLACK_URL} />
          </div>
        </section>

        {/* Reassurance */}
        <section className="relative z-10 mx-auto max-w-[860px] px-5 pb-24">
          <ul className="fade-up fade-up-5 flex flex-col items-center gap-3 text-center text-[13px] text-[var(--text-tertiary)] sm:flex-row sm:justify-center sm:gap-3">
            <li>A real person reads every response — no sequences.</li>
            <li aria-hidden="true" className="hidden sm:block">
              ·
            </li>
            <li>About two minutes. Most fields optional.</li>
            <li aria-hidden="true" className="hidden sm:block">
              ·
            </li>
            <li>We reach out directly to schedule your demo.</li>
          </ul>
        </section>
      </main>

      <footer className="hairline-t overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 py-8 text-[13px] text-[var(--text-tertiary)]">
          © 2026 CNVRTED.
        </div>
        {/* Giant half-cropped outlined wordmark — cropped to the top half of
            the letterforms; font size and container height scale together. */}
        <div
          className="pointer-events-none relative w-full select-none overflow-hidden"
          aria-hidden="true"
          style={{ height: 'clamp(60px, 11vw, 160px)' }}
        >
          <p
            className="footer-wordmark absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap font-semibold leading-none"
            style={{ fontSize: 'clamp(120px, 22vw, 320px)', letterSpacing: '-0.03em' }}
          >
            CNVRTED
          </p>
        </div>
      </footer>
    </div>
  )
}
