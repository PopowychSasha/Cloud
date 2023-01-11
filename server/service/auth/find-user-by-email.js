import db from '../../db/db.js'

export const findUserByEmail = async (email) => {
  const [user] = await db('users').where('email', '=', email)

  return user
}
