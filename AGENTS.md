# AGENTS.md

## Project

Maintain `@eliware/common`, a native ESM library for shared Eliware APIs.
Use Node.js 26 or later.

## Scope and boundaries

Keep this repository to the package, its user docs, examples, tests, and specs.
Get Eliware Operations approval before publication.

## Layout

Put runtime modules and declarations in `src/`.
Put one matching test in `tests/` for each runtime module.
Put user docs in `docs/`, examples in `examples/`, and specs in `specs/`.

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
Review dependency behavior and update dependencies before publication.

## Changes

Describe user-visible changes in `RELEASE_NOTES.md`.
Keep release notes accurate.

## Library

Export runtime APIs from `src/index.mjs` and types from `src/index.d.ts`.
Mirror each runtime module with one test.
Keep native ESM examples in `examples/`.

## npm publication

Set the package version in `package.json`.
Use the Eliware Operations publication checklist.
Passing checks does not approve publication.
