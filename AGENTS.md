# AGENTS.md

## Project

Maintain `@eliware/common` for shared Eliware APIs.

## Scope and boundaries

Keep requirements in their authoritative specifications.

## Layout

Put runtime modules and declarations in `src/`.
Put one matching test in `tests/` for each runtime module.

## Development

Use native ESM.
Export public APIs from `src/index.mjs` and types from `src/index.d.ts`.

## Validation

Use Node.js 26 or later and native ESM for maintained JavaScript modules.
Run npm test for aggregate validation.
Run npm run lint for lint checks.
Run npm run audit for dependency checks.
Run npm run format to format files.
Run npm run format:check to check formatting.

## Security

Keep secrets, credentials, private data, and machine paths out of tracked files.

## Changes

Describe user-visible changes in `RELEASE_NOTES.md`.
Keep release notes accurate.

## Library

Run focused tests first during development.
Run one test file with `npm test -- tests/path/to/example.test.mjs`.
Run multiple test files with `npm test -- tests/path/to/first.test.mjs tests/path/to/second.test.mjs`.
Prevent repeated full-suite runs during development.
Run the full `npm test` suite for final validation before a commit, milestone, or release.

## npm publication

Set the package version in `package.json`.
Use the Eliware Operations publication checklist.
Do not publish without required approval.
