# Examples

Use Node.js 26 or later. Install `@eliware/common` in the example project.

## Files

- [Shared APIs](example.mjs)
- [Snowflake IDs](snowflake.mjs)

## Shared APIs

Run `node examples/example.mjs` from the project root.
The example logs paths and registers error and shutdown handlers.
It stays active and logs a wait message each minute.
Send `SIGTERM` or `SIGINT` to start shutdown.
The shutdown hook stops the timer and removes the error handlers.

## Snowflake IDs

Run `node examples/snowflake.mjs` from the project root.
The example writes one decimal ID string.
