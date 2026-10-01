# 0009. Pin TypeScript 6.0, not TypeScript 7

- Status: accepted
- Date: 2026-10-01

## Context

TypeScript 7 (the native compiler) is current as 7.0.2. The spec asked Phase 0 to confirm tool support before adopting it.

## Decision

Pin `typescript` 6.0.3.

## Evidence

- `@astrojs/check` 0.9.10 declares a peer range of `^5.0.0 || ^6.0.0`.
- `typescript-eslint` 8.71.0 declares `>=4.8.4 <6.1.0`.

## Consequences

Revisit when both tools support TypeScript 7; Dependabot will surface it.
