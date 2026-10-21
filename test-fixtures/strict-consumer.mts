import {
  createPolicy,
  createLogger,
  createPathHelpers,
  createSnowflakeGenerator,
  constants,
  defaultPolicy,
  defaultEvents,
  fs,
  generate,
  fileUrlToPath,
  getCurrentDirname,
  getCurrentFilename,
  log,
  path,
  pathUrl,
  redactHeaders,
  redactText,
  redactValue,
  registerHandlers,
  registerSignals,
  relativePath,
  replaceLiteralSecret,
  resolvePath,
  safeSerialize,
  snowflake,
} from "@eliware/common";
import type {
  Logger,
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
  SerializationOptions,
  SnowflakeConstants,
  SnowflakeGeneratorOptions,
  StructuredRedactionOptions,
  TextRedactionOptions,
} from "@eliware/common";

const logger = log;
const configuredLogger = createLogger();
const configuredLevels: LoggerWithConfiguredLevels = log;
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
const redactionOptions: SerializationOptions = {};
const logRedactionOptions: RedactionOptions = redactionOptions;
const policy: RedactionPolicy = {};
const structuredOptions: StructuredRedactionOptions = {};
const textOptions: TextRedactionOptions = {};
const event: ProcessEvent = defaultEvents[0];
const safeSerializedValue: SafeSerializedValue = { message: "safe" };
const errorLogger: Logger = { error() {}, warn() {}, debug() {} };
const listener: ProcessListener = () => {};
const registered: RegisteredHandlers = { removed: false, removeHandlers() {} };
const signal: NodeSignal = "SIGTERM";
const registration: SignalsRegistration = {
  removed: false,
  async shutdown() {},
  getShuttingDown: () => false,
  removeHandlers() {},
};
const serialized: unknown = safeSerialize({ event }, redactionOptions);

void [
  fileUrlToPath,
  fs,
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
  createPolicy,
  defaultPolicy,
  redactHeaders,
  redactText,
  redactValue,
  replaceLiteralSecret,
  generate,
  getCurrentDirname,
  getCurrentFilename,
  pathUrl,
  relativePath,
  resolvePath,
  configuredLevels,
  safeSerializedValue,
  logRedactionOptions,
  errorLogger,
];
