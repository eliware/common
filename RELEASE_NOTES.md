# Release Notes

## 14.0.0 — 2026-10-20

### Added

- Re-exported the complete runtime APIs and public types from the Eliware errors, log, path, redact, signals, and snowflake packages.
- Added `createPathHelpers` with structured operation records and added type parity checks for dependency APIs.

### Changed

- Upgraded the package and its Eliware runtime and test dependencies to major version 14.
- Aligned package metadata, specifications, CI, npm publication, and Knit workflows with convention version 14.
- Expanded and corrected the API, setup, usage, package, and troubleshooting guides.
- Simplified `README.md` and `AGENTS.md` while keeping the content required by repository conventions.

### Breaking changes

- Require major version 14 of the Eliware runtime dependencies.

## 12.0.1 — 2026-10-12

### Added

- Added `@eliware/redact` APIs and TypeScript option types.

## 12.0.0 — 2026-10-12

### Added

- Added Snowflake ID exports, constants, and TypeScript types.
- Added user docs for APIs, package contents, setup, and troubleshooting.

### Changed

- Updated the Eliware runtime dependencies to major version 12.
- Moved the public runtime and declaration entry points into `src/`.

### Breaking changes

- Removed the root-level `index.mjs` and `index.d.ts` files. Import from `@eliware/common`.
- Require major version 12 of the Eliware runtime dependencies.

## 2.0.0 — 2026-08-25

### Changed

- Modernized the package for the shared Eliware conventions and Node.js `>=26`.
- Replaced direct Jest tooling with `@eliware/test`, with enforced 100×4 coverage and shared linting.
- Updated CI for Ubuntu and Windows validation on `main`, pull requests, and `v*` tags, with gated publishing.
- Updated package metadata, documentation, and dependency checks.

### Breaking changes

- Required Node.js `>=26`.
- Replaced direct Jest and Oxlint project tooling with the shared `@eliware/test` harness.
