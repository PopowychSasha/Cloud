# Web framework for Node.js.

---

## <center>Framework includes</center>

- Ability to use middlewares
- Manage routes
- Build in validator and logger
- Error handler
- Ability to create models

## <center>Brief description</center>

- To start our server you shold write the following

```js
import Server from '../lib/server.js'
const app = new Server()

app.listen(5000, (port) => {
  console.log(`Server is started on port ${port}`)
})
```

- To create an endpoint (GET, POST, PUT, DELETE methods)

```js
app.get('/', (req, res) => {
  res.status(200).json({})
})
app.post('/', (req, res) => {
  res.status(200).json({})
})
app.put('/', (req, res) => {
  res.status(200).json({})
})
app.delete('/', (req, res) => {
  res.status(200).json({})
})
```

- To create global middleware

```js
app.use((req, res, next) => {
  next()
})
```

- To create nested middleware, you must write it between the path and the request handler

```js
app.get(
  '/',
  (req, res, next) => {
    next()
  },
  (req, res, next) => {
    next()
  }
)
```

- The dynamic segment in the route is indicated by a colon

```js
app.get('/user/:id', (req, res) => {
  res.status(200).json({})
})
```
