# @eliware/common

A small ESM convenience package that provides one stable import surface for Eliware's shared Node.js utilities.

## Requirements

- Node.js 26 or newer
- Published Eliware dependency packages matching the versions in `package.json`

## Installation

```bash
npm install @eliware/common
```

## Exports

`@eliware/common` re-exports the current public APIs from:

- `@eliware/log`: `log`, `createLogger`, `safeSerialize`
- `@eliware/path`: `path`, `pathUrl`, `getCurrentDirname`, `getCurrentFilename`, `resolvePath`, `relativePath`, `fileUrlToPath`
- `@eliware/errors`: `registerHandlers`
- `@eliware/signals`: `registerSignals`
- Node.js `fs`

The implementation is split into focused modules under [`src/`](src/) while the package root remains the public entry point.

## Usage

```js
import {
  fs,
  log,
  path,
  pathUrl,
  resolvePath,
  registerHandlers,
  registerSignals,
} from '@eliware/common';

const configPath = path(import.meta, '.env');
const configUrl = pathUrl(import.meta, '.env');
const absolutePath = resolvePath(import.meta, 'config');

log.info('Application starting', { configPath, configUrl, absolutePath });
log.info(`Files: ${fs.readdirSync(path(import.meta)).join(', ')}`);

const errors = registerHandlers({ events: ['uncaughtException', 'unhandledRejection'] });
const signals = registerSignals({ shutdownHook: async () => errors.removeHandlers() });

process.once('SIGTERM', () => void signals.shutdown('SIGTERM'));
```

## TypeScript

Type declarations are included and expose the dependency option and return types:

```ts
import {
  createLogger,
  getCurrentDirname,
  registerSignals,
  type RegisterSignalsOptions,
} from '@eliware/common';

const logger = createLogger({ format: 'json' });
const directory = getCurrentDirname(import.meta);
const options: RegisterSignalsOptions = { exit: false };
const registration = registerSignals(options);
```

## Errors / Troubleshooting

This package is a compatibility layer and delegates behavior to its underlying packages. For logging, path, error-handler, or signal-handler failures, consult the corresponding dependency documentation. Keep dependency versions synchronized with the public exports and declarations.

## Development

```bash
npm install
npm test
npm run lint
npm run test:gaps
npm run typecheck
npm run pack
```

This package is a re-export/compatibility layer. Its tests verify the public export contract and representative delegation to the underlying packages; implementation behavior is tested in those dependency packages.

## Security

Do not log secrets or include credentials or machine-specific paths in examples. Review delegated package behavior and keep dependencies updated before publishing.

## Links

- [GitHub](https://github.com/eliware/common)
- [npm](https://www.npmjs.com/package/@eliware/common)
- [eliware Discord](https://discord.gg/M6aTR9eTwN)

## License

[MIT](LICENSE)
