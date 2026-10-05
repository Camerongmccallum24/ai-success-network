# Architecture decision records

Format: [MADR](https://adr.github.io/madr/). One decision per file; a reversal gets a new record that supersedes the old one.

| ADR                                               | Decision                                                           | Status   |
| ------------------------------------------------- | ------------------------------------------------------------------ | -------- |
| [0001](0001-rebuild-in-existing-repo.md)          | Rebuild in the existing repo; keep the 2025 prototype as a release | Accepted |
| [0002](0002-astro-static-site.md)                 | Astro static site with React islands                               | Accepted |
| [0003](0003-json-files-in-git.md)                 | JSON files in Git as the only data store                           | Accepted |
| [0004](0004-ratings-computed-from-cited-facts.md) | Ratings computed per plan from cited facts                         | Accepted |
| [0005](0005-pipeline-only-proposes.md)            | Verification only proposes; a human merges                         | Accepted |
| [0006](0006-private-snapshot-repo.md)             | Page snapshots in a private repo                                   | Accepted |
| [0007](0007-read-only-stdio-mcp-server.md)        | Read-only stdio MCP server                                         | Accepted |
| [0008](0008-one-shared-zod-schema.md)             | One shared Zod schema package                                      | Accepted |
| [0009](0009-typescript-6-not-7.md)                | Pin TypeScript 6.0, not 7                                          | Accepted |
| [0010](0010-vanilla-script-filters.md)            | Directory filters are an inline script, not React                  | Accepted |
| [0011](0011-quotes-verified-on-the-page.md)       | Every cited quote is checked against the live page                 | Accepted |
| [0012](0012-prices-in-vendor-currency.md)         | Prices kept in the vendor currency, pinned rate for the ceiling    | Accepted |
