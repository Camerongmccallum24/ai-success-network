// Schema pilot — v2 candidate. Amends the spec's v1 schema with what the
// ChatGPT / Granola / Gamma pilot showed. Plain JS + Zod 4 so the spike runs
// with no build step; Phase 1 ports this to TypeScript in packages/schema.
import * as z from 'zod';

export const Workflow = z.enum([
  'call-notes', 'follow-up-email', 'qbr-prep', 'account-research',
  'onboarding', 'renewal-prep', 'risk-review', 'async-video',
  'knowledge-search', 'reporting', 'feedback-synthesis', 'automation',
]);

export const Source = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  url: z.url(),
  kind: z.enum(['pricing', 'privacy', 'terms', 'dpa', 'trust', 'help']),
  // CHANGE: pricing pages that render prices client-side need a browser.
  render: z.enum(['static', 'browser']).default('static'),
  extract: z.object({ selector: z.string().optional(), startsAt: z.string().optional() }).default({}),
  lastVerified: z.iso.date(),
});

// CHANGE: evidence carries a short verbatim quote, not just a source id.
// Quotes make review and AI triage checkable ("is this still on the page?").
const Cite = z.object({ source: z.string(), quote: z.string().min(2).max(240) });
const Cites = z.array(Cite).min(1);

// CHANGE: price is a union, not amount|null. "Contact sales" and "we could
// not read the price" are different things and must not share null.
const Price = z.discriminatedUnion('status', [
  z.object({
    status: z.literal('listed'),
    currency: z.enum(['GBP', 'USD', 'EUR']),
    per: z.enum(['user-month', 'month']),
    // CHANGE: vendors quote monthly and annual-billed prices, and some don't
    // say which. Keep each amount with its billing basis.
    amounts: z.array(z.object({
      amount: z.number().nonnegative(),
      billing: z.enum(['monthly', 'annual', 'unstated']),
    })).min(1),
    minSeats: z.number().int().positive().optional(),
    evidence: Cites,
  }),
  z.object({ status: z.literal('contact-sales'), evidence: Cites }),
  z.object({ status: z.literal('unverified'), reason: z.string().min(10) }),
]);

// CHANGE: v1's single trainsOnInputs enum mixed "default" and "opt-out" into
// one value, but the commonest real case is "on by default AND you can opt
// out". Split into default + control, plus the third-party question.
const Facts = z.object({
  trainingDefault: z.enum(['on', 'off', 'unclear']),
  trainingControl: z.enum(['user-setting', 'admin-enforced', 'none', 'unclear', 'not-needed']),
  optOutPath: z.string().optional(), // where the user flips it, shown verbatim
  // Does the vendor say its AI subprocessors (OpenAI, Anthropic, ...) can't
  // train on your data? 'first-party' = the vendor is the model provider.
  subprocessorTraining: z.enum(['excluded', 'not-stated', 'allowed', 'first-party']),
  // CHANGE: 'yes' split by how you get it; matters for an IC on a £14 plan.
  dpa: z.enum(['incorporated', 'on-request', 'none', 'unclear']),
  // CHANGE: v1 adminControls ("SSO, retention or workspace admin") was true
  // for almost everything. Narrowed to the thing the rating needs.
  adminEnforcement: z.boolean(), // an org admin can enforce data settings for all users
});

const FactKey = Facts.keyof();

export const Plan = z.object({
  name: z.string(),
  audience: z.enum(['personal', 'business', 'enterprise']),
  price: Price,
  facts: Facts,
  evidence: z.partialRecord(FactKey, Cites),
  // CHANGE: things a CSM must know that are not rating inputs.
  caveats: z.array(z.object({ text: z.string().max(200), evidence: Cites })).default([]),
  ratingOverride: z.object({ rating: z.enum(['red', 'amber', 'green']), reason: z.string().min(40) }).optional(),
});

