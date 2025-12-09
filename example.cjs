// Example usage of the common package in CommonJS
const { log, path, pathUrl, registerHandlers, registerSignals } = require('@eliware/common');

log.info('This is an info log from @eliware/log');

const { removeHandlers } = registerHandlers();
log.info('Registered error handlers.');

const envFile = path(__dirname, '.env');
log.info(`path to env file: ${envFile}`);

const envFileUrl = pathUrl(__dirname, '.env');
log.info(`pathUrl to env file: ${envFileUrl}`);

const { shutdown } = registerSignals();
log.info('Registered signal handlers.');
