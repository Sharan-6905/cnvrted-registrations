"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  questionnaireSchema,
  toApiPayload,
  TEAM_SIZES,
  SALES_TOOLS,
  INTENT_OPTIONS,
  type QuestionnaireData,
} from "@/lib/schema";

const STORAGE_KEY = "cnvrted:questionnaire";

function SlackIcon() {
  return (
    <svg
      viewBox="0 0 54 54"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: 16, height: 16, display: "block", flexShrink: 0 }}
    >
      <path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#36C5F0"/>
      <path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#2EB67D"/>
      <path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ECB22E"/>
      <path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.249m14.336 0v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.249a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#E01E5A"/>
    </svg>
  );
}

const defaultValues: Partial<QuestionnaireData> = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  role: "",
  whatYouDo: "",
  teamSize: undefined,
  location: "",
  usedSalesTool: undefined,
  tools: [],
  toolsFeedback: "",
  findingAccountsToday: "",
  biggestChallenge: "",
  intent: undefined,
  demoTime: "",
};

/** Field order for scroll-to-first-error on submit. */
const FIELD_ORDER: (keyof QuestionnaireData)[] = [
  "fullName",
  "phone",
  "email",
  "company",
  "role",
  "whatYouDo",
  "teamSize",
  "location",
  "usedSalesTool",
  "tools",
  "toolsFeedback",
  "findingAccountsToday",
  "biggestChallenge",
  "intent",
  "demoTime",
];

const step1Schema = questionnaireSchema.pick({
  fullName: true,
  phone: true,
  email: true,
});
const step2Schema = questionnaireSchema.pick({
  role: true,
  teamSize: true,
  location: true,
});
const step3Schema = questionnaireSchema.pick({ usedSalesTool: true });
const step5Schema = questionnaireSchema.pick({ intent: true });

function StepHeading({
  number,
  title,
  complete,
}: {
  number: number;
  title: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center gap-3.5">
      <span className="step-circle" data-complete={complete} aria-hidden="true">
        {complete ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2L5 8.7L9.5 3.4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          number
        )}
      </span>
      <h2 className="section-heading">{title}</h2>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="error-text" role="alert">
      {message}
    </p>
  );
}