export const Tool = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  vendor: z.string(),
  website: z.url(),
  summary: z.string().max(160),
  baseline: z.boolean().default(false), // the four assistants exempt from the price ceiling
  workflows: z.array(Workflow).min(1),
  worksWith: z.array(z.enum(['m365', 'google-workspace', 'standalone'])).min(1),
  form: z.array(z.enum(['web', 'desktop', 'mobile', 'browser-extension', 'meeting-bot', 'integration'])).min(1),
  assessment: z.object({ bestFor: z.string(), watchOut: z.string(), take: z.string().max(280) }),
  plans: z.array(Plan).min(1),
  sources: z.array(Source).min(2),
}).superRefine((t, ctx) => {
  const ids = new Set(t.sources.map((s) => s.id));
  const kinds = new Set(t.sources.map((s) => s.kind));
  if (!kinds.has('pricing')) ctx.addIssue({ code: 'custom', message: 'needs a pricing source' });
  if (!['privacy', 'trust', 'help', 'dpa', 'terms'].some((k) => kinds.has(k)))
    ctx.addIssue({ code: 'custom', message: 'needs a privacy/trust source' });
  const today = new Date().toISOString().slice(0, 10);
  t.sources.forEach((s) => s.lastVerified > today && ctx.addIssue({ code: 'custom', message: `${s.id} verified in the future` }));
  const check = (cites, where) =>
    cites.forEach((c) => ids.has(c.source) || ctx.addIssue({ code: 'custom', message: `${where}: unknown source ${c.source}` }));
  for (const p of t.plans) {
    // Every rating-driving fact needs evidence. 'not-needed' control is implied by default 'off'.
    for (const k of FactKey.options) {
      if (k === 'optOutPath') continue;
      if (k === 'trainingControl' && p.facts.trainingControl === 'not-needed') continue;
      if (!p.evidence[k]) ctx.addIssue({ code: 'custom', message: `${t.slug}/${p.name}: no evidence for ${k}` });
    }
    if (p.facts.trainingControl === 'user-setting' && !p.facts.optOutPath)
      ctx.addIssue({ code: 'custom', message: `${t.slug}/${p.name}: user-setting opt-out needs optOutPath` });
    Object.entries(p.evidence).forEach(([k, v]) => check(v, `${p.name}.${k}`));
    if ('evidence' in p.price) check(p.price.evidence, `${p.name}.price`);
    p.caveats.forEach((c) => check(c.evidence, `${p.name}.caveat`));
  }
});

// ---- Rating rules (per plan) -------------------------------------------
// Returns { rating, condition?, reasons[] }. Pure; table-tested in rules.test.mjs.
export function ratePlan(f) {
  const reasons = [];
  if (f.trainingDefault === 'unclear' || f.trainingControl === 'unclear' || f.dpa === 'unclear')
    return { rating: 'red', reasons: ["the provider's documentation is unclear on how your data is used"] };
  if (f.trainingDefault === 'on' && f.trainingControl === 'none')
    return { rating: 'red', reasons: ['inputs are used for training and there is no way to turn it off'] };
  if (f.subprocessorTraining === 'allowed')
    return { rating: 'red', reasons: ["the provider's AI subprocessors may train on your inputs"] };

  // Training is off by default, admin-enforced off, or the user can turn it off.
  const conditional = f.trainingDefault === 'on' && f.trainingControl === 'user-setting';
  if (conditional) reasons.push('training is on by default; you must switch it off yourself');
  else reasons.push("inputs aren't used for training");

  const greenBlockers = [];
  if (conditional) greenBlockers.push('the opt-out is a personal setting your employer cannot enforce');
  if (f.dpa === 'none') greenBlockers.push('no data processing agreement');
  if (!f.adminEnforcement) greenBlockers.push('no admin controls to enforce settings');
  if (f.subprocessorTraining === 'not-stated')
    greenBlockers.push("the provider doesn't say its AI subprocessors are barred from training on your data");

  if (greenBlockers.length === 0) return { rating: 'green', reasons };
  return {
    rating: 'amber',
    ...(conditional ? { condition: 'only after you switch off training' } : {}),
    reasons: [...reasons, ...greenBlockers],
  };
}

// CHANGE: v1 flagged any tool with an approval-prone form, so ChatGPT (which
// also has a desktop app) was flagged. A tool needs approval if a bot joins
// customer calls, or if there's no browser/mobile way to use it at all.
export const needsItApproval = (t) =>
  t.form.includes('meeting-bot') || !t.form.some((f) => f === 'web' || f === 'mobile');
