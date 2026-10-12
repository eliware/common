import { createSnowflakeGenerator } from "@eliware/common";

const createId = createSnowflakeGenerator({ workerId: 1, processId: 1 });
console.log(createId());
