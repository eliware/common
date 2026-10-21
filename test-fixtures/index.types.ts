import type * as Common from "@eliware/common";
import type * as Errors from "@eliware/errors";
import type * as Log from "@eliware/log";
import type * as Redact from "@eliware/redact";
import type * as Signals from "@eliware/signals";
import type * as Snowflake from "@eliware/snowflake";
import type * as Path from "@eliware/path";

type Equal<Left, Right> =
  (<Value>() => Value extends Left ? 1 : 2) extends <Value>() => Value extends Right ? 1 : 2
    ? true
    : false;
type Expect<Value extends true> = Value;

export type DependencyTypeContract = [
  Expect<Equal<Common.PathLogger, Path.PathLogger>>,
  Expect<Equal<Common.PathHelpersOptions, Path.PathHelpersOptions>>,
  Expect<Equal<Common.PathHelpers, Path.PathHelpers>>,
  Expect<Equal<Common.LoggerWithConfiguredLevels, Log.LoggerWithConfiguredLevels>>,
  Expect<Equal<Common.RedactionOptions, Log.RedactionOptions>>,
  Expect<Equal<Common.SafeSerializedValue, Log.SafeSerializedValue>>,
  Expect<Equal<Common.Logger, Errors.Logger>>,
  Expect<Equal<Common.ProcessEvent, Errors.ProcessEvent>>,
  Expect<Equal<Common.ProcessListener, Errors.ProcessListener>>,
  Expect<Equal<Common.ProcessLike, Errors.ProcessLike>>,
  Expect<Equal<Common.RegisterHandlersOptions, Errors.RegisterHandlersOptions>>,
  Expect<Equal<Common.RegisteredHandlers, Errors.RegisteredHandlers>>,
  Expect<Equal<Common.NodeSignal, Signals.NodeSignal>>,
  Expect<Equal<Common.SignalsProcessLike, Signals.ProcessLike>>,
  Expect<Equal<Common.SignalsLogger, Signals.SignalsLogger>>,
  Expect<Equal<Common.RegisterSignalsOptions, Signals.RegisterSignalsOptions>>,
  Expect<Equal<Common.SignalsRegistration, Signals.SignalsRegistration>>,
  Expect<Equal<Common.RedactionPolicy, Redact.RedactionPolicy>>,
  Expect<Equal<Common.SerializationOptions, Redact.SerializationOptions>>,
  Expect<Equal<Common.StructuredRedactionOptions, Redact.StructuredRedactionOptions>>,
  Expect<Equal<Common.TextRedactionOptions, Redact.TextRedactionOptions>>,
  Expect<Equal<Common.SnowflakeGeneratorOptions, Snowflake.SnowflakeGeneratorOptions>>,
  Expect<Equal<Common.SnowflakeConstants, Snowflake.SnowflakeConstants>>,
];
