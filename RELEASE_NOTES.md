# Release Notes

## 12.0.0 — 2026-10-12

### Changed

- Updated the shared Eliware dependencies to version 12.
- Moved the public runtime entry point and declarations under `src/`.
- Updated package validation, documentation, and workflows to current shared conventions.

### Breaking changes

- Require Node.js 26 or later.
- Require major version 12 of the shared Eliware dependency packages.

## 2.0.0 — 2026-08-25

### Changed

- Modernized the package for the shared Eliware conventions and Node.js `>=26`.
- Replaced direct Jest tooling with `@eliware/test`, including enforced 100×4 coverage and shared linting.
- Updated CI for Ubuntu and Windows validation on `main`, pull requests, and `v*` tags, with gated publishing.
- Updated package metadata, documentation, and dependency auditing.

### Breaking changes

- Required Node.js `>=26`.
- Replaced direct Jest and Oxlint project tooling with the shared `@eliware/test` harness.

## 1.1.8 — 2026-08-10

### Changed

- Updated `@eliware/errors` to 1.1.9, `@eliware/log` to 1.1.12, and `@eliware/signals` to 1.1.7.
- Added the `safeSerialize` TypeScript declaration to match the runtime export.
- Updated signal handler contract coverage for the current upstream listener behavior.

## 1.1.7 — 2026-08-07

### Changed

- Standardized package layout, validation scripts, TypeScript checking, CI, and package contents.
- Updated internal dependencies to the latest released Eliware versions.
- Expanded troubleshooting, development, and security documentation.

## 1.1.6 — 2026-08-07

### Changed

- Updated `@eliware/errors`, `@eliware/log`, `@eliware/path`, and `@eliware/signals` to current releases.
- Standardized Jest coverage on the V8 provider for accurate ESM coverage reporting.

## 1.1.5 — 2026-08-06

### Changed

- Refactored the package into focused ESM modules under `src/`.
- Expanded the unified export surface to include the current public APIs from four shared packages.
- Added logger and path exports, including `safeSerialize`, `resolvePath`, `relativePath`, and `fileUrlToPath`.
- Updated TypeScript declarations for the expanded API and dependency option types.
- Replaced CommonJS entry points and tests with ESM-only files.
- Expanded contract tests for public exports, helper APIs, handlers, cleanup, and shutdown hooks.
- Updated the README, examples, dependencies, package files, and development guidance.
- Standardized linting, coverage scripts, CI, and repository artifact ignores.

## 1.1.4 — 2026-07-01

### Changed

- Updated package metadata and dependencies.
- Refreshed the lockfile and standardized repository tooling.

## 1.1.3 — 2025-12-21

### Changed

- Released maintenance updates.

## 1.1.2 — 2025-12-21

### Changed

- Released maintenance updates.

## 1.1.1 — 2025-12-09

### Added

- Released the first tagged version of the common ESM utility package.
