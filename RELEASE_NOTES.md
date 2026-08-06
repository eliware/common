# Release notes

## 1.1.5 — August 6, 2026

### Changed

- Refactored the package into focused ESM modules under `src/`.
- Expanded the unified export surface to include the current public APIs from `@eliware/log`, `@eliware/path`, `@eliware/errors`, and `@eliware/signals`.
- Added logger exports: `createLogger`, `log`, and `safeSerialize`.
- Added path exports: `resolvePath`, `relativePath`, and `fileUrlToPath`.
- Updated TypeScript declarations for the expanded API and dependency option types.
- Replaced CommonJS entry points and tests with ESM-only files.
- Expanded contract tests for all public exports, path helpers, logger helpers, error handlers, signal handlers, abort cleanup, and shutdown hooks.
- Updated README, example usage, package files, dependencies, and development guidance in `AGENTS.md`.
- Standardized linting, coverage scripts, CI configuration, and repository artifact ignores.

### Verification

- 6 tests passing.
- Lint passes with zero warnings and errors.

## 1.1.4 — July 1, 2026

- Updated package metadata and dependencies.
- Refreshed the lockfile and standardized repository tooling.

## 1.1.3 — December 21, 2025

- Maintenance release with package and dependency metadata updates.

## 1.1.2 — December 21, 2025

- Maintenance release with package and dependency metadata updates.

## 1.1.1 — December 9, 2025

- Initial tagged release of the common ESM utility package.
