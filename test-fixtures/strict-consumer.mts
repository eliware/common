import {
  createLogger,
  createPathHelpers,
  createSnowflakeGenerator,
  constants,
  defaultEvents,
  fileUrlToPath,
  log,
  path,
  registerHandlers,
  registerSignals,
  safeSerialize,
  snowflake,
} from "@eliware/common";
import type {
  LoggerWithConfiguredLevels,
  NodeSignal,
  PathHelpers,
  PathHelpersOptions,
  PathLogger,
  ProcessEvent,
  ProcessLike,
  ProcessListener,
  RedactionOptions,
  RedactionPolicy,
  RegisterHandlersOptions,
  RegisterSignalsOptions,
  RegisteredHandlers,
  SafeSerializedValue,
  SignalsLogger,
  SignalsProcessLike,
  SignalsRegistration,
  SnowflakeConstants,
  SnowflakeGeneratorOptions,
  StructuredRedactionOptions,
  TextRedactionOptions,
} from "@eliware/common";

const logger: LoggerWithConfiguredLevels = log;
const configuredLogger = createLogger();
const pathLogger: PathLogger = logger;
const helperOptions: PathHelpersOptions = { logger: pathLogger };
const helpers: PathHelpers = createPathHelpers(helperOptions);
const snowflakeOptions: SnowflakeGeneratorOptions = { logger };
const snowflakeConstants: SnowflakeConstants = constants;
const handlersOptions: RegisterHandlersOptions = {};
const processLike: ProcessLike = process;
const signalsOptions: RegisterSignalsOptions = {};
const signalsProcess: SignalsProcessLike = process;
const signalsLogger: SignalsLogger = logger;
const redactionOptions: RedactionOptions = {};
const policy: RedactionPolicy = {};
const structuredOptions: StructuredRedactionOptions = {};
const textOptions: TextRedactionOptions = {};
const event: ProcessEvent = defaultEvents[0];
const listener: ProcessListener = () => {};
const registered: RegisteredHandlers = { removed: false, removeHandlers() {} };
const signal: NodeSignal = "SIGTERM";
const registration: SignalsRegistration = {
  removed: false,
  async shutdown() {},
  getShuttingDown: () => false,
  removeHandlers() {},
};
const serialized: SafeSerializedValue = safeSerialize({ event }, redactionOptions);

void [
  fileUrlToPath,
  helpers,
  log,
  path,
  processLike,
  registerHandlers(handlersOptions),
  registerSignals(signalsOptions),
  registered,
  registration,
  safeSerialize("value", structuredOptions),
  snowflakeOptions,
  snowflakeConstants,
  snowflake,
  signalsProcess,
  signalsLogger,
  policy,
  textOptions,
  listener,
  signal,
  serialized,
  logger,
  configuredLogger,
  createSnowflakeGenerator,
];
