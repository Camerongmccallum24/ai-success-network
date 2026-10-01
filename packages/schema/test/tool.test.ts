import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, test } from 'vitest';
import { needsItApproval } from '../src/derived.ts';
import { Tool, toolIssues } from '../src/tool.ts';

const fixtureDir = new URL('./fixtures/', import.meta.url);
const load = (name: string): unknown =>
  JSON.parse(readFileSync(new URL(name, fixtureDir), 'utf8')) as unknown;
const fixtures = readdirSync(fixtureDir).filter((f) => f.endsWith('.json'));

/** A parsed copy of a fixture, for building invalid variants. */
const parsed = (name: string) => Tool.parse(load(name));
const issuesOf = (tool: ReturnType<typeof parsed>) => toolIssues(tool, '2026-10-01');

describe('pilot records', () => {
  test.each(fixtures)('%s parses', (name) => {
    const result = Tool.safeParse(load(name));
    expect(result.success, JSON.stringify(result.error?.issues, null, 2)).toBe(true);
  });
});

describe('cross-field rules', () => {
  test('a valid record has no issues', () => {
    expect(issuesOf(parsed('granola.json'))).toEqual([]);
  });

  test('evidence must point at a known source', () => {
    const t = parsed('granola.json');
    t.plans[0]!.evidence.dpa = [{ source: 'nope', quote: 'DPA available' }];
    expect(issuesOf(t)).toContain('granola/Basic.dpa: unknown source nope');
  });

  test('price and caveat evidence must point at a known source', () => {
    const t = parsed('granola.json');
    const plan = t.plans[0]!;
    if (plan.price.status !== 'listed') throw new Error('fixture changed');
    plan.price.evidence = [{ source: 'gone', quote: '$0' }];
    plan.caveats = [{ text: 'x', evidence: [{ source: 'gone', quote: 'xx' }] }];
    const issues = issuesOf(t);
    expect(issues).toContain('granola/Basic.price: unknown source gone');
    expect(issues).toContain('granola/Basic.caveat: unknown source gone');
  });

  test('every rated fact needs evidence', () => {
    const t = parsed('granola.json');
    delete t.plans[0]!.evidence.adminEnforcement;
    expect(issuesOf(t)).toContain('granola/Basic: no evidence for adminEnforcement');
  });

  test("'not-needed' training control needs no evidence of its own", () => {
    const t = parsed('chatgpt.json');
    const business = t.plans.find((p) => p.name === 'Business')!;
    expect(business.evidence.trainingControl).toBeUndefined();
    expect(issuesOf(t)).toEqual([]);
  });

  test('a user-setting opt-out needs its path', () => {
    const t = parsed('granola.json');
    delete t.plans[0]!.facts.optOutPath;
    expect(issuesOf(t)).toContain('granola/Basic: a user-setting opt-out needs optOutPath');
  });

  test('needs a pricing and a privacy source, with unique ids', () => {
    const t = parsed('granola.json');
    t.sources = t.sources.map((s) => ({ ...s, kind: 'help' as const, id: 'same' }));
    const pricingOnly = parsed('granola.json');
    pricingOnly.sources = pricingOnly.sources.map((s) => ({ ...s, kind: 'pricing' as const }));
    expect(issuesOf(t)).toEqual(
      expect.arrayContaining(['source ids must be unique', 'needs a pricing source']),
    );
    expect(issuesOf(pricingOnly)).toContain('needs a privacy or trust source');
  });

  test('verification dates cannot be in the future', () => {
    const t = parsed('granola.json');
    t.sources[0]!.lastVerified = '2099-01-01';
    expect(issuesOf(t)).toContain('granola-pricing: lastVerified is in the future');
  });

  test('Tool.parse surfaces cross-field issues', () => {
    const raw = load('granola.json') as { sources: { lastVerified: string }[] };
    raw.sources[0]!.lastVerified = '2099-01-01';
    const result = Tool.safeParse(raw);
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((i) => i.message)).toContain(
      'granola-pricing: lastVerified is in the future',
    );
  });
});

describe('needsItApproval', () => {
  test.each([
    [['web'], false],
    [['web', 'desktop'], false],
    [['mobile'], false],
    [['desktop'], true],
    [['web', 'meeting-bot'], true],
  ] as const)('%j → %s', (form, expected) => {
    expect(needsItApproval({ form: [...form] })).toBe(expected);
  });
});
