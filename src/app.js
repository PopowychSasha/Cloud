import Server from '../lib/server.js'
import UserModel from './model/user.js'
const app = new Server()

const user = new UserModel()

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
app.post('/user', async (req, res) => {
  const body = await req.toJson()

  const { name, age } = body
  const newUser = user.insert({ name, age })

  res.status(201).json(newUser)
})
app.put('/user/:id', async (req, res) => {
  const body = await req.toJson()

  const { name, age } = body
  const { id } = req.params
  const updatedUser = user.updateById(+id, { name, age })

  if (!updatedUser) {
    return res.status(404).json({ message: `User with id ${id} not found` })
  }
  res.status(200).json(updatedUser)
})
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
