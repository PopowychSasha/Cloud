import Server from '../lib/server.js'
import { body } from '../lib/body-validator.js'
import UserModel from './model/user.js'
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

app.listen(5000, (port) => {
  console.log(`Server is started on port ${port}`)
})
