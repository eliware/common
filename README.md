# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

Documentation: [docs](docs/README.md) · [specifications](specs/README.md) · [examples](examples/README.md)

## @eliware/common [![npm version](https://img.shields.io/npm/v/@eliware/common.svg)](https://www.npmjs.com/package/@eliware/common)[![license](https://img.shields.io/github/license/eliware/common.svg)](LICENSE)[![build status](https://github.com/eliware/common/actions/workflows/nodejs.yml/badge.svg)](https://github.com/eliware/common/actions)

A small native ESM compatibility package that provides one stable import surface for Eliware's shared Node.js utilities.

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Exports](#exports)
- [Usage](#usage)
- [TypeScript](#typescript)
- [Configuration and Operations](#configuration-and-operations)
- [Errors / Troubleshooting](#errors--troubleshooting)
- [Development](#development)
- [Security](#security)
- [Support](#support)
- [License](#license)
- [Links](#links)

## Features

- Stable ESM import surface for shared Eliware utilities.
- Re-exports filesystem, path, logging, error, and signal APIs.
- Keeps consuming applications on consistent shared dependency versions.
- Includes TypeScript declarations and deterministic delegation tests.

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

## Configuration and Operations

The package has no global configuration and performs no work at import time. Configure the delegated logger, error handlers, and signal handlers through their options. Applications should validate their own configuration before opening files or external connections and should make shutdown cleanup idempotent.

## Errors / Troubleshooting

This package is a compatibility layer and delegates behavior to its underlying packages. For logging, path, error-handler, or signal-handler failures, consult the corresponding dependency documentation. Keep dependency versions synchronized with the public exports and declarations.

## Development

```bash
npm install
npm test
npm run lint
npm run typecheck
npm run pack
npm audit --omit=dev --audit-level=moderate
```

This package is a re-export/compatibility layer. Its tests verify the public export contract and representative delegation to the underlying packages; implementation behavior is tested in those dependency packages.

## Security

Do not log secrets or include credentials or machine-specific paths in examples. Review delegated package behavior and keep dependencies updated before publishing.

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)[![eliware.org](https://eliware.org/logos/eliware_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## Links

- [Home Page](https://eliware.org)
- [GitHub Repo](https://github.com/eliware/common)
- [GitHub Org](https://github.com/eliware)
- [npm](https://www.npmjs.com/package/@eliware/common)
- [Discord](https://discord.gg/M6aTR9eTwN)

## License

[MIT © Eliware](LICENSE)
