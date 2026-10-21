# API reference

Import public values from `@eliware/common`.

```js
import { fs, log, path, createSnowflakeGenerator } from "@eliware/common";
```

The package re-exports APIs from Node.js and the Eliware packages listed in [package contents](package.md).

## File system

`fs` is the Node.js `fs` module namespace. Use its standard functions, such as `readFile`, `readdir`, and `stat`.
Read the [Node.js file system API](https://nodejs.org/api/fs.html) for functions, options, and errors.

## Path helpers

| Export               | Call                                       | Result                                             |
| -------------------- | ------------------------------------------ | -------------------------------------------------- |
| `path`               | `path(metaOrDir, ...segments)`             | Add segments to a module directory.                |
| `createPathHelpers`  | `createPathHelpers(options?)`              | Create path helpers with an injected logger.       |
| `pathUrl`            | `pathUrl(metaOrDir, ...segments)`          | Return a file URL string.                          |
| `getCurrentDirname`  | `getCurrentDirname(metaOrDir, dirnameFn?)` | Return the module directory.                       |
| `getCurrentFilename` | `getCurrentFilename(metaOrDir)`            | Return the module filename or input string.        |
| `resolvePath`        | `resolvePath(metaOrDir, ...segments)`      | Return an absolute path.                           |
| `relativePath`       | `relativePath(metaOrDir, ...segments)`     | Return a path from the module directory.           |
| `fileUrlToPath`      | `fileUrlToPath(fileUrl)`                   | Convert a file URL string or `URL` to a file path. |

Pass `import.meta` or a directory string as `metaOrDir`. Pass `dirnameFn` only with `import.meta`.

Pass a logger with a `log` method to `createPathHelpers` to record path operations.
The helpers write debug records after operations. They write error records before they report failures.

The default export from `@eliware/path` is named `path` here.
Read the [path package docs](https://github.com/eliware/path/tree/main/docs) for details.

## Logger APIs

| Export          | Call                                            | Result                                           |
| --------------- | ----------------------------------------------- | ------------------------------------------------ |
| `log`           | `log.debug/info/warn/error(message, metadata?)` | Use the shared default logger.                   |
| `createLogger`  | `createLogger(options?)`                        | Create a logger instance.                        |
| `safeSerialize` | `safeSerialize(value, options?)`                | Return JSON-safe data with redaction and limits. |

`createLogger` accepts `level`, `transports`, `format`, `timestamp`, and `keys` options.
Use `format: "text"` or `format: "json"`. The default level is `info`.
The other defaults are a console transport, text format, no timestamp, and no custom redaction keys.

`safeSerialize` accepts `keys`, `redactKeys`, `marker`, `circularMarker`, `maxDepth`, `maxKeys`, `maxArray`, and `maxString` options.
It does not call `toJSON`. It uses default secret keys and limits when you omit options.
It returns JSON-safe values. It converts BigInt values to text and marks circular or truncated values.
Read the [logger package docs](https://github.com/eliware/log/tree/main/docs) for defaults and details.

## Redaction APIs

`defaultPolicy` provides the default sensitive key names and marker.
Call `createPolicy(options?)` to make a frozen policy with custom key names or markers.
Call `redactValue(value, options?)` to return a redacted copy of an object or array.
Call `redactHeaders(headers, options?)` to redact header values in an object, pair array, or entries object.
Call `redactText(value, options?)` to redact standard credential patterns, custom key values, and literal secrets.
Call `replaceLiteralSecret(value, secret, marker?)` to replace one exact secret in text.

Policy options include `keys`, `redactKeys`, `marker`, and `circularMarker`.
Structured values also support `maxDepth`, `maxKeys`, and `maxArray` limits.
Text also supports `secrets` and the `maxOutputLength` limit.

The default marker is `[REDACTED]`. The default text limit is 10,000 characters.
`redactText` detects authorization values, secret assignments, provider tokens, JWT-like strings, and key blocks.

`redactValue` returns a copy and does not change its input.
`redactHeaders` keeps the input shape for objects and pair arrays. It returns a lowercase object for entries objects.

The `safeSerialize` export in Logger APIs matches the `safeSerialize` export from `@eliware/redact`.

Read the [Redact API guide](https://github.com/eliware/redact/blob/main/docs/api.md) for full rules and limits.

## Error handlers

Call `registerHandlers(options?)` to add handlers for process events.
The default events are `uncaughtException`, `unhandledRejection`, and `warning`.
The `defaultEvents` export contains the default event names.

| Option       | Default                    | Purpose                                       |
| ------------ | -------------------------- | --------------------------------------------- |
| `processObj` | `process`                  | Set the process-like event source.            |
| `log`        | `@eliware/log`             | Set the logger.                               |
| `events`     | Three process error events | Set the events for this function.             |
| `once`       | `false`                    | Set one-time handler behavior.                |
| `signal`     | None                       | Remove handlers when an `AbortSignal` aborts. |

The result has a read-only `removed` value and a `removeHandlers()` method.
Set a custom logger with `error`, `warn`, and `debug` methods.
Pass a non-empty array of supported event names. The package rejects unsupported event names.
Read the [errors package docs](https://github.com/eliware/errors/tree/main/docs) for event behavior and errors.

## Shutdown handlers

Call `registerSignals(options?)` to add process shutdown handlers.
The default signals are `SIGTERM`, `SIGINT`, and `SIGHUP`.

| Option         | Default                       | Purpose                                               |
| -------------- | ----------------------------- | ----------------------------------------------------- |
| `processObj`   | `process`                     | Set the process-like event source.                    |
| `log`          | `@eliware/log`                | Set the logger.                                       |
| `signals`      | `SIGTERM`, `SIGINT`, `SIGHUP` | Set the signals for this function.                    |
| `shutdownHook` | None                          | Set cleanup work. This function can return a promise. |
| `exitCode`     | `0`                           | Set the process exit code.                            |
| `exit`         | `true`                        | Allow or prevent process exit.                        |
| `signal`       | None                          | Remove handlers when an `AbortSignal` aborts.         |

The result has `removed`, `shutdown(signal?)`, `getShuttingDown()`, and `removeHandlers()` members.

The default `exit` value is `true`. Set `exit: false` when your app controls process exit.

Each callback runs once. The package calls callbacks in order and continues after an error.

Pass an empty `signals` array to disable signal events. A `beforeExit` handler also runs.
Read the [signals API docs](https://github.com/eliware/signals/blob/main/docs/api.md) for shutdown order and error behavior.

## Snowflake IDs

Call `createSnowflakeGenerator(options?)` to make a generator. Each call returns a decimal string.

| Option      | Type                 | Default            | Purpose                                     |
| ----------- | -------------------- | ------------------ | ------------------------------------------- |
| `epoch`     | `number` or `bigint` | `365662380000n`    | Set the epoch in Unix milliseconds.         |
| `workerId`  | `number` or `bigint` | `0`                | Set a worker value from 0 through 31.       |
| `processId` | `number` or `bigint` | `process.pid % 32` | Set a process value from 0 through 31.      |
| `now`       | function             | `Date.now`         | Set a clock that returns Unix milliseconds. |

Use one epoch for all generators in one application. Give each active generator a unique worker and process ID pair.
Keep each ID as a string. An ID uses a 42-bit timestamp, 5-bit worker value, 5-bit process value, and 12-bit sequence.

Each generator can create 4096 IDs for each millisecond. It throws `RangeError` when time or sequence limits fail.
Pass a safe integer or `bigint` to `epoch`, `workerId`, and `processId`.

Pass a clock that returns Unix milliseconds as a safe integer or `bigint`.
The generator uses its last timestamp when the clock moves to an earlier time.
The exports `generate`, `snowflake`, and the default export from `@eliware/snowflake` use one shared generator.
The `constants` export provides `epoch`, `sequenceBits`, `processBits`, and `workerBits` values as `bigint`.

Read the [Snowflake usage guide](https://github.com/eliware/snowflake/blob/main/docs/usage.md) for timestamp limits and clock behavior.

## TypeScript types

The package exports these types:

- `Logger`
- `LoggerWithConfiguredLevels`, `SafeSerializedValue`, and `RedactionOptions`
- `PathLogger`, `PathHelpersOptions`, and `PathHelpers`
- `NodeSignal`, `SignalsLogger`, and `SignalsProcessLike`
- `ProcessEvent`, `ProcessListener`, and `ProcessLike`
- `RegisterHandlersOptions` and `RegisteredHandlers`
- `RegisterSignalsOptions` and `SignalsRegistration`
- `RedactionPolicy`, `SerializationOptions`, `StructuredRedactionOptions`, and `TextRedactionOptions`
- `SnowflakeGeneratorOptions` and `SnowflakeConstants`

Read the [declaration file](../src/index.d.ts) for the current type exports.
