# Setup and usage

## Requirements

Use Node.js 26 or later. Use a project with native ESM.

## Install

Install `@eliware/common` from npm.

```text
npm install @eliware/common
```

The package installs its Eliware runtime dependencies.

## Import public APIs

Import the APIs that your program needs.

```js
import {
  createSnowflakeGenerator,
  fs,
  log,
  path,
  registerHandlers,
  registerSignals,
} from "@eliware/common";

const configFile = path(import.meta, "config.json");
const createId = createSnowflakeGenerator({ workerId: 1, processId: 1 });

log.info("Read configuration", { configFile, id: createId() });
const handlers = registerHandlers();
const keepAlive = setInterval(() => log.info("Waiting for SIGTERM or SIGINT."), 60_000);

registerSignals({
  shutdownHook: () => {
    clearInterval(keepAlive);
    handlers.removeHandlers();
  },
});

console.log(fs.existsSync(configFile));
```

This code logs one Snowflake ID and checks one file. It stays active until a signal starts shutdown.
The shutdown hook stops the timer and removes the error handlers.

## Use path helpers

Pass `import.meta` to find paths from the current module.

```js
import {
  fileUrlToPath,
  getCurrentDirname,
  path,
  pathUrl,
  relativePath,
  resolvePath,
} from "@eliware/common";

const directory = getCurrentDirname(import.meta);
const file = path(import.meta, "data", "input.json");
const url = pathUrl(import.meta, "data", "input.json");
const absolute = resolvePath(import.meta, "data", "input.json");
const relative = relativePath(import.meta, "data", "input.json");
const localFile = fileUrlToPath(url);
```

Pass a directory string when code does not have `import.meta`.
Read the [API reference](api.md) for each path helper.

## Use log APIs

Use the default `log` object or create a logger with `createLogger(options)`.

```js
import { createLogger, safeSerialize } from "@eliware/common";

const logger = createLogger({ format: "json", timestamp: true });
logger.info("Request complete", safeSerialize({ requestId: "example" }));
```

Pass metadata as the second logger argument. Use `safeSerialize` to remove secret fields before you log data.

## Redact sensitive values

Use `redactText` to remove credentials from text before you log or store it.

```js
import { redactText, redactValue } from "@eliware/common";

const message = redactText("Authorization: Bearer example-token");
const record = redactValue({ user: "alex", token: "example-token" });
console.log(message, record);
```

`redactText` applies common credential rules. Pass `secrets` to replace known literal values.
`redactValue` returns a copy with sensitive property values replaced.
Read the [Redaction APIs](api.md#redaction-apis) for policies, options, limits, and header handling.

## Handle process errors and signals

Call `registerHandlers(options)` to add process error handlers. Call its `removeHandlers()` method when you no longer need them.
Call `registerSignals(options)` to add shutdown handlers. Pass `shutdownHook` to run cleanup work.
Read the [API reference](api.md) for defaults, options, return values, and dependency guides.

## Create Snowflake IDs

Create one generator with a unique worker and process ID pair.

```js
import { createSnowflakeGenerator } from "@eliware/common";

const createId = createSnowflakeGenerator({ workerId: 3, processId: 7 });
console.log(createId());
```

Each call returns a decimal string. Keep the ID as a string in JavaScript and JSON.
Read the [Snowflake section in the API reference](api.md#snowflake-ids) for options and limits.

## TypeScript

Import the types with a `type` modifier.

```ts
import {
  createSnowflakeGenerator,
  registerSignals,
  type RegisterSignalsOptions,
} from "@eliware/common";

const options: RegisterSignalsOptions = { exit: false };
const registration = registerSignals(options);
const createId = createSnowflakeGenerator();
console.log(createId());
registration.removeHandlers();
```

The package includes TypeScript declarations. Read [API types](api.md#typescript-types) for the exported type names.
