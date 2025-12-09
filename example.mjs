// Example usage of the common package in ESM
import { log, path, pathUrl, registerHandlers, registerSignals } from '@eliware/common';

log.info('This is an info log from @eliware/log');

const { removeHandlers } = registerHandlers();
log.info('Registered error handlers.');

const envFile = path(import.meta, '.env');
log.info(`path to env file: ${envFile}`);

const envFileUrl = pathUrl(import.meta, '.env');
log.info(`pathUrl to env file: ${envFileUrl}`);

const { shutdown } = registerSignals();
log.info('Registered signal handlers.');
