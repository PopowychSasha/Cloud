import jwt from 'jsonwebtoken'

export const generateToken = (payload, expiresIn = '1m') => {
  return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn })
}
