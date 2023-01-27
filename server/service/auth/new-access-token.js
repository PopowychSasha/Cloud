import jwt from 'jsonwebtoken'
import { findUserByEmail } from './find-user-by-email.js'
import { generateToken } from './generate-token.js'

export const newAccessToken = async (refreshToken) => {
  try {
    const userTokenData = jwt.verify(refreshToken, process.env.TOKEN_KEY)
    const { id, name, email, role_id } = await findUserByEmail(
      userTokenData.email
    )
    return generateToken({ id, name, email, role_id }, '10m')
  } catch (err) {
    return false
  }
}
