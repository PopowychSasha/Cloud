import bcrypt from 'bcrypt'
import db from '../../db/db.js'

export const updateUserPassword = async (newPassword, token) => {
  await db.transaction(async (trx) => {
    const reset_password = await db('reset_password_tokens')
      .where('token', '=', token)
      .transacting(trx)
      .first()

    await db('users')
      .update({ password: await bcrypt.hash(newPassword, 12) })
      .where('id', '=', reset_password.user_id)
      .transacting(trx)

    await db('reset_password_tokens')
      .update({ isUsed: true })
      .where('token', '=', token)
      .transacting(trx)
  })
}
