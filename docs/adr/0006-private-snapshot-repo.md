# 0006. Page snapshots live in a private repository

- Status: accepted
- Date: 2026-10-01

## Decision

Normalised vendor page text used for diffing is stored in a private companion repository, `ai-success-network-snapshots`. The public repository and site hold facts, short evidence quotes and links only.

## Consequences

- Diffs have prior text without republishing vendor pages.
- The pipeline needs a fine-grained token scoped to the two repositories.
