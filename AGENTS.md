# AGENTS.md

## Project

Maintain `@eliware/common`, a native ESM package that exports shared Eliware utilities.
Use Node.js 26 or later.

## Scope and boundaries

Keep this repository limited to the package, its documentation, tests, and release files.
Do not publish or deploy without the Eliware Operations approval process.

## Layout

Keep implementation modules and declarations under `src/`.
Keep one matching `.test.mjs` file under `tests/` for each source `.mjs` file.
Keep user documentation under `docs/`, examples under `examples/`, and specifications under `specs/`.

## Development

Use native ESM. Keep each module focused on one purpose.
Use shared Eliware packages for logging, path, error, and signal behavior.
Keep the package entry point as a pure export barrel.

## Validation

Use Node.js 26 or later and native ESM.
Run `npm test` for aggregate validation.
Run `npm run lint` for lint checks.
Run `npm run audit` for dependency audit checks.
Run `npm run format` to format files.
Run `npm run format:check` to check file format.
Run `npm run typecheck` to check declarations.
Run `npm run pack` before publication review.

## Security

Do not log secrets or include credentials, private data, or machine-specific paths.
Review delegated package behavior and update dependencies before publication.

## Changes

Keep documentation, declarations, package metadata, and tests in sync.
Keep release notes accurate for user-visible changes.

## Library

Export public APIs from `src/index.mjs` and declarations from `src/index.d.ts`.
Mirror source modules with tests. Keep runnable native ESM examples under `examples/`.

## npm publication

The public package is `@eliware/common`. The package version is set in `package.json`.
Validation success does not approve publication. Follow the Eliware Operations publication checklist and approval process.
