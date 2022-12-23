import Server from '../lib/server.js'
import { body } from '../lib/body-validator.js'
import UserModel from './model/user.js'
import { compare, hash } from '../lib/hash.js'

const user = new UserModel()
const app = new Server()

const userValidationSchema = [
  body('name', (vl) => {
    vl.type('string').match(/.../).trim().require()
  }),
  body('age', (vl) => {
    vl.type('number').isLength({ min: 1, max: 100 })
  }),
]

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', '*')
  next()
})

app.get('/user/:id', (req, res) => {
  const { id } = req.params
  const entity = user.selectById(+id)

  if (!entity) {
    return res.status(404).json({ message: `User with id ${id} not found` })
  }
  res.status(200).json(entity)
})

app.get('/users', (req, res) => {
  const users = user.select()

  res.status(200).json(users)
})

app.post(
  '/user',
  async (req, res, next) => {
    req.body = await req.toJson()
    next()
  },
  ...userValidationSchema,
  async (req, res) => {
    const { name, age } = req.body
    const newUser = user.insert({ name, age })

    res.status(201).json(newUser)
  }
)

app.put(
  '/user/:id',
  async (req, res, next) => {
    req.body = await req.toJson()
    next()
  },
  ...userValidationSchema,
  async (req, res) => {
    const { name, age } = req.body
    const { id } = req.params
    const updatedUser = user.updateById(+id, { name, age })

    if (!updatedUser) {
      return res.status(404).json({ message: `User with id ${id} not found` })
    }
    res.status(200).json(updatedUser)
  }
)

app.delete('/user/:id', (req, res) => {
  const { id } = req.params
  const deletedUser = user.deleteById(+id)

  if (!deletedUser) {
    return res.status(404).json({ message: `User with id ${id} not found` })
  }
  res.status(200).json(deletedUser)
})

app.post('/api/registration', async (req, res, next) => {
  const body = await req.toJson()
  const hashPassword = hash(body.password)
  const newUser = user.insert({ ...body, password: hashPassword })
  keys[newUser.id] = hash(newUser + Math.floor(Math.random() * 100000))

  res.status(201).json({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    key: keys[newUser.id],
  })
})
app.post('/api/login', async (req, res, next) => {
  const body = await req.toJson()
  const { email, password } = body

  const userData = user.selectByParameter({ email })

  let isPasswordCorrect = false
  if (userData) {
    isPasswordCorrect = compare(userData.password, password)
  }

  if (!userData || userData.email !== email || !isPasswordCorrect) {
    return res
      .status(404)
      .json({ message: 'email/password combination is incorrect' })
  }
  res.status(200).json({
    id: userData.id,
    name: userData.name,
    email: userData.email,
    key: keys[userData.id],
  })
})
app.get(
  '/api/user/:id/:secret',
  async (req, res, next) => {
    const { id, secret } = req.params

    if (keys[id] === secret) {
      return next()
    } else {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  },
  (req, res, next) => {
    const { id } = req.params
    const userData = user.selectById(+id)

    res.status(200).json({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      key: keys[userData.id],
    })
  }
)

const keys = []

app.listen(5000, (port) => {
  console.log(`Server is started on port ${port}`)
})
