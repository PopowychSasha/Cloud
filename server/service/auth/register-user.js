import db from '../../db/db.js'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

export const registerUser = async (name, email, password) => {
  const [user] = await db('users').where('email', '=', email)

  if (user) {
    throw new Error('The user with this email is already registered')
  }

  await db('users').insert({
    name,
    email,
    password: await bcrypt.hash(password, 12),
    email_confirmation_token: uuidv4(),
  })
}
