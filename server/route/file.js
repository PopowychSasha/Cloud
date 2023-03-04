import { Router } from 'express'
import {
  createFolder,
  deleteFiles,
  deleteSharedFiles,
  downloadFile,
  favoriteFileToggle,
  fetchShareFile,
  getFilesFromFolder,
  getSpaceInfo,
  renameUsersFile,
  shareFileByEmail,
  shareFileByLink,
  uploadFile,
} from '../controller/file.js'
import uploadFileMiddleware from '../middleware/file.js'
import { passport } from '../authentication/passport.js'
import { check } from 'express-validator'
import { validator } from '../request-validator/validator.js'

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

routes.delete(
  '/files',
  passport.authenticate('jwt', { session: false }),
  deleteFiles
)

routes.get(
  '/space',
  passport.authenticate('jwt', { session: false }),
  getSpaceInfo
)

routes.post('/share/link', shareFileByLink)

routes.get(
  '/files/share',
  passport.authenticate('jwt', { session: false }),
  fetchShareFile
)

routes.post(
  '/share/email',
  [check('email').isEmail().withMessage('does not match the template')],
  validator,
  shareFileByEmail
)

routes.delete(
  '/files/shared',
  passport.authenticate('jwt', { session: false }),
  deleteSharedFiles
)

routes.patch(
  '/file/rename',
  passport.authenticate('jwt', { session: false }),
  renameUsersFile
)

routes.patch(
  '/file/favorites/:fileId',
  passport.authenticate('jwt', { session: false }),
  favoriteFileToggle
)

export default routes
