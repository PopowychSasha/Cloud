import supertest from 'supertest'
import db from '../db/db.js'
import { app } from '../src/app.js'

const request = supertest(app)

const registerBody = {
  name: 'Sasha',
  email: 'sashapopovych2003@gmail.com',
  password: '11111qQ!',
}
const authenticationBody = {
  email: 'sashapopovych2003@gmail.com',
  password: '11111qQ!',
}

describe('reset-password.js/resetPasswordController', () => {
  beforeEach(async () => {
    await db('users').del()
    await db('roles').del()

    await db('roles').insert({ id: 1, role: 'user' })
  })
  it('should return 200 status and empty object because email was sent', async () => {
    await request.post('/api/register').send(registerBody)
    await request.post('/api/authenticate').send(authenticationBody)

    const { body, status } = await request
      .post('/api/reset/password')
      .send({ email: 'sashapopovych2003@gmail.com' })

    expect(body).toEqual({})
    expect(status).toBe(200)
  })
  it('should return 404 status because user with this email to reset password not found', async () => {
    const { body, status } = await request
      .post('/api/reset/password')
      .send({ email: 'sashapopovych2003@gmail.com' })

    expect(body).toEqual({
      message: 'User with email sashapopovych2003@gmail.com not found',
    })
    expect(status).toBe(404)
  })
})
