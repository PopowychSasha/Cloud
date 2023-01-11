import db from '../../db/db.js'
import { v4 as uuidv4 } from 'uuid'

export const initPasswordResetToken = async (user_id) => {
  const [isResetToken] = await db('reset_password_tokens')
    .where('user_id', '=', user_id)
    .andWhere('isUsed', '=', false)
    .andWhere('activeUntil', '>', new Date())

  if (!isResetToken) {
    await db('reset_password_tokens').insert({
      token: uuidv4(),
      user_id,
      activeUntil: new Date(new Date().getTime() + 3600000),
    })
  }
}
