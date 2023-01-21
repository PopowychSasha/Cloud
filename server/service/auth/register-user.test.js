import { registerUser } from './register-user.js'
import { findUserByEmail } from './find-user-by-email.js'
import db from '../../db/db.js'

describe('register-user.js', () => {
  beforeEach(async () => {
    await db('users').del()
    await db('roles').del()

    await db('roles').insert({ id: 1, role: 'user' })
  })
  it('should register a user', async () => {
    await registerUser('sasha', 'sashapopovych@gmail.com', '18377Gi*')
    const user = await findUserByEmail('sashapopovych@gmail.com')

    expect(user.email).toBe('sashapopovych@gmail.com')
  })
  it('should throw error because user is exist', async () => {
    await registerUser('sasha', 'sashapopovych@gmail.com', '18377Gi*')

    await expect(
      registerUser('sasha', 'sashapopovych@gmail.com', '18377Gi*')
    ).rejects.toThrow('The user with this email is already registered')
  })
})
