// Fetch-feasibility spike. Throwaway code: answers "can a GitHub-hosted runner
// read vendor source pages, and does it need a headless browser?" before the
// Phase 2 pipeline is designed in detail. Sequential, polite, robots-aware.
import { readFile, writeFile, appendFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import robotsParser from 'robots-parser';

const UA_TOKEN = 'AISuccessNetworkBot';
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 ' +
  `${UA_TOKEN}/0.1 (+https://github.com/Camerongmccallum24/ai-success-network)`;
const TIMEOUT = 30_000;
const CHALLENGE =
  /just a moment|verify you are human|checking your browser|attention required|access denied|are you a robot|captcha|cf-chl|px-captcha|enable javascript and cookies/i;
const PRICE = /[$£€]\s?\d/g;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const count = (s, re) => (s.match(re) || []).length;
const currencies = (s) => ({
  usd: count(s, /\$\s?\d/g),
  gbp: count(s, /£\s?\d/g),
  eur: count(s, /€\s?\d/g),
});
const stripHtml = (h) =>
  h
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

async function withRetry(fn) {
  let last;
  for (let i = 0; i < 3; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      await sleep(2000 * 2 ** i);
    }
  }
  throw last;
}

const robotsCache = new Map();
async function robotsAllows(url) {
  const origin = new URL(url).origin;
  if (!robotsCache.has(origin)) {
    let body = '';
    try {
      const r = await fetch(`${origin}/robots.txt`, {
        headers: { 'user-agent': UA },
        signal: AbortSignal.timeout(TIMEOUT),
      });
      if (r.ok) body = await r.text();
    } catch {
      /* no robots.txt reachable = allowed */
    }
    robotsCache.set(origin, robotsParser(`${origin}/robots.txt`, body));
  }
  return robotsCache.get(origin).isAllowed(url, UA_TOKEN) !== false;
}

async function plainFetch(url) {
  return withRetry(async () => {
    const r = await fetch(url, {
      headers: { 'user-agent': UA, 'accept-language': 'en-GB,en;q=0.9' },
      redirect: 'follow',
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const html = await r.text();
    const text = stripHtml(html);
    return {
      status: r.status,
      finalUrl: r.url,
      textLength: text.length,
      challenge: CHALLENGE.test(text.slice(0, 5000)),
      prices: count(text, PRICE),
    };
  });
}

async function browserFetch(browser, url, { locale, timezoneId }) {
  return withRetry(async () => {
    const ctx = await browser.newContext({
      userAgent: UA,
      locale,
      timezoneId,
      extraHTTPHeaders: { 'accept-language': `${locale},en;q=0.9` },
    });
    const page = await ctx.newPage();
    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
      await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
      const text = await page.evaluate(() => document.body?.innerText ?? '');
      return {
        status: resp?.status() ?? null,
        finalUrl: page.url(),
        title: (await page.title()).slice(0, 120),
        textLength: text.length,
        challenge: CHALLENGE.test(text.slice(0, 5000)),
        prices: count(text, PRICE),
        currencies: currencies(text),
      };
    } finally {
      await ctx.close();
    }
  });
}

function classify(row) {
  const b = row.browserUS;
  if (!row.robotsAllowed) return 'robots-disallowed';
  if (!b) return 'unreachable';
  if (b.status === 404 || b.status === 410) return 'not-found';
  if (b.challenge || [401, 403, 429, 503].includes(b.status)) return 'blocked';
  if (b.textLength < 200) return 'empty';
  const p = row.plain;
  const staticOk =
    p && p.status === 200 && !p.challenge && p.textLength >= 0.5 * b.textLength &&
    (row.kind !== 'pricing' || p.prices > 0 || b.prices === 0);
  return staticOk ? 'ok-static' : 'ok-browser-only';
}

const urls = JSON.parse(await readFile(new URL('./urls.json', import.meta.url)));
const browser = await chromium.launch();
const results = [];

// Run 2: one persistent context per domain (keeps cookies, as a normal browser
// would), same-domain requests spaced 5 s apart, domains interleaved.
const byHost = new Map();
for (const u of urls) {
  const h = new URL(u.url).hostname.split('.').slice(-2).join('.');
  if (!byHost.has(h)) byHost.set(h, []);
  byHost.get(h).push(u);
}
const contexts = new Map();
const lastHit = new Map();
const queue = [];
for (let i = 0; byHost.size && [...byHost.values()].some((l) => l.length > i); i++)
  for (const list of byHost.values()) if (list[i]) queue.push(list[i]);

async function domainFetch(u) {
  const h = new URL(u.url).hostname.split('.').slice(-2).join('.');
  if (!contexts.has(h))
    contexts.set(h, await browser.newContext({
      userAgent: UA, locale: 'en-US', timezoneId: 'America/New_York',
      extraHTTPHeaders: { 'accept-language': 'en-US,en;q=0.9' },
    }));
  const wait = 5000 - (Date.now() - (lastHit.get(h) ?? 0));
  if (wait > 0) await sleep(wait);
  lastHit.set(h, Date.now());
  const page = await contexts.get(h).newPage();
  try {
    const resp = await page.goto(u.url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    await page.waitForLoadState('networkidle', { timeout: 10_000 }).catch(() => {});
    const text = await page.evaluate(() => document.body?.innerText ?? '');
    return {
      status: resp?.status() ?? null, finalUrl: page.url(), title: (await page.title()).slice(0, 120),
      textLength: text.length, challenge: CHALLENGE.test(text.slice(0, 5000)),
      prices: count(text, PRICE), currencies: currencies(text),
    };
  } finally {
    await page.close();
  }
}

for (const u of queue) {
  const row = { ...u, robotsAllowed: true, plain: null, browserUS: null, browserGB: null, errors: [] };
  try { row.robotsAllowed = await robotsAllows(u.url); } catch (e) { row.errors.push(`robots: ${e.message}`); }
  if (row.robotsAllowed) {
    try { row.browserUS = await withRetry(() => domainFetch(u)); } catch (e) { row.errors.push(`browser: ${e.message}`); }
  }
  row.outcome = classify(row);
  if (row.outcome === 'ok-browser-only') row.outcome = 'ok';
  results.push(row);
  console.log(`${row.outcome.padEnd(18)} ${u.url}`);
}
await browser.close();

await writeFile('results.json', JSON.stringify(results, null, 2));

const tally = results.reduce((a, r) => ((a[r.outcome] = (a[r.outcome] || 0) + 1), a), {});
const cur = (c) => (c ? `$${c.usd} £${c.gbp} €${c.eur}` : '');
let md = `## Fetch-feasibility spike\n\n${results.length} URLs. ` +
  Object.entries(tally).map(([k, v]) => `**${k}**: ${v}`).join(' · ') + '\n\n';
md += '| Tool | Kind | Outcome | Plain status/len/prices | Browser status/len/prices | US currencies | GB-locale currencies | URL |\n|---|---|---|---|---|---|---|---|\n';
for (const r of results) {
  const p = r.plain ? `${r.plain.status}/${r.plain.textLength}/${r.plain.prices}` : '—';
  const b = r.browserUS ? `${r.browserUS.status}/${r.browserUS.textLength}/${r.browserUS.prices}` : '—';
  md += `| ${r.tool} | ${r.kind} | ${r.outcome} | ${p} | ${b} | ${cur(r.browserUS?.currencies)} | ${cur(r.browserGB?.currencies)} | ${r.url} |\n`;
}
await writeFile('summary.md', md);
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, md);
