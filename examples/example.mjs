import {
  fs,
  log,
  path,
  pathUrl,
  resolvePath,
  registerHandlers,
  registerSignals,
} from "@eliware/common";

const configPath = path(import.meta, ".env");
const configUrl = pathUrl(import.meta, ".env");
const configDirectory = resolvePath(import.meta);

log.info("Common package example", {
  configPath,
  configUrl,
  configDirectory,
  files: fs.readdirSync(configDirectory),
});

const errorHandlers = registerHandlers({
  events: ["uncaughtException", "unhandledRejection"],
});

const keepAlive = setInterval(() => log.info("Waiting for SIGTERM or SIGINT."), 60_000);

registerSignals({
  shutdownHook: async (signal) => {
    log.info(`Cleaning up after ${signal}`);
    errorHandlers.removeHandlers();
    clearInterval(keepAlive);
  },
});

log.info("Handlers registered. Send SIGTERM or SIGINT to shut down gracefully.");
