import { z } from "zod";

/** Free providers we reject for the work-email field. */
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "yahoo.co.uk",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",
  "proton.me",
  "protonmail.com",
  "pm.me",
]);

export const TEAM_SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"] as const;

export const SALES_TOOLS = [
  "Apollo",
  "ZoomInfo",
  "Clay",
  "Lusha",
  "Sales Navigator",
  "Outreach / Salesloft",
  "Other",
] as const;

export const INTENT_OPTIONS = ["Actively looking", "Exploring", "Just curious"] as const;

const optionalText = z
  .string()
  .trim()
  .max(5000, "That is longer than we can read in one sitting.")
  .optional()
  .or(z.literal(""));

export const questionnaireSchema = z.object({
  // Step 1 — who you are
  fullName: z.string().trim().min(2, "Add your name so we know who to reply to."),
  phone: z
    .string()
    .trim()
    .min(1, "Add a number we can reach you on.")
    .refine((v) => /^\+?[\d\s\-().]+$/.test(v), {
      message: "Digits only — spaces, dashes and a country code are fine.",
    })
    .refine((v) => (v.match(/\d/g) ?? []).length >= 8, {
      message: "That looks short — include your country code.",
    }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("That does not look like an email address.")
    .refine((v) => !FREE_EMAIL_DOMAINS.has(v.split("@")[1] ?? ""), {
      message: "Use your work email — we route this to your team's onboarding.",
    }),

  // Step 2 — where you work
  company: optionalText,
  role: z.string().trim().min(2, "Your role helps us shape the demo."),
  whatYouDo: optionalText,
  teamSize: z.enum(TEAM_SIZES, {
    errorMap: () => ({ message: "Pick the closest fit." }),
  }),
  location: z.string().trim().min(2, "City and country is enough."),

  // Step 3 — current tooling
  usedSalesTool: z.enum(["yes", "no"], {
    errorMap: () => ({ message: "Yes or no is all we need." }),
  }),
  tools: z.array(z.enum(SALES_TOOLS)).default([]),
  toolsFeedback: optionalText,
  findingAccountsToday: optionalText,

  // Step 4 — the gap
  biggestChallenge: optionalText,

  // Step 5 — fit & timing
  intent: z.enum(INTENT_OPTIONS, {
    errorMap: () => ({ message: "Pick whichever is honest." }),
  }),
  demoTime: optionalText,
});

export type QuestionnaireData = z.infer<typeof questionnaireSchema>;

/**
 * Shape the form data into the exact payload the existing backend
 * (app/api/questionnaire/route.ts → Supabase) expects. The backend is
 * intentionally untouched, so the mapping happens here:
 *
 * - `usedSalesTool` becomes a boolean.
 * - The tool chips + feedback textarea collapse into the single
 *   `toolsUsed` string the `tools_used` column stores.
 * - The "No" branch's "how are you finding accounts today?" answer has no
 *   column of its own (the backend nulls `tools_used` when
 *   usedSalesTool=false), so it is folded into `biggestChallenge` with a
 *   prefix rather than dropped.
 */
export function toApiPayload(data: QuestionnaireData) {
  const usedTool = data.usedSalesTool === "yes";

  const toolsUsed = usedTool
    ? [data.tools?.join(", "), data.toolsFeedback?.trim()]
        .filter(Boolean)
        .join(" — ")
    : "";

  const biggestChallenge = [
    !usedTool && data.findingAccountsToday?.trim()
      ? `How they find accounts today: ${data.findingAccountsToday.trim()}`
      : "",
    data.biggestChallenge?.trim() ?? "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    name: data.fullName,
    phone: data.phone,
    email: data.email,
    role: data.role,
    whatTheyDo: data.whatYouDo ?? "",
    teamSize: data.teamSize,
    location: data.location,
    usedSalesTool: usedTool,
    toolsUsed,
    companyName: data.company ?? "",
    biggestChallenge,
    urgency: data.intent,
    demoAvailability: data.demoTime ?? "",
  };
}
