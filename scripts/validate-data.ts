import { readdirSync, readFileSync } from 'node:fs';
import { ratePlan, Tool } from '../packages/schema/src/index.ts';

const dir = new URL('../data/tools/', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
let failed = 0;

for (const file of files) {
  const raw: unknown = JSON.parse(readFileSync(new URL(file, dir), 'utf8'));
  const result = Tool.safeParse(raw);
  if (!result.success) {
    failed++;
    console.error(`✗ ${file}`);
    for (const issue of result.error.issues) {
      console.error(`    ${issue.path.join('.') || '(root)'}: ${issue.message}`);
    }
    continue;
  }
  const tool = result.data;
  if (file !== `${tool.slug}.json`) {
    failed++;
    console.error(`✗ ${file}: filename must match slug "${tool.slug}"`);
    continue;
  }
  console.log(`✓ ${file}`);
  for (const plan of tool.plans) {
    const r = ratePlan(plan.facts);
    console.log(`    ${plan.name}: ${r.rating}${r.condition ? ` (${r.condition})` : ''}`);
  }
}

console.log(`\n${files.length - failed}/${files.length} valid`);
process.exit(failed === 0 ? 0 : 1);
