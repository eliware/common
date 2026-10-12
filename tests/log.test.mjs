import log, { createLogger, safeSerialize } from "../src/log.mjs";

test("exports logger APIs", () => {
  expect(typeof log.info).toBe("function");
  expect(typeof createLogger({ transports: [] }).info).toBe("function");
  expect(safeSerialize(null)).toBeNull();
  expect(safeSerialize(new Error("failure"))).toEqual(
    expect.objectContaining({ name: "Error", message: "failure" }),
  );
});
