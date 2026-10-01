# 0002. Astro static site with React islands, not the Vite SPA

- Status: accepted
- Date: 2026-10-01

## Context

The directory needs one shareable, indexable page per tool, almost no client JavaScript, and build-time validation of every record.

## Decision

Astro 7 with static output. React 19 islands are added only for interactive filters (Phase 1). Records load through an Astro content collection validated by the shared schema.

## Considered options

- Keep the Vite SPA: no per-tool URLs, poor SEO and link previews.
- Next.js: server features we would not use, more to operate.

## Consequences

- Each tool gets a static URL with its own title, description and Open Graph image.
- An invalid record fails the build, so it can't reach production.
