import db from '../../db/db.js'

export const removeRefreshToken = async (refreshToken) => {
  await db('users')
    .update({ refreshToken: null })
    .where('refreshToken', '=', refreshToken)
}
