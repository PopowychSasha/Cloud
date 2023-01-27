import { sendResetPasswordEmail } from '../service/reset-password/send-reset-password-email.js'
import { initPasswordResetToken } from '../service/reset-password/init-password-reset-token.js'
import { findUserByEmail } from '../service/auth/find-user-by-email.js'
import { validationResult } from 'express-validator'
import { updateUserPassword } from '../service/reset-password/update-user-password.js'
import { checkResetPasswordToken } from '../service/reset-password/check-reset-password-token.js'

export const resetPasswordController = async (req, res, next) => {
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

export const resetUserPasswordController = async (req, res, next) => {
  const { token } = req.params
  try {
    const isTokenValid = await checkResetPasswordToken(token)

    if (!isTokenValid) {
      return res.status(403).send(
        `<center>
          <h1>The password reset link is not valid</h1>
        </center>`
      )
    }
    return res.send(
      `<form action="/api/set/new/password/${token}" method="post">
          <h2>Enter a new password</h2>
          <input type="password" minlength="8" placeholder="password" name="newPassword"/>
          <br/><br/> 
          <input type="password" minlength="8" placeholder="confirm password" name="confirmPassword"/>
          <br/><br/> 
          <input type="submit" value="change"/>
      </form>`
    )
  } catch (err) {
    next(err)
  }
}

export const setNewPasswordController = async (req, res, next) => {
  const { token } = req.params
  try {
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.send(
        `<center>
          <h2>
            Password and confirm password not matched
            <a href='http://${process.env.HOST}:${process.env.PORT}/api/reset/password/${token}'>try again</a>
          </h2>
        </center>`
      )
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.send(
        `<center>
          <h2>
            Password must has minimum eight characters, at least one letter and one number 
            <a href='http://${process.env.HOST}:${process.env.PORT}/api/reset/password/${token}'>try again</a>
          </h2>
        </center>`
      )
    }

    const { newPassword } = req.body
    const isTokenValid = await checkResetPasswordToken(token)

    if (!isTokenValid) {
      return res.send(
        `<center>
          <h1>The password reset link is not valid</h1>
        </center>`
      )
    }
    await updateUserPassword(newPassword, token)

    res.send(
      `<center>
        <h1>Password change was successful</h1>
      </center>`
    )
  } catch (err) {
    console.log(err)
    next(err)
  }
}
