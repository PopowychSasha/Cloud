import db from '../../db/db.js'
import { findUserByEmailAndPassword } from './find-user-by-email-and-password.js'
import { registerUser } from './register-user.js'

describe('find-user-by-email-and-password.js', () => {
  beforeEach(async () => {
    await db('users').del()
    await db('roles').del()

    await db('roles').insert([{ id: 1, role: 'user' }])
  })
  it('should return user is email and password are matched', async () => {
    await registerUser('sasha', 'sashapopovych@gmail.com', '20954JWa1&')

    const user = await findUserByEmailAndPassword(
      'sashapopovych@gmail.com',
      '20954JWa1&'
    )

    expect(user.name).toBe('sasha')
    expect(user.email).toBe('sashapopovych@gmail.com')
  })
  it('should return undefined because user email or password is incorrect', async () => {
    await registerUser('sasha', 'sashapopovych@gmail.com', '20954JWa1&')

    const user = await findUserByEmailAndPassword(
      'sashapopovych_@gmail.com',
      '20954JWa1&_'
    )

    expect(user).toBeFalsy()
  })
})
