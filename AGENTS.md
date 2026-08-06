# AGENTS.md

## Project purpose

`@eliware/common` is an ESM compatibility and convenience layer. It re-exports the public APIs of the shared Eliware packages and Node.js `fs`; it should not duplicate their implementation logic.

## Layout

- `index.mjs` — package public entry point.
- `index.d.ts` — public TypeScript declarations.
- `src/` — focused re-export modules for filesystem, logging, paths, errors, and signals.
- `index.test.mjs` — public export/contract tests.
- `example.mjs` — basic usage example.

## Development commands

```bash
npm install
npm test
npm run lint
```

Tests should pass and lint should report zero warnings or errors before committing.

## Testing expectations

Test the package contract rather than duplicating dependency implementation tests. Cover:

- every public named export;
- representative behavior for path, logger, error, and signal exports;
- default and named exports from focused `src/` modules;
- cleanup, abort signals, and shutdown hooks where exposed;
- TypeScript declarations when declaration tooling is available.

Coverage may be zero for re-export-only modules because they contain no business logic. Do not add Istanbul ignore directives merely to manufacture a coverage percentage.

## API compatibility

- Keep `index.mjs` and `index.d.ts` synchronized.
- When an upstream package adds a public export, decide whether it belongs in this package and update the barrel, types, README, and contract tests together.
- Preserve ESM-only behavior; do not reintroduce CommonJS entry points unless explicitly requested.
- Avoid adding logic to the compatibility layer that belongs in the underlying package.

## Documentation and examples

Keep `README.md` and `example.mjs` aligned with the current exports and option names. Never include credentials or machine-specific paths in examples.

## Release rules

Do not bump the version, edit release notes, tag, or publish unless explicitly requested. Before a release, run tests, lint, and preferably `npm pack --dry-run`.
