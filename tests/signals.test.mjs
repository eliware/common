import { jest } from "@jest/globals";
import registerSignals from "../src/signals.mjs";

const fakeProcess = () => ({ on: jest.fn(), once: jest.fn(), off: jest.fn(), exit: jest.fn() });
const silentLogger = () => ({
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
});

test("registers signals and runs shutdown hooks", async () => {
  const processObj = fakeProcess();
  const hook = jest.fn();
  const registration = registerSignals({
    processObj,
    log: silentLogger(),
    signals: ["SIGTERM"],
    shutdownHook: hook,
    exit: false,
  });

  expect(processObj.on).toHaveBeenCalledTimes(2);
  expect(registration.getShuttingDown()).toBe(false);
  await registration.shutdown("manual");
  expect(registration.getShuttingDown()).toBe(true);
  expect(hook).toHaveBeenCalledWith("manual");
  registration.removeHandlers();
  expect(registration.removed).toBe(true);
});

test("removes signal handlers when its abort signal fires", () => {
  const abortController = new AbortController();
  const registration = registerSignals({
    processObj: fakeProcess(),
    log: silentLogger(),
    exit: false,
    signal: abortController.signal,
  });

  abortController.abort();
  expect(registration.removed).toBe(true);
});
