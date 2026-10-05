# 0012. Prices are recorded in the vendor's currency, with a pinned rate for the ceiling

- Status: accepted (the ceiling check is not implemented yet)
- Date: 2026-10-05

## Context

Most vendors publish prices in US dollars, and a few in pounds or euros. The directory is aimed at individual CSMs who often pay themselves, so it needs a price ceiling (£30 per month). Converting at record time would hide what the vendor actually published and make a price quote impossible to verify against the page.

## Decision

- A listed price keeps the vendor's currency (`GBP`, `USD` or `EUR`) and the amounts exactly as published, each with a verbatim quote from the pricing page.
- The ceiling is checked with an exchange rate pinned in the repository and dated. Changing the rate is a reviewed change, so the same data always gives the same answer.
- A price that cannot be verified is recorded as `unverified` with a reason and shown as "price not verified". Pages that block the verifier are marked `verify: manual` (see [ADR 0011](0011-quotes-verified-on-the-page.md)).

## Consequences

- The site can show the price the vendor shows, and the quote check keeps working on it.
- The schema already carries the currency. The pinned rate file and the ceiling check do not exist yet; they are part of the Stage 1 gate work, and this ADR stays the reference for them.
- Displayed pound figures are approximate and labelled with the rate date.
