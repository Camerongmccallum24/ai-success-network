/**
 * Checks that every quote in data/tools/*.json appears verbatim on the page it cites.
 * Renders each source once in a headless browser (en-US), never evades challenges:
 * a page that looks like a challenge is reported "unreachable", not "missing".
 * Writes data/reports/quote-check.json and exits non-zero if any quote is missing.
 *
 *   pnpm verify:quotes            all tools
 *   pnpm verify:quotes granola    one tool
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';
import { Tool } from '../packages/schema/src/index.ts';

const dataDir = new URL('../data/tools/', import.meta.url);
const reportUrl = new URL('../data/reports/quote-check.json', import.meta.url);
const CHALLENGE =
  /just a moment|verify you are human|checking your browser|attention required|access denied|are you a robot|captcha|enable javascript and cookies|security verification|malicious bots|waiting for [a-z.]+ to respond|ray id|error loading page/i;

/** Quotes are compared after folding typographic variants and whitespace. */
const fold = (s: string): string =>
  s
    .normalize('NFKC')
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[‐-―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

interface Check {
  tool: string;
  source: string;
  url: string;
  verify: string;
  status: 'found' | 'missing' | 'unreachable';
  quote: string;
  where: string;
  /** For a missing quote: the closest passage actually on the page, so the quote can be fixed. */
  nearest?: string;
}

/** The page passage sharing the most words with the quote (for fixing a missing quote). */
function nearestPassage(text: string, quote: string): string {
  const want = new Set(fold(quote).split(' '));
  const words = text.split(' ');
  const size = Math.max(8, fold(quote).split(' ').length + 6);
  let best = 0;
  let bestAt = 0;
  for (let i = 0; i + size <= words.length; i += 2) {
    let score = 0;
    for (const w of words.slice(i, i + size)) if (want.has(w)) score++;
    if (score > best) {
      best = score;
      bestAt = i;
    }
  }
  return words.slice(bestAt, bestAt + size).join(' ');
}

const only = process.argv[2];
const tools = readdirSync(dataDir)
  .filter((f) => f.endsWith('.json') && (!only || f === `${only}.json`))
  .map((f) => Tool.parse(JSON.parse(readFileSync(new URL(f, dataDir), 'utf8'))));

const browser = await chromium.launch();
const context = await browser.newContext({
  locale: 'en-US',
  userAgent:
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 AISuccessNetworkBot/0.1 (+https://github.com/Camerongmccallum24/ai-success-network)',
});

const pageText = new Map<string, string | null>();
async function textOf(url: string): Promise<string | null> {
  if (pageText.has(url)) return pageText.get(url) ?? null;
  let text: string | null = null;
  for (let attempt = 0; attempt < 2 && text === null; attempt++) {
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30_000 });
      await page.waitForTimeout(3000);
      // innerText = what is visible; textContent adds collapsed accordions and tabs.
      const body = await page.evaluate(() => {
        const clone = document.body.cloneNode(true) as HTMLElement;
        clone.querySelectorAll('script, style, noscript').forEach((n) => n.remove());
        return `${document.body.innerText} ${clone.textContent ?? ''}`;
      });
      if (!CHALLENGE.test(body.slice(0, 3000)) && body.length > 200) text = fold(body);
    } catch {
      /* retry once, then unreachable */
    } finally {
      await page.close();
    }
  }
  pageText.set(url, text);
  return text;
}

const checks: Check[] = [];
for (const tool of tools) {
  const sources = new Map(tool.sources.map((s) => [s.id, s]));
  const cites: { source: string; quote: string; where: string }[] = [];
  for (const plan of tool.plans) {
    const at = `${plan.name}`;
    for (const [fact, list] of Object.entries(plan.evidence))
      for (const c of list) cites.push({ ...c, where: `${at}.${fact}` });
    if (plan.price.status !== 'unverified')
      for (const c of plan.price.evidence) cites.push({ ...c, where: `${at}.price` });
    for (const cav of plan.caveats)
      for (const c of cav.evidence) cites.push({ ...c, where: `${at}.caveat` });
  }
  for (const c of cites) {
    const src = sources.get(c.source);
    if (!src) continue; // schema already rejects unknown sources
    const text = await textOf(src.url);
    checks.push({
      tool: tool.slug,
      source: src.id,
      url: src.url,
      verify: src.verify,
      status: text === null ? 'unreachable' : text.includes(fold(c.quote)) ? 'found' : 'missing',
      quote: c.quote,
      where: c.where,
      ...(text !== null && !text.includes(fold(c.quote))
        ? { nearest: nearestPassage(text, c.quote) }
        : {}),
    });
  }
}
await browser.close();

mkdirSync(new URL('./', reportUrl), { recursive: true });
const summary = {
  checkedAt: new Date().toISOString(),
  found: checks.filter((c) => c.status === 'found').length,
  missing: checks.filter((c) => c.status === 'missing').length,
  unreachable: checks.filter((c) => c.status === 'unreachable').length,
};
writeFileSync(reportUrl, JSON.stringify({ summary, checks }, null, 2) + '\n');
console.log(summary);
for (const c of checks.filter((x) => x.status !== 'found'))
  console.log(`${c.status.toUpperCase()} ${c.tool}/${c.where} [${c.source}] "${c.quote}"`);

// A human checklist for sources the runner cannot read.
const byPage = new Map<string, Check[]>();
for (const c of checks.filter((x) => x.status === 'unreachable'))
  byPage.set(`${c.tool} — ${c.url}`, [...(byPage.get(`${c.tool} — ${c.url}`) ?? []), c]);
const lines = [
  '# Manual quote checks',
  '',
  "These pages block the verifier's browser (and it never tries to evade). Open each in your browser, Ctrl+F each quote, and tick it if it appears. Tell Claude about any that don't.",
];
for (const [page, list] of byPage) {
  lines.push('', `## ${page}`, '');
  for (const q of new Set(list.map((c) => `- [ ] (${c.where}) ${c.quote}`))) lines.push(q);
}
writeFileSync(new URL('../data/reports/manual-check.md', import.meta.url), lines.join('\n') + '\n');
process.exit(summary.missing === 0 ? 0 : 1);
