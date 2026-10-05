# Status

As of 5 October 2026. This file is maintained by hand until the Phase 2 pipeline publishes a `/status` page.

## Phases

- **Phase 0, foundations:** shipped (PR #1). Monorepo, shared Zod schema with 100% branch coverage, rating rules, CI, ADRs 0001 to 0011.
- **Phase 1, dataset and directory:** in progress. 21 tool records and the web directory are merged (PRs #4 and #5). The gate is not yet passed.
- **Phase 2, verification pipeline:** not started.
- **Phase 3, AI triage and draft PRs:** not started.
- **Phase 4, API and MCP server:** not started.

Phases ship in order. A phase starts only when the previous gate passes.

## What is merged

- 21 tool records in `data/tools/`, each fact citing a vendor page with a verbatim quote.
- A static Astro directory that validates every record at build time.
- A quote verifier (`pnpm verify:quotes`) that checks each quote on its cited page and never evades bot challenges.

## Phase 1 gate: open items

- Assessments: no record has an `assessment` block yet.
- Manual source checks: the latest report found 499 quotes, 0 missing and 105 on unreachable pages. `data/reports/manual-check.md` still has 10 unticked items.
- Quote evidence: some quotes pass the verifier but prove little. Quality rules are planned.
- CI: no smoke, accessibility or Lighthouse checks yet.
- Candidate list: two of the 23 candidates are not yet added or rejected.

## Known issues

- The quote verifier workflow runs only on two fixed branches and commits its report back. It is being changed to run on pull requests.
- Production on Vercel may lag `main`. Check the deployment commit before relying on the live site.

## Not legal or compliance advice

A green rating means a vendor's terms make approval possible, not that a tool is safe. Your employer's policy takes precedence.
