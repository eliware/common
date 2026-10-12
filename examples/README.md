# Examples

- [Common utility example](example.mjs)
- [Snowflake ID example](snowflake.mjs)

Use Node.js 26 or later. Install `@eliware/common` before you run the example.
Run `node examples/example.mjs` from a project that can import the package.
The example logs paths and registered handlers. Send SIGTERM or SIGINT to start shutdown.
The shutdown hook removes error handlers.

## Snowflake ID example

Use Node.js 26 or later. Install `@eliware/common` after `@eliware/snowflake` 12.0.0 is published.
Run `node examples/snowflake.mjs` from a project that can import the package.
The example writes one decimal ID string. It does not need cleanup.
