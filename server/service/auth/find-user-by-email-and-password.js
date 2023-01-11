import { findUserByEmail } from './find-user-by-email.js'
import bcrypt from 'bcrypt'

export const findUserByEmailAndPassword = async (email, password) => {
  const user = await findUserByEmail(email)
  let isPasswordCorrect = false

  if (user) {
    isPasswordCorrect = await bcrypt.compare(password, user.password)
  }
  if (isPasswordCorrect) {
    return user
  }
}
