# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/common [![npm](https://img.shields.io/npm/v/@eliware/common)](https://www.npmjs.com/package/@eliware/common) [![License](https://img.shields.io/github/license/eliware/common)](https://github.com/eliware/common/blob/main/LICENSE) [![CI](https://github.com/eliware/common/actions/workflows/ci.yaml/badge.svg)](https://github.com/eliware/common/actions/workflows/ci.yaml)

A shared ESM compatibility package for Eliware filesystem, path, logging, error, and signal APIs.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Security](#security)
- [API](#api)
- [Packaging](#packaging)
- [Examples](#examples)
- [Support](#support)
- [Links](#links)
- [License](#license)

## Features

- Import shared Eliware APIs from one package.
- Use file system, path, log, error, and signal APIs.
- Use included TypeScript declarations.

## Requirements

- Use Node.js 26 or newer.
- Install the package from npm.

## Setup

```bash
npm install @eliware/common
```

## Usage

Import the public APIs from `@eliware/common`.

```js
import {
  fs,
  log,
  path,
  pathUrl,
  resolvePath,
  createSnowflakeGenerator,
  registerHandlers,
  registerSignals,
} from "@eliware/common";

const configPath = path(import.meta, ".env");
const configUrl = pathUrl(import.meta, ".env");
const absolutePath = resolvePath(import.meta, "config");

log.info("Application starting", { configPath, configUrl, absolutePath });
log.info(`Files: ${fs.readdirSync(path(import.meta)).join(", ")}`);

const createId = createSnowflakeGenerator({ workerId: 1, processId: 1 });
log.info("Snowflake ID", createId());

const errors = registerHandlers({ events: ["uncaughtException", "unhandledRejection"] });
const signals = registerSignals({ shutdownHook: async () => errors.removeHandlers() });

process.once("SIGTERM", () => void signals.shutdown("SIGTERM"));
```

Read the [documentation index](docs/README.md), [usage guide](docs/usage.md), [troubleshooting guide](docs/troubleshooting.md), and [release notes](RELEASE_NOTES.md).
Read the [specifications index](specs/README.md) for package requirements.

## Development

Install dependencies with `npm ci`. Keep each implementation file under `src/` and its test under `tests/`.

## Testing

Run `npm test` for full repository validation. Run `npm run typecheck` to check TypeScript declarations.
Run `npm run lint`, `npm run format:check`, `npm run audit`, and `npm run pack` for focused checks.

## Troubleshooting

Run `npm ci`, then `npm test`. Fix the first reported issue before you run validation again.

## Security

Do not log secrets or include credentials or machine-specific paths in examples. Review delegated package behavior and update dependencies before publication.

## API

The package exports `fs`; `log`, `createLogger`, and `safeSerialize`; path helpers; and handler functions.
It also exports `createSnowflakeGenerator`, `generate`, `snowflake`, and `constants`.
The `generate`, `snowflake`, and default Snowflake exports use one shared generator.
The TypeScript declarations export `SnowflakeGeneratorOptions` and `SnowflakeConstants`.

## Packaging

The package uses native ESM. Its public entry point is `src/index.mjs`; its declaration file is `src/index.d.ts`.
The npm package includes `src/`, `docs/`, `examples/`, `specs/`, and the required package documents.

## Examples

Read the [examples index](examples/README.md) for the runnable example and its expected behavior.

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)[![eliware.org](https://eliware.org/logos/eliware_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## Links

- [Home Page](https://eliware.org)
- [GitHub Org](https://github.com/eliware)
- [GitHub Repo](https://github.com/eliware/common)
- [Bug Reports](https://github.com/eliware/common/issues)
- [npm](https://www.npmjs.com/package/@eliware/common)
- [Discord](https://discord.gg/M6aTR9eTwN)

## License

[MIT © Eliware](LICENSE)
