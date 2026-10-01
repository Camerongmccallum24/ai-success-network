# 0003. JSON files in Git as the only data store

- Status: accepted
- Date: 2026-10-01

## Decision

One JSON file per tool in `data/tools/`. No database.

## Consequences

- Every data change is a reviewable PR diff, and Git history is the audit trail.
- No running cost and nothing to operate.
- Querying happens at build time; that suits a dataset of tens of tools.
