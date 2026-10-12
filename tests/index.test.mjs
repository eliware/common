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
  registerHandlers,
  registerSignals,
} from "../src/index.mjs";
import snowflakeDefault, * as snowflakePackage from "@eliware/snowflake";
import * as redactPackage from "@eliware/redact";

test("exports the public API", () => {
  expect(typeof fs.readFile).toBe("function");
  expect(typeof log.info).toBe("function");
  expect(typeof createLogger).toBe("function");
  expect(typeof safeSerialize).toBe("function");
  expect(typeof path).toBe("function");
  expect(typeof pathUrl).toBe("function");
  expect(typeof getCurrentDirname).toBe("function");
  expect(typeof getCurrentFilename).toBe("function");
  expect(typeof resolvePath).toBe("function");
  expect(typeof relativePath).toBe("function");
  expect(typeof fileUrlToPath).toBe("function");
  expect(typeof createSnowflakeGenerator).toBe("function");
  expect(typeof generate).toBe("function");
  expect(snowflake).toBe(snowflakeDefault);
  expect(generate).toBe(snowflakePackage.generate);
  expect(createSnowflakeGenerator).toBe(snowflakePackage.createSnowflakeGenerator);
  expect(snowflakeConstants).toBe(snowflakePackage.constants);
  expect(snowflakePackage.snowflake).toBe(snowflakeDefault);
  expect(createPolicy).toBe(redactPackage.createPolicy);
  expect(defaultPolicy).toBe(redactPackage.defaultPolicy);
  expect(redactValue).toBe(redactPackage.redactValue);
  expect(redactHeaders).toBe(redactPackage.redactHeaders);
  expect(redactText).toBe(redactPackage.redactText);
  expect(replaceLiteralSecret).toBe(redactPackage.replaceLiteralSecret);
  expect(safeSerialize).toBe(redactPackage.safeSerialize);
  expect(typeof registerHandlers).toBe("function");
  expect(typeof registerSignals).toBe("function");
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
