import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const getFilePath = (hash) =>
  path.join(__dirname, '..', '..', 'files', `${hash}`)
