import { Router } from 'express'
import {
  authenticationController,
  protectedController,
  registerController,
} from '../controller/auth.js'
import { check } from 'express-validator'
import { passport } from '../authentication/passport.js'
import { validator } from '../request-validator/validator.js'

const router = Router()

router.post(
  '/register',
  [
    check('name').isString().isLength({ min: 3, max: 15 }),
    check('email').isEmail(),
    check('password').matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
  ],
  validator,
  registerController
)

router.post(
  '/authentication',
  [check('email').isEmail(), check('password').isLength({ min: 8 })],
  validator,
  authenticationController
)

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  protectedController
)

export default router
