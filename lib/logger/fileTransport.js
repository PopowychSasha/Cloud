import fs from 'fs'
import Transport from './transport.js'

export default class FileTransport extends Transport {
  constructor(file, levels) {
    super(levels)
    this.file = file
  }

  write(level, message, additional) {
    const additionalToLog = additional ? JSON.stringify(additional) : ''
    const information = `${this.getCurrentDate()} ${level} ${message}; ${additionalToLog} \n\n`
    fs.appendFile(this.file, information, (err) => {
      if (err) {
        throw err
      }
    })
  }
}
