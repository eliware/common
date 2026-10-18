# Package contents and compatibility

## Runtime

Use Node.js 26 or later. Use the package from a native ESM module.
Install `@eliware/common` from [npm](https://www.npmjs.com/package/@eliware/common).

## Entry points

Import `@eliware/common` for the public runtime APIs.
The runtime entry point is `src/index.mjs`.
The TypeScript declaration entry point is `src/index.d.ts`.
The package does not provide a CommonJS entry point.

## Runtime dependencies

The package uses major version 12 of these Eliware packages:

- `@eliware/errors`
- `@eliware/log`
- `@eliware/path`
- `@eliware/redact`
- `@eliware/signals`
- `@eliware/snowflake`

Use the exports in this package. Use a dependency directly when your app requires its own entry point.
Read the [API reference](api.md) for each exported value.

## Published files

The npm package contains:

- `src/` for runtime modules and declarations.
- `docs/` for user docs.
- `examples/` for native ESM examples.
- `specs/` for repository specifications.
- `README.md`, `AGENTS.md`, `LICENSE`, and `RELEASE_NOTES.md`.

The package excludes tests, workflows, and lock files.

## Version and release

Use the published npm version that matches your application requirements.
Read [release notes](../RELEASE_NOTES.md) for changes by package version.
Repository validation does not publish this package. Follow the Eliware Operations release process before publication.
