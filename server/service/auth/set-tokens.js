import db from '../../db/db.js'
import { generateToken } from './generate-token.js'

export const setTokens = async ({ id, name, email }) => {
  const tokens = {
    accessToken: generateToken({ id, name, email, role_id: 1 }, '20m'),
    refreshToken: generateToken({ id, name, email, role_id: 1 }, '50d'),
  }
  await db('users')
    .update({ refreshToken: tokens.refreshToken })
    .where('id', '=', id)
  return tokens
}
