# AI Success Network

**Verified AI tools for customer success managers.** Which tools help a CSM's workflow, which plan is safe for customer data, and the vendor evidence behind every answer.

> Status: rebuild in progress. Phase 0 (foundations) and the first Phase 1 dataset (21 tool records and the web directory) are merged. The Phase 1 gate is still open: assessments, manual source checks and CI hardening remain. See [docs/STATUS.md](docs/STATUS.md). The May 2025 prototype is preserved as [v0.1.0-2025-original](https://github.com/Camerongmccallum24/ai-success-network/releases/tag/v0.1.0-2025-original).

## The problem

Most individual CSMs have an employer-approved assistant, no CS platform and no clear answer on what they can paste where. Vendors' data policies differ by **plan**, not by product, and change without notice. Public guidance is mostly listicles.

Every tool page answers three questions:

1. Can this tool help with a specific CSM workflow?
2. Can I use it with customer data on my plan, in my environment?
3. What evidence supports that, and when was it last checked?

## How it works

- **Data:** one JSON file per tool in `data/tools/`. Every fact cites the vendor's own page with a short verbatim quote.
- **Ratings:** computed per plan by a tested rules function (`packages/schema`), never typed by hand. [ADR 0004](docs/adr/0004-ratings-computed-from-cited-facts.md) has the rules.
- **Site:** a static Astro site that validates every record at build time.
- **Verification (Phase 2–3):** a weekly GitHub Action re-reads every source, flags changes, and opens a draft PR with AI-proposed edits. A human merges every change.
- **MCP server (Phase 4):** the verified dataset, readable by AI assistants.

## Repository

```text
apps/web/           Astro site
packages/schema/    Zod schema, rating rules, derived fields (100% branch coverage)
data/tools/         One record per tool — the source of truth
docs/adr/           Architecture decision records
```

```sh
pnpm install
pnpm test        # schema and rating rules
pnpm build       # builds the site and validates every record
```

Node 22 and pnpm (version pinned in `package.json`).

## Decisions and limitations

Decisions are recorded in [docs/adr](docs/adr/). This is not legal or compliance advice: a green rating means a vendor's terms make approval possible, not that a tool is safe. Your employer's policy takes precedence.

## Built with AI

Built by Cameron McCallum with Claude as an engineering collaborator. Every change lands through a reviewed pull request with green CI.

## Licences

Code: [MIT](LICENSE). Dataset (`data/`): [CC BY 4.0](LICENSE-DATA).
