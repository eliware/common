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
  registerHandlers,
  registerSignals,
} from "../src/index.mjs";

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
  expect(typeof registerHandlers).toBe("function");
  expect(typeof registerSignals).toBe("function");
});
