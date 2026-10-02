import * as z from 'zod';

/** CSM workflows a tool can help with. */
export const Workflow = z.enum([
  'call-notes',
  'follow-up-email',
  'qbr-prep',
  'account-research',
  'onboarding',
  'renewal-prep',
  'risk-review',
  'async-video',
  'knowledge-search',
  'reporting',
  'feedback-synthesis',
  'automation',
]);

export const Source = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  url: z.url(),
  kind: z.enum(['pricing', 'privacy', 'terms', 'dpa', 'trust', 'help']),
  /** 'manual' = the pipeline can't read this page; it joins the quarterly human check. */
  verify: z.enum(['auto', 'manual']).default('auto'),
  extract: z
    .object({ selector: z.string().optional(), startsAt: z.string().optional() })
    .default({}),
  lastVerified: z.iso.date(),
});

/** A fact's evidence: the source it comes from and a short verbatim quote from that page. */
export const Cite = z.object({ source: z.string(), quote: z.string().min(2).max(240) });
const Cites = z.array(Cite).min(1);

export const Price = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('listed'),
    /** As the vendor publishes it; the £30 ceiling is checked with a pinned exchange rate. */
    currency: z.enum(['GBP', 'USD', 'EUR']),
    per: z.enum(['user-month', 'month']),
    amounts: z
      .array(
        z.object({
          amount: z.number().nonnegative(),
          billing: z.enum(['monthly', 'annual', 'unstated']),
        }),
      )
      .min(1),
    minSeats: z.number().int().positive().optional(),
    evidence: Cites,
  }),
  z.object({ status: z.literal('contact-sales'), evidence: Cites }),
  z.object({ status: z.literal('unverified'), reason: z.string().min(10) }),
]);

export const Facts = z.object({
  trainingDefault: z.enum(['on', 'off', 'unclear']),
  trainingControl: z.enum(['user-setting', 'admin-enforced', 'none', 'unclear', 'not-needed']),
  /** Where the user switches training off, shown verbatim. Required for 'user-setting'. */
  optOutPath: z.string().optional(),
  /** Does the vendor say its AI subprocessors can't train on your data? */
  subprocessorTraining: z.enum(['excluded', 'not-stated', 'allowed', 'first-party']),
  dpa: z.enum(['incorporated', 'on-request', 'none', 'unclear']),
  /** An org admin can enforce data settings for every user. */
  adminEnforcement: z.boolean(),
});

/** Facts that drive the rating and therefore must carry evidence. */
export const RATED_FACTS = [
  'trainingDefault',
  'trainingControl',
  'subprocessorTraining',
  'dpa',
  'adminEnforcement',
] as const satisfies readonly (keyof z.infer<typeof Facts>)[];

export const Plan = z.object({
  name: z.string().min(1),
  audience: z.enum(['personal', 'business', 'enterprise']),
  price: Price,
  facts: Facts,
  evidence: z.partialRecord(Facts.keyof(), Cites),
  caveats: z.array(z.object({ text: z.string().max(200), evidence: Cites })).default([]),
  ratingOverride: z
    .object({ rating: z.enum(['red', 'amber', 'green']), reason: z.string().min(40) })
    .optional(),
});

const ToolShape = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  vendor: z.string().min(1),
  website: z.url(),
  summary: z.string().max(160),
  /** The four baseline assistants, exempt from the price ceiling. */
  baseline: z.boolean().default(false),
  workflows: z.array(Workflow).min(1),
  worksWith: z.array(z.enum(['m365', 'google-workspace', 'standalone'])).min(1),
  form: z
    .array(z.enum(['web', 'desktop', 'mobile', 'browser-extension', 'meeting-bot', 'integration']))
    .min(1),
  /**
   * Cameron's judgement, shown as such and never written or edited by AI. Absent until he
   * has written it; the site shows "assessment pending" rather than a placeholder.
   */
  assessment: z
    .object({
      bestFor: z.string().min(1),
      watchOut: z.string().min(1),
      take: z.string().min(1).max(280),
    })
    .optional(),
  plans: z.array(Plan).min(1),
  sources: z.array(Source).min(2),
});

const PRIVACY_KINDS = new Set(['privacy', 'trust', 'help', 'dpa', 'terms']);

/** Cross-field rules. Exported so tests and the pipeline can report issues without parsing twice. */
export function toolIssues(tool: z.infer<typeof ToolShape>, today: string): string[] {
  const issues: string[] = [];
  const ids = new Set(tool.sources.map((s) => s.id));
  const kinds = new Set(tool.sources.map((s) => s.kind));

  if (ids.size !== tool.sources.length) issues.push('source ids must be unique');
  if (!kinds.has('pricing')) issues.push('needs a pricing source');
  if (![...kinds].some((k) => PRIVACY_KINDS.has(k))) issues.push('needs a privacy or trust source');
  for (const s of tool.sources) {
    if (s.lastVerified > today) issues.push(`${s.id}: lastVerified is in the future`);
  }

  const checkCites = (cites: readonly { source: string }[], where: string) => {
    for (const c of cites)
      if (!ids.has(c.source)) issues.push(`${where}: unknown source ${c.source}`);
  };

  for (const plan of tool.plans) {
    const at = `${tool.slug}/${plan.name}`;
    for (const fact of RATED_FACTS) {
      if (fact === 'trainingControl' && plan.facts.trainingControl === 'not-needed') continue;
      if (!plan.evidence[fact]) issues.push(`${at}: no evidence for ${fact}`);
    }
    if (plan.facts.trainingControl === 'user-setting' && !plan.facts.optOutPath) {
      issues.push(`${at}: a user-setting opt-out needs optOutPath`);
    }
    for (const [fact, cites] of Object.entries(plan.evidence)) checkCites(cites, `${at}.${fact}`);
    if (plan.price.status !== 'unverified') checkCites(plan.price.evidence, `${at}.price`);
    for (const c of plan.caveats) checkCites(c.evidence, `${at}.caveat`);
  }
  return issues;
}

export const Tool = ToolShape.superRefine((tool, ctx) => {
  const today = new Date().toISOString().slice(0, 10);
  for (const message of toolIssues(tool, today)) ctx.addIssue({ code: 'custom', message });
});

export type Tool = z.infer<typeof Tool>;
export type Plan = z.infer<typeof Plan>;
export type Facts = z.infer<typeof Facts>;
export type Source = z.infer<typeof Source>;
