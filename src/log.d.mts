type SafeSerializedValue =
  null | boolean | number | string | SafeSerializedValue[] | { [key: string]: SafeSerializedValue };

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
  options?: import("@eliware/redact").SerializationOptions,
): SafeSerializedValue;

export declare const log: import("winston").Logger & {
  debug(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
  info(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
  warn(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
  error(message: unknown, meta?: unknown, ...args: unknown[]): import("winston").Logger;
} & { [level: string]: unknown };

export default log;
