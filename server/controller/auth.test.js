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

describe('auth.js/registerController', () => {
  beforeEach(async () => {
    await db('users').del()
    await db('roles').del()

    await db('roles').insert({ id: 1, role: 'user' })
  })
  it('should return 200 status and empty object because user was created', async () => {
    const { body, status } = await request
      .post('/api/register')
      .send(registerBody)

    expect(status).toBe(201)
    expect(body).toEqual({})
  })
  it('should return 400 status because body is invalid', async () => {
    const { body, status } = await request.post('/api/register').send({})

    expect(status).toBe(400)
  })
  it('should return 500 status because user is already register', async () => {
    await request.post('/api/register').send(registerBody)
    const { body, status } = await request
      .post('/api/register')
      .send(registerBody)

    expect(status).toBe(500)
    expect(body).toEqual({
      message: 'The user with this email is already registered',
    })
  })
})

describe('auth.js/registerController', () => {
  beforeEach(async () => {
    await db('users').del()
    await db('roles').del()

    await db('roles').insert({ id: 1, role: 'user' })
  })
  it('should return 200 status and user data', async () => {
    await request.post('/api/register').send(registerBody)

    const { body, status } = await request
      .post('/api/authentication')
      .send(authenticationBody)

    expect(status).toBe(200)
    expect([
      body.id,
      body.name,
      body.email,
      body.role_id,
      body.accessToken,
    ]).not.toBeUndefined()
  })
  it('should return 400 status because body is invalid', async () => {
    const { body, status } = await request.post('/api/authentication').send({})

    expect(status).toBe(400)
  })
  it('should return invalida email or password message', async () => {
    await request.post('/api/register').send(registerBody)

    const { body, status } = await request
      .post('/api/authentication')
      .send({ ...authenticationBody, password: 'gygh!8&shH' })

    expect(status).toBe(401)
    expect(body).toEqual({ message: 'email or password is incorrect' })
  })
})
