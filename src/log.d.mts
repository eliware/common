import type { SerializationOptions } from "@eliware/redact";

export type LoggerWithConfiguredLevels = import("winston").Logger & {
  [level: string]: unknown;
};

export type SafeSerializedValue =
  null | boolean | number | string | SafeSerializedValue[] | { [key: string]: SafeSerializedValue };

export type RedactionOptions = SerializationOptions;

export declare function createLogger(options?: {
  level?: string;
  transports?: import("winston-transport")[];
  format?: "text" | "json";
  timestamp?: boolean;
  keys?: string[];
}): import("winston").Logger & {
  debug(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
  info(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
  warn(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
  error(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
};

export declare function safeSerialize(
  value: unknown,
  options?: RedactionOptions,
): SafeSerializedValue;

export declare const log: import("winston").Logger & {
  debug(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
  info(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
  warn(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
  error(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
} & LoggerWithConfiguredLevels;

export default log;
