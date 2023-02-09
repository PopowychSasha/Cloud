import db from '../../db/db.js'

export const activateUserAccount = async (email_confirmation_token) => {
  const [user] = await db('users').where(
    'email_confirmation_token',
    '=',
    email_confirmation_token
  )

  if (user && user.is_confirmed) {
    return 'This account is already activated'
  } else if (user && !user.is_confirmed) {
    await db('users')
      .update({ is_confirmed: true })
      .where('email_confirmation_token', '=', email_confirmation_token)
    return 'You have successfully activated your account'
  } else {
    return 'Wrong account activation link'
  }
}
