# 0008. One shared Zod schema package for site, pipeline and MCP server

- Status: accepted (Phase 0 compatibility check passed, 2026-10-01)
- Date: 2026-10-01

## Context

Astro's content collections bundle their own Zod. A second Zod instance would make the shared schema's types or runtime checks diverge from Astro's.

## Decision

`@asn/schema` depends on `zod` 4.6.5 and is used directly as the `tools` collection schema in `apps/web`.

## Evidence

- `pnpm` resolves a single `zod@4.6.5` across the workspace (Astro 7.3 depends on `^4.5.4`).
- `astro check` passes with the shared schema in `content.config.ts`.
- Building with the three pilot records renders "3 verified tools"; adding a malformed record fails the build with `InvalidContentEntryDataError`. Cross-field rules (`superRefine`) run inside Astro's validation.

## Consequences

- A schema change is one edit, picked up by every consumer.
- Upgrades keep Zod aligned with Astro's range; Dependabot groups them.
