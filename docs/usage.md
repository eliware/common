# Setup and usage

## Requirements

Use Node.js 26 or later. Use a project that supports native ESM.

## Install

Install `@eliware/common` from npm.

```text
npm install @eliware/common
```

The package installs its Eliware runtime dependencies.

## Read a file

Use the Node.js `fs` namespace for file operations. This example reads a file as UTF-8 text.

```js
import { fs } from "@eliware/common";

const text = await fs.promises.readFile("./config.json", "utf8");
const config = JSON.parse(text);
```

Use Node.js `fs` documentation for available methods, options, and errors.

## Import public APIs

Import the APIs that your app requires.

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

This code writes one Snowflake ID and checks one file. It stays active until a signal starts shutdown.
The shutdown callback stops the timer and removes the error handlers.

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

Use `createPathHelpers` when your app must record path operations with a custom logger.

```js
import { createPathHelpers } from "@eliware/common";

const records = [];
const helpers = createPathHelpers({ logger: { log: (record) => records.push(record) } });
const file = helpers.path(import.meta, "data", "input.json");
```

The helper writes a debug record after it completes a path operation.

## Use logger APIs

Use the default `log` object or create a logger with `createLogger(options)`.

```js
import { createLogger, safeSerialize } from "@eliware/common";

const logger = createLogger({ format: "json", timestamp: true });
logger.info("Request complete", safeSerialize({ requestId: "example" }));
```

Pass metadata as the second logger argument. Use `safeSerialize` to remove secret fields and limit nested values before you write records.

```js
import { createLogger, safeSerialize } from "@eliware/common";

const logger = createLogger({ format: "json" });
logger.info("Request complete", safeSerialize({ token: "example", status: 200 }));
```

The serializer returns a bounded representation. It does not guarantee that all sensitive data has been removed.

## Redact sensitive values

Use `redactText` to remove credentials from text before you write or store it.

```js
import { redactText, redactValue } from "@eliware/common";

const message = redactText("Authorization: Bearer example-token");
const record = redactValue({ user: "alex", token: "example-token" });
console.log(message, record);
```

`redactText` applies standard credential rules. Pass `secrets` to replace known literal values.
`redactValue` returns a copy with sensitive property values replaced.
Read the [Redaction APIs](api.md#redaction-apis) for policies, options, limits, and header handling.

Use `redactHeaders` for HTTP header data. Use `createPolicy` to add a sensitive property name.

```js
import { createPolicy, redactHeaders, redactValue } from "@eliware/common";

const policy = createPolicy({ keys: ["token", "sessionId"] });
const record = redactValue({ sessionId: "example", status: 200 }, policy);
const headers = redactHeaders({ Authorization: "Bearer example", Accept: "application/json" });
```

The policy replaces the default sensitive names with the names that you provide. Include the default names when you want to keep them.

## Process errors and signals

Call `registerHandlers(options)` to add process error handlers.
Call its `removeHandlers()` method when the handlers are no longer required.
Call `registerSignals(options)` to add shutdown handlers.
Pass `shutdownHook` to run cleanup.
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
