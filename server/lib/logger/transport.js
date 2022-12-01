export default class Transport {
  levels = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'FATAL']

  constructor(levels) {
    if (levels) {
      this.levels = levels
    }
  }

  getCurrentDate() {
    return new Date().toISOString()
  }
  writeLog(level, message, additional) {
    if (this.levels.includes(level)) {
      this.write(level, message, additional)
    }
  }
}
