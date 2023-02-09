import { sendResetPasswordEmail } from '../service/reset-password/send-reset-password-email.js'
import { initPasswordResetToken } from '../service/reset-password/init-password-reset-token.js'
import { findUserByEmail } from '../service/auth/find-user-by-email.js'
import { validationResult } from 'express-validator'
import { updateUserPassword } from '../service/reset-password/update-user-password.js'
import { checkResetPasswordToken } from '../service/reset-password/check-reset-password-token.js'

export const resetPasswordLink = async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await findUserByEmail(email)

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with email ${email} not found` })
    }

    await initPasswordResetToken(user.id)
    await sendResetPasswordEmail(email, user.id)
  } catch (err) {
    return next(err)
  }
  return res.status(200).json({})
}

export const resetUserPassword = async (req, res, next) => {
  const { token } = req.params
  try {
    const isTokenValid = await checkResetPasswordToken(token)

    if (!isTokenValid) {
      return res
        .status(403)
        .json({ message: 'the password reset link is not valid' })
    }

    res.status(200).json({})
  } catch (err) {
    next(err)
  }
}

export const setNewPassword = async (req, res, next) => {
  const { token } = req.params
  const { password, confirmPassword } = req.body

  try {
    if (password !== confirmPassword) {
      throw new Error('Password and confirm password not matched')
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new Error(
        'Password must has minimum eight characters, at least one letter and one number'
      )
    }

    const isTokenValid = await checkResetPasswordToken(token)

    if (!isTokenValid) {
      throw new Error('The password reset link is not valid')
    }
    await updateUserPassword(password, token)

    res.status(200).json({ message: 'Password change was successful' })
  } catch (err) {
    next(err)
  }
}
