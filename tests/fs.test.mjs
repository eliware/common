import fs, { fs as namedFs } from "../src/fs.mjs";

test("exports Node.js file system APIs", () => {
  expect(namedFs).toBe(fs);
  expect(typeof fs.readFile).toBe("function");
});
