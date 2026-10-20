import {
  fs,
  log,
  createLogger,
  safeSerialize,
  path,
  pathUrl,
  getCurrentDirname,
  getCurrentFilename,
  resolvePath,
  relativePath,
  fileUrlToPath,
  createSnowflakeGenerator,
  generate,
  snowflake,
  constants as snowflakeConstants,
  createPolicy,
  defaultPolicy,
  redactValue,
  redactHeaders,
  redactText,
  replaceLiteralSecret,
  defaultEvents,
  registerHandlers,
  registerSignals,
} from "../src/index.mjs";
import snowflakeDefault, * as snowflakePackage from "@eliware/snowflake";
import * as redactPackage from "@eliware/redact";
import * as errorsPackage from "@eliware/errors";
import * as commonPackage from "../src/index.mjs";

test("re-exports the exact dependency API surface", () => {
  expect(Object.keys(commonPackage).sort()).toEqual([
    "constants",
    "createLogger",
    "createPolicy",
    "createSnowflakeGenerator",
    "defaultEvents",
    "defaultPolicy",
    "fileUrlToPath",
    "fs",
    "generate",
    "getCurrentDirname",
    "getCurrentFilename",
    "log",
    "path",
    "pathUrl",
    "redactHeaders",
    "redactText",
    "redactValue",
    "registerHandlers",
    "registerSignals",
    "relativePath",
    "replaceLiteralSecret",
    "resolvePath",
    "safeSerialize",
    "snowflake",
  ]);
});

test("exports the public API", () => {
  expect({
    readFile: typeof fs.readFile,
    logger: typeof log.info,
    createLogger: typeof createLogger,
    safeSerialize: typeof safeSerialize,
    path: typeof path,
    pathUrl: typeof pathUrl,
    getCurrentDirname: typeof getCurrentDirname,
    getCurrentFilename: typeof getCurrentFilename,
    resolvePath: typeof resolvePath,
    relativePath: typeof relativePath,
    fileUrlToPath: typeof fileUrlToPath,
    createSnowflakeGenerator: typeof createSnowflakeGenerator,
    generate: typeof generate,
    registerHandlers: typeof registerHandlers,
    registerSignals: typeof registerSignals,
    defaultEvents: Array.isArray(defaultEvents),
  }).toEqual({
    readFile: "function",
    logger: "function",
    createLogger: "function",
    safeSerialize: "function",
    path: "function",
    pathUrl: "function",
    getCurrentDirname: "function",
    getCurrentFilename: "function",
    resolvePath: "function",
    relativePath: "function",
    fileUrlToPath: "function",
    createSnowflakeGenerator: "function",
    generate: "function",
    registerHandlers: "function",
    registerSignals: "function",
    defaultEvents: true,
  });

  expect({
    snowflake: snowflake === snowflakeDefault,
    generate: generate === snowflakePackage.generate,
    createSnowflakeGenerator:
      createSnowflakeGenerator === snowflakePackage.createSnowflakeGenerator,
    constants: snowflakeConstants === snowflakePackage.constants,
    packageSnowflake: snowflakePackage.snowflake === snowflakeDefault,
    createPolicy: createPolicy === redactPackage.createPolicy,
    defaultPolicy: defaultPolicy === redactPackage.defaultPolicy,
    redactValue: redactValue === redactPackage.redactValue,
    redactHeaders: redactHeaders === redactPackage.redactHeaders,
    redactText: redactText === redactPackage.redactText,
    replaceLiteralSecret: replaceLiteralSecret === redactPackage.replaceLiteralSecret,
    redactSafeSerialize: safeSerialize === redactPackage.safeSerialize,
    errorsDefaultEvents: defaultEvents === errorsPackage.defaultEvents,
  }).toEqual({
    snowflake: true,
    generate: true,
    createSnowflakeGenerator: true,
    constants: true,
    packageSnowflake: true,
    createPolicy: true,
    defaultPolicy: true,
    redactValue: true,
    redactHeaders: true,
    redactText: true,
    replaceLiteralSecret: true,
    redactSafeSerialize: true,
    errorsDefaultEvents: true,
  });
});

test("creates decimal string IDs through the common API", () => {
  const createId = createSnowflakeGenerator({
    epoch: 0,
    workerId: 1,
    processId: 2,
    now: () => 1,
  });

  expect(createId()).toMatch(/^\d+$/);
});

test("redacts text, objects, and headers through the common API", () => {
  const policy = createPolicy({ keys: [...defaultPolicy.keys, "sessionId"] });

  expect(redactText("sessionId=example-value", { keys: ["sessionId"], marker: "[HIDDEN]" })).toBe(
    "sessionId=[HIDDEN]",
  );
  expect(redactValue({ sessionId: "example-value" }, policy)).toEqual({
    sessionId: "[REDACTED]",
  });
  expect(redactHeaders({ Authorization: "Bearer example-token" })).toEqual({
    Authorization: "[REDACTED]",
  });
  expect(replaceLiteralSecret("token=example-secret", "example-secret")).toBe("token=[REDACTED]");
});
