import { Router } from 'express'
import {
  resetPasswordLink,
  resetUserPassword,
  setNewPassword,
} from '../controller/reset-password.js'
import { check } from 'express-validator'
import { validator } from '../request-validator/validator.js'

const routes = Router()

routes.post(
  '/reset_password_link',
  [check('email').isEmail().withMessage('does not match the template')],
  validator,
  resetPasswordLink
)

routes.get('/reset_password/:token', resetUserPassword)

routes.post(
  '/new_password/:token',
  [
    check('newPassword', 'confirmPassword').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
  ],
  setNewPassword
)

export default routes
