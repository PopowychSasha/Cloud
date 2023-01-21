import { setTokens } from './set-tokens'
import { registerUser } from './register-user.js'
import db from '../../db/db.js'
import { findUserByEmail } from './find-user-by-email.js'

describe('set-tokens.js', () => {
  beforeEach(async () => {
    await db('users').del()
    await db('roles').del()

    await db('roles').insert({ id: 1, role: 'user' })
  })
  it('should return tokens for authentication', async () => {
    await registerUser('Sasha', 'sashapopovych@gmail.com', '84Ik123*')

    const tokens = await setTokens({
      id: 1,
      name: 'Sasha',
      email: 'sashapopovych@gmail.com',
    })

    expect(tokens.accessToken).toBeTruthy()
    expect(tokens.refreshToken).toBeTruthy()
  })
})
