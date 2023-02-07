import { transport } from '../../mail-transport/transport.js'
import db from '../../db/db.js'

export const sendResetPasswordEmail = async (email, user_id) => {
  let [resetPasswordToken] = await db('reset_password_tokens')
    .where('user_id', '=', user_id)
    .andWhere('isUsed', '=', false)
    .andWhere('activeUntil', '>', new Date())

  if (resetPasswordToken) {
    await transport.sendMail({
      to: email,
      subject: 'Account password reset',
      html: `<div>Click on <a href="http://${process.env.HOST}:${process.env.PORT}/api/reset_password/${resetPasswordToken.token}">reset password</a> to change it</div>`,
    })
    return
  }
}
