import Server from './lib/server.js'

const app = new Server()

app.get('/user', (req, res) => {
  res.status(200).json({ message: 'This is get:user HTTP method2' })
})
app.post('/user', (req, res) => {
  res.status(201).json({ message: 'This is post:user HTTP method' })
})
app.put('/user', (req, res) => {
  res.status(200).json({ message: 'This is put:user HTTP method' })
})
app.delete('/user', (req, res) => {
  res.status(200).json({ message: 'This is delete:user HTTP method' })
})

app.listen(5000, (port) => {
  console.log(`Server is started on port ${port}`)
})
