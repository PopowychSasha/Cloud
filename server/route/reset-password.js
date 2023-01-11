import { Router } from 'express'
import {
  resetPassword,
  resetUserPassword,
  setNewPassword,
} from '../controller/reset-password.js'
import { check } from 'express-validator'
import { validator } from '../request-validator/validator.js'

const routes = Router()

routes.post(
  '/reset/password',
  [check('email').isEmail()],
  validator,
  resetPassword
)

routes.get('/reset/password/:token', resetUserPassword)

routes.post(
  '/set/new/password/:token',
  [
    check('newPassword', 'confirmPassword').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
  ],
  setNewPassword
)

export default routes
