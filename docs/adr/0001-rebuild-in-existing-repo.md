# 0001. Rebuild in the existing repository and keep the 2025 prototype

- Status: accepted
- Date: 2026-10-01

## Context

The May 2025 prototype was a Bolt-generated Vite + React app with hard-coded tool data. The October 2026 rebuild changes almost everything, but the project's story includes where it started.

## Decision

Rebuild in the same repository (renamed `ai-success-network`). The prototype is preserved as the tag `v0.1.0-2025-original` with a GitHub release. The rebuild replaces the prototype's files on `main` through a reviewed PR.

## Consequences

- Git history shows the project's real evolution; GitHub redirects the old repository URL.
- The prototype stays one click away from the README and the holding page.
