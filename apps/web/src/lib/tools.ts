import { getCollection } from 'astro:content';
import { needsItApproval, ratePlan, type Plan, type Rating, type RatingResult } from '@asn/schema';
import type { Tool } from '@asn/schema';

export interface RatedPlan {
  plan: Plan;
  result: RatingResult;
  /** The rating after any written override. */
  rating: Rating;
  free: boolean;
}

export interface RatedTool {
  tool: Tool;
  plans: RatedPlan[];
  /** The best rating any plan achieves. */
  best: Rating;
  hasFreeTier: boolean;
  itApproval: boolean;
  lastVerified: string;
}

const ORDER: Record<Rating, number> = { red: 0, amber: 1, green: 2 };

export function rateTool(tool: Tool): RatedTool {
  const plans = tool.plans.map((plan): RatedPlan => {
    const result = ratePlan(plan.facts);
    return {
      plan,
      result,
      rating: plan.ratingOverride?.rating ?? result.rating,
      free:
        plan.price.status === 'listed' &&
        plan.price.amounts.some((a) => a.amount === 0) &&
        plan.audience === 'personal',
    };
  });
  const best = plans.reduce<Rating>((b, p) => (ORDER[p.rating] > ORDER[b] ? p.rating : b), 'red');
  return {
    tool,
    plans,
    best,
    hasFreeTier: plans.some((p) => p.free),
    itApproval: needsItApproval(tool),
    lastVerified: tool.sources.map((s) => s.lastVerified).sort()[0] ?? '',
  };
}

export async function getRatedTools(): Promise<RatedTool[]> {
  const entries = await getCollection('tools');
  return entries
    .map((e) => rateTool(e.data))
    .sort((a, b) => a.tool.name.localeCompare(b.tool.name));
}

export const RATING_LABEL: Record<Rating, string> = {
  green: 'Green',
  amber: 'Amber',
  red: 'Red',
};

export const RATING_MEANING: Record<Rating, string> = {
  green: 'Fit for customer data on this plan, on the evidence.',
  amber: 'Usable with conditions: read the reasons.',
  red: 'Not recommended for customer data, or the vendor is unclear.',
};

export const WORKFLOW_LABEL: Record<string, string> = {
  'call-notes': 'Call notes',
  'follow-up-email': 'Follow-up email',
  'qbr-prep': 'QBR prep',
  'account-research': 'Account research',
  onboarding: 'Onboarding',
  'renewal-prep': 'Renewal prep',
  'risk-review': 'Risk review',
  'async-video': 'Async video',
  'knowledge-search': 'Knowledge search',
  reporting: 'Reporting',
  'feedback-synthesis': 'Feedback synthesis',
  automation: 'Automation',
};

export const ENV_LABEL: Record<string, string> = {
  m365: 'Microsoft 365',
  'google-workspace': 'Google Workspace',
  standalone: 'Standalone',
};

export function priceText(plan: Plan): string {
  const p = plan.price;
  if (p.status === 'contact-sales') return 'Contact sales';
  if (p.status === 'unverified') return 'Price not verified';
  const sym = { USD: '$', GBP: '£', EUR: '€' }[p.currency];
  const parts = p.amounts.map((a) =>
    a.amount === 0
      ? 'Free'
      : `${sym}${a.amount}${a.billing === 'annual' ? ' billed annually' : a.billing === 'monthly' ? ' billed monthly' : ''}`,
  );
  const unit = p.per === 'user-month' ? ' per user / month' : ' / month';
  return parts.join(' · ') + (parts.every((x) => x === 'Free') ? '' : unit);
}

export const FACT_TEXT = {
  trainingDefault: { on: 'On by default', off: 'Off by default', unclear: 'Unclear' },
  trainingControl: {
    'user-setting': 'Personal setting only',
    'admin-enforced': 'Enforced by admin',
    none: 'No way to turn off',
    unclear: 'Unclear',
    'not-needed': 'Not needed',
  },
  subprocessorTraining: {
    excluded: 'Barred from training',
    'not-stated': 'Not stated',
    allowed: 'May train',
    'first-party': 'Vendor is the model provider',
  },
  dpa: {
    incorporated: 'Built into terms',
    'on-request': 'On request',
    none: 'None',
    unclear: 'Unclear',
  },
} as const;
