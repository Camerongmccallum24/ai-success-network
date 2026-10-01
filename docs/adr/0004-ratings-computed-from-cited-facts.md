# 0004. Ratings are computed per plan from cited facts

- Status: accepted (rules revised after the schema pilot, 2026-10-01)
- Date: 2026-10-01

## Context

The credibility claim is that every rating is explainable and reproducible. Provider data policies differ by plan, not by product.

## Decision

A pure, table-tested function (`ratePlan` in `packages/schema`) computes each plan's rating from its facts. Every rating-driving fact cites a vendor source and a verbatim quote of up to 240 characters. A manual override needs a written reason of at least 40 characters.

Rules, as revised by the pilot on ChatGPT, Granola and Gamma:

- **Red:** training, training control or DPA is unclear; inputs train by default with no way off; or the vendor's AI subprocessors may train on inputs.
- **Green:** training off by default or admin-enforced off; a DPA (incorporated or on request); an admin can enforce data settings for every user; and the vendor says its AI subprocessors can't train on inputs, or it is the model provider.
- **Amber:** everything else. When training is on by default with a personal opt-out, the label adds "only after you switch off training" and shows the setting path.

## Consequences

- The pilot showed the v1 rules contradicted themselves for "on by default with an opt-out", the most common real case.
- Unclear always rates red; ambiguity is never resolved in the vendor's favour.
- `packages/schema` must keep 100% branch coverage; CI enforces it.
