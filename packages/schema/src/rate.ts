import type { Facts } from './tool.ts';

export type Rating = 'red' | 'amber' | 'green';

export interface RatingResult {
  rating: Rating;
  /** Shown with the label, e.g. "Amber — only after you switch off training". */
  condition?: string;
  /** Plain-English reasons, in order, used to build the sentence shown beside the rating. */
  reasons: string[];
}

export const OPT_OUT_CONDITION = 'only after you switch off training';

/**
 * Computes a plan's rating from its cited facts. Pure and table-tested.
 *
 * Red: anything unclear; training on with no way off; AI subprocessors may train.
 * Green: training off (by default or admin-enforced), a DPA, admin enforcement, and
 *   subprocessors barred from training (or the vendor is the model provider).
 * Amber: everything else. A personal opt-out makes it conditional.
 */
export function ratePlan(f: Facts): RatingResult {
  if (f.trainingDefault === 'unclear' || f.trainingControl === 'unclear' || f.dpa === 'unclear') {
    return {
      rating: 'red',
      reasons: ["the provider's documentation is unclear on how your data is used"],
    };
  }
  if (f.trainingDefault === 'on' && f.trainingControl === 'none') {
    return {
      rating: 'red',
      reasons: ['inputs are used for training and there is no way to turn it off'],
    };
  }
  if (f.subprocessorTraining === 'allowed') {
    return { rating: 'red', reasons: ["the provider's AI subprocessors may train on your inputs"] };
  }

  const conditional = f.trainingDefault === 'on' && f.trainingControl === 'user-setting';
  const reasons = [
    conditional
      ? 'training is on by default; you must switch it off yourself'
      : "inputs aren't used for training",
  ];

  const blockers: string[] = [];
  if (conditional) blockers.push('the opt-out is a personal setting your employer cannot enforce');
  if (f.dpa === 'none') blockers.push('no data processing agreement');
  if (!f.adminEnforcement) blockers.push('no admin controls to enforce settings');
  if (f.subprocessorTraining === 'not-stated') {
    blockers.push(
      "the provider doesn't say its AI subprocessors are barred from training on your data",
    );
  }

  if (blockers.length === 0) return { rating: 'green', reasons };
  return {
    rating: 'amber',
    ...(conditional ? { condition: OPT_OUT_CONDITION } : {}),
    reasons: [...reasons, ...blockers],
  };
}
