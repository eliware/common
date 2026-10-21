import type { LoggerWithConfiguredLevels } from "./log.mjs";

export interface SnowflakeGeneratorOptions {
  epoch?: number | bigint;
  workerId?: number | bigint;
  processId?: number | bigint;
  now?: () => number | bigint;
  logger?: LoggerWithConfiguredLevels;
}

export type { LoggerWithConfiguredLevels } from "./log.mjs";

export interface SnowflakeConstants {
  readonly epoch: bigint;
  readonly sequenceBits: bigint;
  readonly processBits: bigint;
  readonly workerBits: bigint;
}

export declare function createSnowflakeGenerator(options?: SnowflakeGeneratorOptions): () => string;

export declare const generate: () => string;
export declare const snowflake: typeof generate;
export declare const constants: SnowflakeConstants;

export default generate;
