import * as fs from 'fs';
import { log } from '@eliware/log';
import { path, pathUrl, getCurrentDirname, getCurrentFilename } from '@eliware/path';
import { registerHandlers } from '@eliware/errors';
import { registerSignals, RegisterSignalsOptions } from '@eliware/signals';

export { fs };
export { log };
export { path };
export { pathUrl };
export { getCurrentDirname };
export { getCurrentFilename };
export { registerHandlers };
export { registerSignals };
export type { RegisterSignalsOptions };
