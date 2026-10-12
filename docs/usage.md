# Usage

Install `@eliware/common` with `npm install @eliware/common`.
Import file system, path, log, error, and signal APIs from the package.
See the [README usage section](../README.md#usage) for a complete example.

## Create Snowflake IDs

Create a generator with a unique worker and process ID pair.

```js
import { createSnowflakeGenerator } from "@eliware/common";

const createId = createSnowflakeGenerator({ workerId: 1, processId: 1 });
console.log(createId());
```

The generator returns each ID as a decimal string. Keep the value as a string.
Read the [Snowflake usage guide](https://github.com/eliware/snowflake/blob/main/docs/usage.md) for all options and limits.
