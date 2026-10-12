import { jest } from "@jest/globals";
import registerHandlers from "../src/errors.mjs";

const fakeProcess = () => ({ on: jest.fn(), once: jest.fn(), off: jest.fn(), exit: jest.fn() });
const silentLogger = () => ({
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
});

test("registers and removes error handlers", () => {
  const processObj = fakeProcess();
  const registration = registerHandlers({
    processObj,
    log: silentLogger(),
    events: ["warning"],
    once: true,
  });

  expect(processObj.once).toHaveBeenCalledWith("warning", expect.any(Function));
  registration.removeHandlers();
  expect(registration.removed).toBe(true);
  expect(processObj.off).toHaveBeenCalledWith("warning", expect.any(Function));
});

test("removes error handlers when its abort signal fires", () => {
  const abortController = new AbortController();
  const registration = registerHandlers({
    processObj: fakeProcess(),
    log: silentLogger(),
    signal: abortController.signal,
  });

  abortController.abort();
  expect(registration.removed).toBe(true);
});
