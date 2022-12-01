import Transport from './transport.js'

export default class ConsoleTransport extends Transport {
  logLevelsColor = {
    DEBUG: '\x1b[37m%s\x1b[0m',
    INFO: '\x1b[32m%s\x1b[0m',
    WARNING: '\x1b[33m%s\x1b[0m',
    ERROR: '\x1b[31m%s\x1b[0m',
    FATAL: '\x1b[41m%s\x1b[0m',
  }

  write(level, message) {
    console.log(this.logLevelsColor[level || 'DEBUG'], message + ';')
  }
}
