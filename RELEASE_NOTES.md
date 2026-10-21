# Release Notes

## 15.0.0 — 2026-10-21

### Changed

- Upgrade all Eliware runtime and test dependencies to major version 15.
- Align package metadata and repository specifications with Convention 15.
- Export each dependency API from its package. Export `safeSerialize` and other Redact APIs directly from `@eliware/redact`.
- Restore Log types after `@eliware/log` fixed its public declarations. Remove the internal Log wrapper.
- Update the guides to describe the version 15 APIs and types.

### Added

- Check every runtime dependency export against the Common package entry point.
- Check all retained public types in a strict packed-package consumer.

### Breaking changes

- Require major version 15 of the Eliware runtime dependencies.

## 14.0.0 — 2026-10-21

### Added

- Re-exported the complete runtime APIs and public types from the Eliware errors, log, path, redact, signals, and snowflake packages.
- Added `createPathHelpers` with structured operation records and added type parity checks for dependency APIs.

### Changed

- Upgraded the package and its Eliware runtime and test dependencies to major version 14.
- Aligned package metadata, specifications, CI, npm publication, and Knit workflows with convention version 14.
- Expanded and corrected the API, setup, usage, package, and troubleshooting guides.
- Simplified `README.md` and `AGENTS.md` while keeping the content required by repository conventions.
- Removed invalid Log type aliases from Common and kept Common's valid public types available.
- Added a strict packed-consumer check for Common's retained public types.

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
