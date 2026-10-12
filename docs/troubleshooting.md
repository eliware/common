# Troubleshooting

## Import errors

Use Node.js 26 or later.
Set the project to native ESM.
Run `npm install @eliware/common` to install the package and its dependencies.
Import from `@eliware/common`. Do not import private files under `src/`.

## Type errors

Use the package types that match the installed package version.
Run `npm install` to update the lock file after a version change.
Read the [API reference](api.md) and [declaration file](../src/index.d.ts).

## Path errors

Pass `import.meta` or a directory string to a path helper.
Pass a file URL to `fileUrlToPath`.
Read the [path API section](api.md#path-helpers) for each helper's result.

## Log errors

Check the `level`, `transports`, and `format` options passed to `createLogger`.
Pass a logger with `debug`, `info`, `warn`, and `error` methods where required.
Remove secret values before you write metadata to logs.

## Process handler errors

Keep each handler registration while you need it.
Call `removeHandlers()` to remove error or signal handlers.
Pass a valid process-like object and event names.
Read the [API reference](api.md#error-handlers) and [shutdown handler guide](api.md#shutdown-handlers).

## Snowflake errors

Give each active generator a unique worker and process ID pair.
Keep generated IDs as decimal strings. Do not convert them to `number`.
Wait for the clock to advance after a sequence limit error.
Check the epoch and clock when the generator reports a timestamp error.
Read [Snowflake IDs](api.md#snowflake-ids) for limits and clock behavior.

## Repository checks

Run `npm ci` to install locked dependencies.
Run `npm test` to check the repository.
Fix the first reported error, then run `npm test` again.
