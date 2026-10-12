import { pathToFileURL } from "node:url";
import path, {
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
