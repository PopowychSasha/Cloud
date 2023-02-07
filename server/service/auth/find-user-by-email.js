import db from '../../db/db.js'

export const findUserByEmail = async (email) =>
  db('users').where('email', '=', email).first()
