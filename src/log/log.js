import Logger from '../../lib/logger/logger.js'
import ConsoleTransport from '../../lib/logger/consoleTransport.js'
import FileTransport from '../../lib/logger/fileTransport.js'

export default new Logger(
  new ConsoleTransport(['DEBUG', 'INFO', 'WARNING']),
  new FileTransport('./src/log/file.txt', ['ERROR', 'FATAL'])
)
