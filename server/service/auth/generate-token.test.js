import { generateToken } from './generate-token.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

describe('generate-token.js', () => {
  it('should return token', () => {
    const token = generateToken({
      id: 1,
      name: 'Sasha',
      email: 'sashapopovych@gmail.com',
      role_id: 1,
    })

    const user = jwt.verify(token, process.env.TOKEN_KEY || '')

    expect(user.name).toBe('Sasha')
    expect(user.email).toBe('sashapopovych@gmail.com')
  })
})
