import { sendMail } from '../../mail-transport/transport.js'
import db from '../../db/db.js'
import { resetPasswordLink } from './reset-password-link.js'

export const sendResetPasswordEmail = async (email, user_id) => {
  let [resetPasswordToken] = await db('reset_password_tokens')
    .where('user_id', '=', user_id)
    .andWhere('isUsed', '=', false)
    .andWhere('activeUntil', '>', new Date())

  if (resetPasswordToken) {
    await sendMail(
      {
        email,
        title: 'Account password reset',
        link: resetPasswordLink(resetPasswordToken.token),
      },
      'reset_password'
    )
    return
  }
}
