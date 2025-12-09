const fs = require('fs');
const log = require('@eliware/log').default || require('@eliware/log');
const pathModule = require('@eliware/path');
const path = pathModule.default || pathModule;
const pathUrl = pathModule.pathUrl;
const getCurrentDirname = pathModule.getCurrentDirname;
const getCurrentFilename = pathModule.getCurrentFilename;
const { registerHandlers } = require('@eliware/errors');
const { registerSignals } = require('@eliware/signals');

module.exports = {
  fs,
  log,
  path,
  pathUrl,
  getCurrentDirname,
  getCurrentFilename,
  registerHandlers,
  registerSignals,
};
