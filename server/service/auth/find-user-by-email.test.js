import { findUserByEmail } from './find-user-by-email.js'
import db from '../../db/db.js'
import { registerUser } from './register-user.js'

describe('find-user-by-email.js', () => {
  beforeEach(async () => {
    await db('users').del()
    await db('roles').del()

    await db('roles').insert([{ id: 1, role: 'user' }])
  })

  it('should find the user by their email', async () => {
    await registerUser('sasha', 'sashapopovych@gmail.com', '4769Kw&1')

    const user = await findUserByEmail('sashapopovych@gmail.com')
    expect(user.email).toBe('sashapopovych@gmail.com')
  })
  it('should return undefined because user not exist', async () => {
    const user = await findUserByEmail('sashapopovych_@gmail.com')
    expect(user).toBeFalsy()
  })
})
