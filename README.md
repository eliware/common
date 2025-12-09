# [![eliware.org](https://eliware.org/logos/brand.png)](https://discord.gg/M6aTR9eTwN)

## @eliware/common [![npm version](https://img.shields.io/npm/v/@eliware/common.svg)](https://www.npmjs.com/package/@eliware/common) [![license](https://img.shields.io/github/license/eliware/common.svg)](LICENSE) [![build status](https://github.com/eliware/common/actions/workflows/nodejs.yml/badge.svg)](https://github.com/eliware/common/actions)

> An ESM/Jest/Node-friendly utility for resolving file and directory paths, logging, error handling, and signal handling in both CommonJS and ESM environments.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [ESM Example](#esm-example)
  - [CommonJS Example](#commonjs-example)
- [API](#api)
- [TypeScript](#typescript)
- [License](#license)

## Features

- Unified API for CommonJS and ESM
- Logging with [@eliware/log]
- Path utilities with [@eliware/path]
- Error handler registration with [@eliware/errors]
- Signal/shutdown handler registration with [@eliware/signals]
- **Re-exports Node.js built-in `fs` module**
- TypeScript type definitions included
- Fully tested with Jest

## Installation

```bash
npm install @eliware/common
```

## Usage

### ESM Example

```js
import { fs, log, path, pathUrl, getCurrentDirname, getCurrentFilename, registerHandlers, registerSignals } from '@eliware/common';

log.info('This is an info log from @eliware/log');

const { removeHandlers } = registerHandlers();
log.info('Registered error handlers.');

const envFile = path(import.meta, '.env');
log.info(`path to env file: ${envFile}`);

const envFileUrl = pathUrl(import.meta, '.env');
log.info(`pathUrl to env file: ${envFileUrl}`);

const { shutdown } = registerSignals();
log.info('Registered signal handlers.');

// Example usage of fs
const files = fs.readdirSync(getCurrentDirname(import.meta));
log.info(`Files in current directory: ${files.join(', ')}`);
```

### CommonJS Example

```js
const { fs, log, path, pathUrl, getCurrentDirname, getCurrentFilename, registerHandlers, registerSignals } = require('@eliware/common');

log.info('This is an info log from @eliware/log');

const { removeHandlers } = registerHandlers();
log.info('Registered error handlers.');

const envFile = path(__dirname, '.env');
log.info(`path to env file: ${envFile}`);

const envFileUrl = pathUrl(__dirname, '.env');
log.info(`pathUrl to env file: ${envFileUrl}`);

const { shutdown } = registerSignals();
log.info('Registered signal handlers.');

// Example usage of fs
const files = fs.readdirSync(getCurrentDirname(__dirname));
log.info(`Files in current directory: ${files.join(', ')}`);
```

## API

### fs

Re-export of the Node.js built-in [`fs`](https://nodejs.org/api/fs.html) module. Use for file system operations.

### log

Default logger instance from [@eliware/log]. Supports `.info`, `.warn`, `.error`, etc.

### path(metaOrDir, ...segments)

Joins the current dirname with provided segments to form an absolute path.

- `metaOrDir`: `import.meta` (ESM), a string (dirname, e.g. `__dirname`), or undefined
- `segments`: Path segments to join
- Returns: Absolute path string

### getCurrentDirname(metaOrDir, dirnameFn?)

Returns the current directory name.

- `metaOrDir`: `import.meta` (ESM), a string (dirname, e.g. `__dirname`), or undefined
- `dirnameFn`: Optional custom dirname function
- Returns: Absolute path to the current directory

### getCurrentFilename(metaOrDir)

Returns the current filename.

- `metaOrDir`: `import.meta` (ESM), a string (dirname, e.g. `__dirname`), or undefined
- Returns: Absolute path to the current file

### registerHandlers(processObj?, logger?)

Registers process-level exception handlers for uncaught exceptions, unhandled rejections, warnings, and exit events.

- `processObj`: The process object to attach handlers to (default: process)
- `logger`: Logger for output (default: log)
- Returns: `{ removeHandlers }` function to remove all registered handlers

### registerSignals(options?)

Sets up shutdown handlers for the process.

- `options`: `{ processObj, logger, signals }`
- Returns: `{ shutdown, getShuttingDown }`

## TypeScript

Type definitions are included and exported for all main functions and options:

```ts
import { fs, log, path, getCurrentDirname, getCurrentFilename, registerHandlers, registerSignals, RegisterSignalsOptions } from '@eliware/common';
```

## Support

For help, questions, or to chat with the author and community, visit:

[![Discord](https://eliware.org/logos/discord_96.png)](https://discord.gg/M6aTR9eTwN)[![eliware.org](https://eliware.org/logos/eliware_96.png)](https://discord.gg/M6aTR9eTwN)

**[eliware.org on Discord](https://discord.gg/M6aTR9eTwN)**

## License

[MIT © 2025 Eli Sterling, eliware.org](LICENSE)

## Links

- [Home Page](https://eliware.org)
- [GitHub](https://github.com/eliware/common)
- [npm](https://www.npmjs.com/package/@eliware/common)
- [Discord](https://discord.gg/M6aTR9eTwN)