export function QuestionnaireForm({ slackUrl }: { slackUrl: string }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<QuestionnaireData>({
    resolver: zodResolver(questionnaireSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: defaultValues as QuestionnaireData,
  });

  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Restore from sessionStorage, then persist every change.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        reset(
          { ...(defaultValues as QuestionnaireData), ...JSON.parse(raw) },
          { keepDefaultValues: true },
        );
      }
    } catch {
      // Ignore malformed storage; start clean.
    }
    const subscription = watch((values) => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      } catch {
        // Storage full or unavailable; the form still works.
      }
    });
    return () => subscription.unsubscribe();
  }, [reset, watch]);

  const values = useWatch({ control });

  const step1Done = step1Schema.safeParse(values).success;
  const step2Done = step2Schema.safeParse(values).success;
  const step3Done = step3Schema.safeParse(values).success;
  const step4Done = (values.biggestChallenge ?? "").trim().length > 0;
  const step5Done = step5Schema.safeParse(values).success;

  const usedSalesTool = values.usedSalesTool;
  const challengeLength = (values.biggestChallenge ?? "").length;

  const onValid = async (data: QuestionnaireData) => {
    setFormError(null);
    // Freeze the button width so the label swap doesn't reflow the pill.
    if (buttonRef.current) {
      buttonRef.current.style.width = `${buttonRef.current.offsetWidth}px`;
    }
    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toApiPayload(data)),
      });
      if (!res.ok) {
        // Surface the API's actual reason (e.g. an email-verification
        // rejection) instead of a generic fallback.
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `Request failed: ${res.status}`);
      }
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // Best effort.
      }
      setSent(true);
    } catch (err) {
      setFormError(
        err instanceof Error && err.message && !err.message.startsWith("Request failed")
          ? err.message
          : "That didn't send. Try again, or email hello@cnvrted.com."
      );
    } finally {
      if (buttonRef.current) buttonRef.current.style.width = "";
    }
  };

  const onInvalid = (formErrors: FieldErrors<QuestionnaireData>) => {
    const first = FIELD_ORDER.find((name) => formErrors[name]);
    if (!first) return;
    const el = document.querySelector<HTMLElement>(`[name="${first}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
  };

  if (sent) {
    return (
      <div
        className="card-glass fade-in px-6 py-16 text-center sm:px-12"
        role="status"
      >
        <svg
          className="success-check mx-auto mb-7"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="26"
            cy="26"
            r="24"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.5"
          />
          <path
            d="M16 26.5L23 33.5L36 19.5"
            stroke="#FAFAFA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="chip">
          <span className="chip-dot" aria-hidden="true" />
          Received
        </span>
        <h2 className="mt-6 text-[28px] font-medium tracking-tight text-[var(--text-primary)]">
          We&rsquo;ve got it.
        </h2>
        <p className="mx-auto mt-3 max-w-[420px] text-[16px] leading-relaxed text-[var(--text-secondary)]">
          A founder reads this within 24 hours and emails you directly to lock
          a demo slot.
        </p>
        <div className="mt-8">
          <a
            href={slackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary gap-2"
          >
            <SlackIcon />
            Join our Slack
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      className="card-glass"
      onSubmit={handleSubmit(onValid, onInvalid)}
      noValidate
    >
      {/* ------------------------------------------------ Step 1 — Who you are */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading number={1} title="Who you are" complete={step1Done} />
        <div className="mt-6 space-y-5">
          <div>
            <label className="field-label" htmlFor="fullName">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              className="field-input"
              aria-invalid={errors.fullName ? true : undefined}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              {...register("fullName")}
            />
            <FieldError id="fullName-error" message={errors.fullName?.message} />
          </div>

          <div>
            <label className="field-label" htmlFor="phone">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className="field-input"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? "phone-error" : "phone-helper"}
              {...register("phone")}
            />
            <p id="phone-helper" className="helper-text mt-1.5">
              Include your country code.
            </p>
            <FieldError id="phone-error" message={errors.phone?.message} />
          </div>

          <div>
            <label className="field-label" htmlFor="email">
              Work email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              className="field-input"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
        </div>
      </section>

      <div className="divider-soft" aria-hidden="true" />

      {/* --------------------------------------------- Step 2 — Where you work */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading number={2} title="Where you work" complete={step2Done} />
        <div className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="company">
                Company name{" "}
                <span className="text-[var(--text-tertiary)]">— optional</span>
              </label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                className="field-input"
                {...register("company")}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="role">
                Role
              </label>
              <input
                id="role"
                type="text"
                autoComplete="organization-title"
                placeholder="Founder, Head of Sales, SDR lead…"
                className="field-input"
                aria-invalid={errors.role ? true : undefined}
                aria-describedby={errors.role ? "role-error" : undefined}
                {...register("role")}
              />
              <FieldError id="role-error" message={errors.role?.message} />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="whatYouDo">
              What do you do?{" "}
              <span className="text-[var(--text-tertiary)]">— optional</span>
            </label>
            <textarea
              id="whatYouDo"
              rows={2}
              placeholder="One line on what your team sells and to whom."
              className="field-input"
              {...register("whatYouDo")}
            />
          </div>

          <fieldset>
            <legend className="sr-only">Team size</legend>
            <p className="field-label" aria-hidden="true">
              Team size
            </p>
            <div className="flex flex-wrap gap-2">
              {TEAM_SIZES.map((size) => (
                <label key={size} className="pill-option">
                  <input
                    type="radio"
                    value={size}
                    aria-describedby={
                      errors.teamSize ? "teamSize-error" : undefined
                    }
                    {...register("teamSize")}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
            <FieldError id="teamSize-error" message={errors.teamSize?.message} />
          </fieldset>

          <div>
            <label className="field-label" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              type="text"
              placeholder="City, country"
              className="field-input"
              aria-invalid={errors.location ? true : undefined}
              aria-describedby={errors.location ? "location-error" : undefined}
              {...register("location")}
            />
            <FieldError id="location-error" message={errors.location?.message} />
          </div>
        </div>
      </section>

      <div className="divider-soft" aria-hidden="true" />

      {/* ---------------------------------------- Step 3 — Your current tooling */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading
          number={3}
          title="Your current tooling"
          complete={step3Done}
        />
        <div className="mt-6 space-y-5">
          <fieldset>
            <legend className="sr-only">
              Have you used any sales tool before?
            </legend>
            <p className="field-label" aria-hidden="true">
              Have you used any sales tool before?
            </p>
            <div className="flex flex-wrap gap-2">
              {(["yes", "no"] as const).map((option) => (
                <label key={option} className="pill-option">
                  <input
                    type="radio"
                    value={option}
                    aria-describedby={
                      errors.usedSalesTool ? "usedSalesTool-error" : undefined
                    }
                    {...register("usedSalesTool")}
                  />
                  <span>{option === "yes" ? "Yes" : "No"}</span>
                </label>
              ))}
            </div>
            <FieldError
              id="usedSalesTool-error"
              message={errors.usedSalesTool?.message}
            />
          </fieldset>

          <div className="reveal" data-open={usedSalesTool === "yes"}>
            <div>
              <div className="space-y-5 pt-1">
                <fieldset disabled={usedSalesTool !== "yes"}>
                  <legend className="sr-only">Which tools have you used?</legend>
                  <p className="field-label" aria-hidden="true">
                    Which ones?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SALES_TOOLS.map((tool) => (
                      <label key={tool} className="pill-option">
                        <input
                          type="checkbox"
                          value={tool}
                          {...register("tools")}
                        />
                        <span>{tool}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label className="field-label" htmlFor="toolsFeedback">
                    What&rsquo;s it good at, and where does it fall short?
                  </label>
                  <textarea
                    id="toolsFeedback"
                    rows={3}
                    disabled={usedSalesTool !== "yes"}
                    className="field-input"
                    {...register("toolsFeedback")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="reveal" data-open={usedSalesTool === "no"}>
            <div>
              <div className="pt-1">
                <label className="field-label" htmlFor="findingAccountsToday">
                  How are you finding accounts today?
                </label>
                <textarea
                  id="findingAccountsToday"
                  rows={3}
                  disabled={usedSalesTool !== "no"}
                  className="field-input"
                  {...register("findingAccountsToday")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider-soft" aria-hidden="true" />

      {/* ------------------------------------------------------ Step 4 — The gap */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading number={4} title="The gap" complete={step4Done} />
        <div className="mt-6">
          <label className="field-label" htmlFor="biggestChallenge">
            What&rsquo;s your biggest challenge finding accounts that are
            actually ready to buy?
          </label>
          <p id="biggestChallenge-helper" className="helper-text mb-2">
            Optional — helps us prioritise what to build.
          </p>
          <textarea
            id="biggestChallenge"
            rows={4}
            aria-describedby="biggestChallenge-helper"
            className="field-input"
            {...register("biggestChallenge")}
          />
          {challengeLength > 200 && (
            <p
              className="helper-text tabular mt-1.5 text-right"
              aria-hidden="true"
            >
              {challengeLength} characters
            </p>
          )}
        </div>
      </section>

      <div className="divider-soft" aria-hidden="true" />

      {/* ------------------------------------------------ Step 5 — Fit & timing */}
      <section className="px-6 py-9 sm:px-11 sm:py-11">
        <StepHeading number={5} title="Fit and timing" complete={step5Done} />
        <div className="mt-6 space-y-5">
          <fieldset>
            <legend className="sr-only">
              Are you actively looking for something like this right now?
            </legend>
            <p className="field-label" aria-hidden="true">
              Are you actively looking for something like this right now?
            </p>
            <div className="flex flex-wrap gap-2">
              {INTENT_OPTIONS.map((option) => (
                <label key={option} className="pill-option">
                  <input
                    type="radio"
                    value={option}
                    aria-describedby={
                      errors.intent ? "intent-error" : undefined
                    }
                    {...register("intent")}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            <FieldError id="intent-error" message={errors.intent?.message} />
          </fieldset>

          <div>
            <label className="field-label" htmlFor="demoTime">
              When&rsquo;s a good time to reach you for a quick demo call?{" "}
              <span className="text-[var(--text-tertiary)]">— optional</span>
            </label>
            <input
              id="demoTime"
              type="text"
              placeholder="Weekday afternoons, Tuesday 3pm — whatever works."
              className="field-input"
              {...register("demoTime")}
            />
          </div>
        </div>
      </section>

      <div className="divider-soft" aria-hidden="true" />

      {/* ------------------------------------------------------------ Card footer */}
      <div className="px-6 py-9 text-center sm:px-11">
        {formError && (
          <p className="error-text mb-4" role="alert">
            {formError}
          </p>
        )}
        <button
          ref={buttonRef}
          type="submit"
          className="btn-primary"
          data-loading={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send it over"}
        </button>
        <p className="helper-text mt-3">No spam. Ever.</p>
      </div>
    </form>
  );
}
