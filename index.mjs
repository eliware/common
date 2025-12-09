import fs from 'fs';
import { log } from '@eliware/log';
import { path, pathUrl, getCurrentDirname, getCurrentFilename } from '@eliware/path';
import { registerHandlers } from '@eliware/errors';
import { registerSignals } from '@eliware/signals';

export {
  fs,
  log,
  path,
  pathUrl,
  getCurrentDirname,
  getCurrentFilename,
  registerHandlers,
  registerSignals,
};
