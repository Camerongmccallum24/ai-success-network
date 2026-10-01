# 0007. The MCP server is read-only, stdio, and ships each dataset release

- Status: accepted
- Date: 2026-10-01

## Decision

`packages/mcp` is a read-only MCP server using stdio transport, published to npm and runnable with `npx`. Each package version pins a dataset release.

## Consequences

- No hosting, auth or uptime to manage.
- Answers are as fresh as the installed version; every answer carries its last-verified date.
