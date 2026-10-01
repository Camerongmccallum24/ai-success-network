// Table-driven tests for the candidate rating rules. Phase 1 ports these to
// Vitest with full branch coverage; here they pin the behaviour the pilot found.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ratePlan } from './schema.mjs';

const base = { trainingDefault: 'off', trainingControl: 'not-needed', subprocessorTraining: 'excluded', dpa: 'on-request', adminEnforcement: true };

const cases = [
  ['all good → green', {}, 'green', undefined],
  ['first-party provider counts as excluded', { subprocessorTraining: 'first-party' }, 'green', undefined],
  ['training unclear → red', { trainingDefault: 'unclear' }, 'red', undefined],
  ['dpa unclear → red', { dpa: 'unclear' }, 'red', undefined],
  ['on by default, no opt-out → red', { trainingDefault: 'on', trainingControl: 'none' }, 'red', undefined],
  ['on by default, user opt-out → conditional amber', { trainingDefault: 'on', trainingControl: 'user-setting' }, 'amber', 'only after you switch off training'],
  ['on by default, admin-enforced off, everything else good → green', { trainingDefault: 'on', trainingControl: 'admin-enforced' }, 'green', undefined],
  ['no DPA → amber', { dpa: 'none' }, 'amber', undefined],
  ['no admin enforcement → amber', { adminEnforcement: false }, 'amber', undefined],
  ['subprocessor training not stated → amber', { subprocessorTraining: 'not-stated' }, 'amber', undefined],
  ['subprocessors allowed to train → red', { subprocessorTraining: 'allowed' }, 'red', undefined],
];

for (const [name, patch, rating, condition] of cases) {
  test(name, () => {
    const r = ratePlan({ ...base, ...patch });
    assert.equal(r.rating, rating);
    assert.equal(r.condition, condition);
    assert.ok(r.reasons.length > 0, 'every rating carries a reason');
  });
}
