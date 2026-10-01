# 0011. Every cited quote is checked against the live page

- Status: accepted
- Date: 2026-10-01

## Context

Research done through summarising fetch tools returns paraphrase, not page text. The first draft records contained quotes that did not appear on the cited pages (22 of 166 on the first run).

## Decision

`pnpm verify:quotes` renders each cited source in headless Chromium and checks that every quote appears in the page text, ignoring case, whitespace and typographic quotes. It runs on a GitHub runner (`verify-quotes` workflow) and writes `data/reports/quote-check.json`.

- A page that looks like a bot challenge is `unreachable`, never `missing`, and is never evaded. Such sources are marked `verify: manual` and joined to the human check.
- A record is not published until none of its quotes is `missing`.
- Quotes are written from page text the verifier can see, not from a model's summary.

## Consequences

Phase 2's scheduled pipeline reuses this checker. Hidden text (collapsed accordions) counts as present; a quote only visible after interaction is still on the page a reader can reach.
