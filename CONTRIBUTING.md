# Contributing

## Rules that don't bend

- Nothing reaches `main` without a pull request, green CI and a Vercel preview.
- One concern per PR. Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/).
- Facts come only from the vendor's own pricing, privacy, terms, DPA, trust-centre or help pages. Third-party articles never set a fact.
- Every rating-driving fact cites a source and a verbatim quote. If a vendor's documentation is unclear, the fact is `unclear`, which rates red.
- Ratings are computed by `ratePlan`; an override needs a written reason.
- Architecture changes need an ADR in `docs/adr/`.

## Setup

```sh
corepack enable
pnpm install
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

CI runs the same five steps.

## Reporting an error

Open an issue with the tool, the plan, what's wrong and a link to the vendor's page that shows it. Corrections are handled within 7 days.
