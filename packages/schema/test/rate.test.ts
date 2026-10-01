import { describe, expect, test } from 'vitest';
import { OPT_OUT_CONDITION, ratePlan } from '../src/rate.ts';
import type { Facts } from '../src/tool.ts';

const green: Facts = {
  trainingDefault: 'off',
  trainingControl: 'not-needed',
  subprocessorTraining: 'excluded',
  dpa: 'on-request',
  adminEnforcement: true,
};

// [case, patch over the all-green plan, expected rating, expected condition]
const cases: [string, Partial<Facts>, 'red' | 'amber' | 'green', string | undefined][] = [
  ['every condition met', {}, 'green', undefined],
  ['vendor is the model provider', { subprocessorTraining: 'first-party' }, 'green', undefined],
  ['DPA incorporated in the terms', { dpa: 'incorporated' }, 'green', undefined],
  [
    'on by default but admin-enforced off',
    { trainingDefault: 'on', trainingControl: 'admin-enforced' },
    'green',
    undefined,
  ],
  ['training default unclear', { trainingDefault: 'unclear' }, 'red', undefined],
  ['training control unclear', { trainingControl: 'unclear' }, 'red', undefined],
  ['DPA unclear', { dpa: 'unclear' }, 'red', undefined],
  [
    'on by default with no way off',
    { trainingDefault: 'on', trainingControl: 'none' },
    'red',
    undefined,
  ],
  ['subprocessors may train', { subprocessorTraining: 'allowed' }, 'red', undefined],
  [
    'on by default with a personal opt-out',
    { trainingDefault: 'on', trainingControl: 'user-setting' },
    'amber',
    OPT_OUT_CONDITION,
  ],
  ['no DPA', { dpa: 'none' }, 'amber', undefined],
  ['no admin enforcement', { adminEnforcement: false }, 'amber', undefined],
  ['subprocessor training not stated', { subprocessorTraining: 'not-stated' }, 'amber', undefined],
];

describe('ratePlan', () => {
  test.each(cases)('%s → %s', (_name, patch, rating, condition) => {
    const result = ratePlan({ ...green, ...patch });
    expect(result.rating).toBe(rating);
    expect(result.condition).toBe(condition);
    expect(result.reasons.length).toBeGreaterThan(0);
  });

  test('amber lists every green blocker as a reason', () => {
    const result = ratePlan({
      trainingDefault: 'on',
      trainingControl: 'user-setting',
      subprocessorTraining: 'not-stated',
      dpa: 'none',
      adminEnforcement: false,
    });
    expect(result.reasons).toEqual([
      'training is on by default; you must switch it off yourself',
      'the opt-out is a personal setting your employer cannot enforce',
      'no data processing agreement',
      'no admin controls to enforce settings',
      "the provider doesn't say its AI subprocessors are barred from training on your data",
    ]);
  });
});
