import { pathToFileURL } from "node:url";
import path, {
  createPathHelpers,
  pathUrl,
  getCurrentDirname,
  getCurrentFilename,
  resolvePath,
  relativePath,
  fileUrlToPath,
} from "../src/path.mjs";

test("exports path helpers", () => {
  const filePath = path(import.meta, "nested", "file");
  expect(filePath).toContain("nested");
  expect(pathUrl(import.meta, "file")).toMatch(/^file:/);
  expect(getCurrentFilename(import.meta)).toMatch(/path\.test\.mjs$/);
  expect(getCurrentDirname(import.meta)).toBeTruthy();
  expect(resolvePath(import.meta, "file")).toContain("file");
  expect(relativePath(import.meta, "file")).toBe("file");
  expect(fileUrlToPath(pathToFileURL(filePath))).toBe(filePath);
});

test("creates path helpers that record operation results", () => {
  const records = [];
  const helpers = createPathHelpers({ logger: { log: (record) => records.push(record) } });

  expect(helpers.path(import.meta, "nested", "file")).toContain("nested");
  expect(records).toHaveLength(1);
  expect(records[0]).toMatchObject({
    level: "debug",
    message: "Path operation completed",
    operation: "path",
    inputType: "import-meta",
    segmentCount: 2,
    resultType: "string",
  });
});
