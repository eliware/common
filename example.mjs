import {
  fs,
  log,
  path,
  pathUrl,
  resolvePath,
  registerHandlers,
  registerSignals,
} from '@eliware/common';

const configPath = path(import.meta, '.env');
const configUrl = pathUrl(import.meta, '.env');
const configDirectory = resolvePath(import.meta);

log.info('Common package example', {
  configPath,
  configUrl,
  configDirectory,
  files: fs.readdirSync(configDirectory),
});

const errorHandlers = registerHandlers({
  events: ['uncaughtException', 'unhandledRejection'],
});

const signals = registerSignals({
  shutdownHook: async signal => {
    log.info(`Cleaning up after ${signal}`);
    errorHandlers.removeHandlers();
  },
});

log.info('Handlers registered. Send SIGTERM or SIGINT to shut down gracefully.');

// Keep the process alive for this demonstration; real applications usually
// stay alive because they have a server, worker, or other active resource.
void signals;
