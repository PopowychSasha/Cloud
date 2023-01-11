import db from '../../db/db.js'

export const checkResetPasswordToken = async (token) => {
  const [reset_password] = await db('reset_password_tokens').where(
    'token',
    '=',
    token
  )
  if (!reset_password) {
    return false
  }
  return new Date() < reset_password.activeUntil
}
