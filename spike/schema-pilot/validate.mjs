// Validates the pilot records and prints each plan's computed rating.
import { readFile, readdir } from 'node:fs/promises';
import { Tool, ratePlan, needsItApproval } from './schema.mjs';

const dir = new URL('./records/', import.meta.url);
let failed = false;
for (const f of (await readdir(dir)).filter((f) => f.endsWith('.json'))) {
  const raw = JSON.parse(await readFile(new URL(f, dir)));
  const r = Tool.safeParse(raw);
  if (!r.success) {
    failed = true;
    console.log(`✗ ${f}`);
    for (const i of r.error.issues) console.log(`   ${i.path.join('.')}: ${i.message}`);
    continue;
  }
  const t = r.data;
  console.log(`✓ ${t.name}${needsItApproval(t) ? '  [likely needs IT approval]' : ''}`);
  for (const p of t.plans) {
    const { rating, condition, reasons } = ratePlan(p.facts);
    const price = p.price.status === 'listed'
      ? p.price.amounts.map((a) => `${p.price.currency} ${a.amount} (${a.billing})`).join(' / ')
      : p.price.status;
    console.log(`   ${p.name.padEnd(11)} ${rating.toUpperCase().padEnd(6)}${condition ? ` (${condition})` : ''}  ${price}`);
    console.log(`               ${reasons.join('; ')}`);
  }
}
process.exit(failed ? 1 : 0);
