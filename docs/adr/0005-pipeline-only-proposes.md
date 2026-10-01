# 0005. Verification opens issues and draft PRs; it never merges or edits judgement

- Status: accepted
- Date: 2026-10-01

## Decision

The weekly pipeline and AI triage can open issues and draft PRs only. A human merges every change. AI proposals may never edit `assessment` or `ratingOverride`; a rating changes only as a consequence of fact edits passing through `ratePlan`.

## Consequences

- Maintenance is a 30-minute weekly review rather than editing.
- A wrong AI proposal costs a closed PR, not a wrong rating in production.
