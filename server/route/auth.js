import { Router } from 'express'
import {
  authenticationController,
  getUserInfo,
  logout,
  refreshAccessToken,
  registerController,
} from '../controller/auth.js'
import { check } from 'express-validator'
import { passport } from '../authentication/passport.js'
import { validator } from '../request-validator/validator.js'

const router = Router()

router.post(
  '/register',
  [
    check('name')
      .isString()
      .isLength({ min: 3, max: 15 })
      .withMessage('must have a minimum of 3 and a maximum of 15 characters'),
    check('email').isEmail().withMessage('does not match the template'),
    check('password')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .withMessage('must have letters, numbers and special characters'),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('does not match the password field')
      }
      return true
    }),
  ],
  validator,
  registerController
)

router.post(
  '/authentication',
  [check('email').isEmail().withMessage('does not match the template')],
  validator,
  authenticationController
)
router.get('/logout', logout)

router.get('/access_token', refreshAccessToken)
router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  getUserInfo
)

export default router
