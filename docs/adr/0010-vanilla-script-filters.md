# 0010. Directory filters are a small inline script, not a React island

- Status: accepted
- Date: 2026-10-01

## Context

The spec planned React islands for the directory filters. The filters are four native form controls over at most a few dozen cards.

## Decision

Render every card on the server and filter with about 30 lines of inline script that toggles `hidden`. No React, no extra dependency.

## Consequences

- With JavaScript off, all tools still show; nothing is hidden behind a failed bundle.
- Native `select` and checkbox controls keep keyboard and screen-reader behaviour for free (WCAG 2.2 AA).
- If the directory grows to need client-side search state, sorting or URL-synced filters, adopt an island then and supersede this ADR.
