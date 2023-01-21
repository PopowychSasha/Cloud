import { Router } from 'express'
import {
  resetPasswordController,
  resetUserPasswordController,
  setNewPasswordController,
} from '../controller/reset-password.js'
import { check } from 'express-validator'
import { validator } from '../request-validator/validator.js'

const routes = Router()

routes.post(
  '/reset/password',
  [check('email').isEmail()],
  validator,
  resetPasswordController
)

routes.get('/reset/password/:token', resetUserPasswordController)

routes.post(
  '/set/new/password/:token',
  [
    check('newPassword', 'confirmPassword').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
  ],
  setNewPasswordController
)

export default routes
