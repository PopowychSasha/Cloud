import { Router } from 'express'
import {
  createFolder,
  downloadFile,
  getFilesFromFolder,
  uploadFile,
} from '../controller/file.js'
import uploadFileMiddleware from '../middleware/file.js'
import { passport } from '../authentication/passport.js'

const routes = Router()

routes.post(
  '/folder',
  passport.authenticate('jwt', { session: false }),
  createFolder
)
routes.post(
  '/file',
  passport.authenticate('jwt', { session: false }),
  uploadFileMiddleware.single('file'),
  uploadFile
)
routes.get(
  '/folder/:id',
  passport.authenticate('jwt', { session: false }),
  getFilesFromFolder
)

routes.get(
  '/file/:id',
  passport.authenticate('jwt', { session: false }),
  downloadFile
)

export default routes
