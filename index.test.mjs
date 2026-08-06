import { jest } from '@jest/globals';
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
} from './index.mjs';

const silentLogger = () => ({ debug: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() });
const fakeProcess = () => ({ on: jest.fn(), once: jest.fn(), off: jest.fn(), exit: jest.fn() });

test('re-exports the complete public API', () => {
  expect(typeof fs.readFile).toBe('function');
  expect(typeof log.info).toBe('function');
  expect(typeof createLogger).toBe('function');
  expect(typeof safeSerialize).toBe('function');
  expect(typeof path).toBe('function');
  expect(typeof pathUrl).toBe('function');
  expect(typeof getCurrentDirname).toBe('function');
  expect(typeof getCurrentFilename).toBe('function');
  expect(typeof resolvePath).toBe('function');
  expect(typeof relativePath).toBe('function');
  expect(typeof fileUrlToPath).toBe('function');
  expect(typeof registerHandlers).toBe('function');
  expect(typeof registerSignals).toBe('function');
});

test('re-exports fs and path helpers without changing behavior', () => {
  expect(fs).toBeDefined();
  expect(path(import.meta, 'nested', 'file')).toContain('nested');
  expect(pathUrl(import.meta, 'file')).toMatch(/^file:/);
  expect(getCurrentFilename(import.meta)).toMatch(/index\.test\.mjs$/);
  expect(getCurrentDirname(import.meta)).toBeTruthy();
  expect(resolvePath(import.meta, 'file')).toContain('file');
  expect(relativePath(import.meta, 'file')).toBe('file');
  expect(fileUrlToPath(new URL('file:///tmp/example.txt'))).toBe('/tmp/example.txt');
});

test('re-exports logger factory and serializer behavior', () => {
  const logger = createLogger({ transports: [] });
  expect(typeof logger.info).toBe('function');
  expect(safeSerialize(null)).toBeNull();
  expect(safeSerialize('value')).toBe('value');
  expect(safeSerialize(new Error('failure'))).toEqual(expect.objectContaining({ name: 'Error', message: 'failure' }));
  expect(safeSerialize({ password: 'secret', nested: { id: 7 } }, new Set(['password']))).toEqual({ password: '[REDACTED]', nested: { type: 'Object', id: 7 } });
});

test('re-exports configurable error handlers with cleanup', () => {
  const processObj = fakeProcess();
  const logger = silentLogger();
  const registration = registerHandlers({ processObj, log: logger, events: ['warning'], once: true });
  expect(processObj.once).toHaveBeenCalledWith('warning', expect.any(Function));
  expect(registration.removed).toBe(false);
  registration.removeHandlers();
  expect(registration.removed).toBe(true);
  expect(processObj.off).toHaveBeenCalledWith('warning', expect.any(Function));
  registration.removeHandlers();
  expect(processObj.off).toHaveBeenCalledTimes(1);
});

test('re-exports signal handlers with hooks and cleanup', async () => {
  const processObj = fakeProcess();
  const logger = silentLogger();
  const hook = jest.fn();
  const registration = registerSignals({ processObj, log: logger, signals: ['SIGTERM'], shutdownHook: hook, exit: false });
  expect(processObj.on).toHaveBeenCalledTimes(3);
  expect(registration.getShuttingDown()).toBe(false);
  await registration.shutdown('manual');
  expect(registration.getShuttingDown()).toBe(true);
  expect(hook).toHaveBeenCalledWith('manual');
  await registration.shutdown('again');
  expect(logger.warn).toHaveBeenCalled();
  registration.removeHandlers();
  expect(registration.removed).toBe(true);
  registration.removeHandlers();
});

test('supports abort-signal cleanup for both handler packages', () => {
  const abortController = new AbortController();
  const processObj = fakeProcess();
  const errorRegistration = registerHandlers({ processObj, log: silentLogger(), signal: abortController.signal });
  abortController.abort();
  expect(errorRegistration.removed).toBe(true);

  const signalController = new AbortController();
  const signalProcess = fakeProcess();
  const signalRegistration = registerSignals({ processObj: signalProcess, log: silentLogger(), exit: false, signal: signalController.signal });
  signalController.abort();
  expect(signalRegistration.removed).toBe(true);
});
