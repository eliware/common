# AGENTS.md

## Project

Maintain `@eliware/common`, an ESM package for shared Eliware APIs.
Use Node.js 26 or later.

## Scope and boundaries

Keep this repository to the package, user docs, examples, tests, and specifications.
Receive Eliware Operations approval before publication.

## Layout

Put runtime modules and declarations in `src/`.
Put one matching test in `tests/` for each runtime module.
Put user docs in `docs/`, examples in `examples/`, and specifications in `specs/`.

## Development

Use native ESM.
Keep `src/index.mjs` as the public export barrel.
Keep docs, declarations, package data, and tests in sync.

## Validation

Run `npm test` for all checks.
Run `npm run lint` for lint checks.
Run `npm run audit` for dependency checks.
Run `npm run format` to format files.

Run `npm run format:check` to check file format.
Run `npm run typecheck` to check declarations.
Run `npm run pack` to check package contents.

## Security

Keep secrets, credentials, private data, and machine paths out of tracked files.
Examine dependency behavior and update dependencies before publication.

## Changes

Describe user-visible changes in `RELEASE_NOTES.md`.
Keep release notes accurate.

## Library

Export runtime APIs from `src/index.mjs` and types from `src/index.d.ts`.
Mirror each runtime module with one test.
Keep native ESM examples in `examples/`.

- Run focused tests first during development.
- Run one test file with `npm test -- tests/path/to/example.test.mjs`.
- Run multiple test files with `npm test -- tests/path/to/first.test.mjs tests/path/to/second.test.mjs`.
- Prevent repeated full-suite runs during development.
- Run the full `npm test` suite for final validation before a commit, milestone, or release.

## npm publication

Set the package version in `package.json`.
Use the Eliware Operations publication checklist.
Passing checks do not give publication approval.
