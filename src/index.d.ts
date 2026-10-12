import * as fs from "fs";
import type logger from "@eliware/log";
import type { RegisterHandlersOptions, RegisteredHandlers } from "@eliware/errors";
import type { RegisterSignalsOptions, SignalsRegistration } from "@eliware/signals";

export { fs };
export { createLogger, default as log, safeSerialize } from "@eliware/log";
export {
  path,
  pathUrl,
  getCurrentDirname,
  getCurrentFilename,
  resolvePath,
  relativePath,
  fileUrlToPath,
} from "@eliware/path";
export {
  createSnowflakeGenerator,
  generate,
  default as snowflake,
  constants,
} from "@eliware/snowflake";
export type { SnowflakeGeneratorOptions, SnowflakeConstants } from "@eliware/snowflake";
export {
  createPolicy,
  defaultPolicy,
  redactValue,
  redactHeaders,
  redactText,
  replaceLiteralSecret,
} from "@eliware/redact";
export type {
  RedactionPolicy,
  SerializationOptions,
  StructuredRedactionOptions,
  TextRedactionOptions,
} from "@eliware/redact";
export { default as registerHandlers } from "@eliware/errors";
export { default as registerSignals } from "@eliware/signals";
export type {
  RegisterHandlersOptions,
  RegisteredHandlers,
  RegisterSignalsOptions,
  SignalsRegistration,
};

export type Logger = typeof logger;
