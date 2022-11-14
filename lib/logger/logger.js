export default class Logger {
  constructor(...transports) {
    this.transports = transports
  }
  log(level, message, additional) {
    this.transports.forEach((transport) => {
      transport.writeLog(level, message, additional)
    })
  }
  debug(message, additional) {
    this.log('DEBUG', message, additional)
  }
  info(message, additional) {
    this.log('INFO', message, additional)
  }
  warning(message, additional) {
    this.log('WARNING', message, additional)
  }
  error(message, additional) {
    this.log('ERROR', message, additional)
  }
  fatal(message, additional) {
    this.log('FATAL', message, additional)
  }
}
