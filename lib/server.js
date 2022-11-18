import http, { IncomingMessage, ServerResponse } from 'http'
import { runMiddleware } from './middleware.js'
class Request extends IncomingMessage {
  toJson() {
    if (!this.headers['content-type'].startsWith('application/json')) {
      return new Promise((_, reject) => {
        reject('wrong content type')
      })
    }
    return new Promise((resolve, reject) => {
      let body = ''
      this.on('data', (chunk) => {
        body += chunk
      })
      this.on('end', () => {
        try {
          resolve(JSON.parse(body))
        } catch (err) {
          reject(err)
        }
      })
    })
  }
}

class Response extends ServerResponse {
  status(statusCode) {
    this.statusCode = statusCode
    return this
  }
  json(object) {
    this.setHeader('Content-Type', 'application/json')
    this.end(JSON.stringify(object))
  }
}
export default class Server {
  constructor() {
    this.#createServer()
  }

  #globalMiddlewares = []

  #requestHandlers = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  }

  #notFoundHandler = (req, res) => {
    return res.status(404).end(`Cannot ${req.method} ${req.url}`)
  }

  #checkIfRouteAlreadyExist(method, path) {
    if (this.#requestHandlers[method][path]) {
      throw new Error(`Method ${method} with ${path} url alredy exist`)
    }
  }

  #registerRequestHandler = (method, path, handlers) => {
    this.#checkIfRouteAlreadyExist(method, path)
    this.#requestHandlers[method][path] = handlers
  }

  setNotFoundHandler(notFoundHandler) {
    this.#notFoundHandler = notFoundHandler
  }

  setErrorHandler(errorHandler) {
    this.#errorHandler = errorHandler
  }

  #errorHandler = (err, req, res) => {
    return res.status(500).json({
      message: err.message,
    })
  }

  #createServer() {
    const requestListener = async (req, res) => {
      const { method, url } = req

      if (!this.#requestHandlers.hasOwnProperty(method)) {
        res.status(405).json()
        return
      }
      try {
        if (this.#requestHandlers[method][url]) {
          await runMiddleware([
            ...this.#globalMiddlewares,
            ...this.#requestHandlers[method][url],
          ])(req, res, () => {})
        } else {
          this.#notFoundHandler(req, res)
        }
      } catch (err) {
        console.log(err)
        this.#errorHandler(err, req, res)
      }
    }
    this.server = http.createServer(
      { IncomingMessage: Request, ServerResponse: Response },
      requestListener
    )
  }

  listen(port, runAfterStartServer) {
    this.server.listen(port, () => runAfterStartServer(port))
  }

  get(path, ...handlers) {
    this.#registerRequestHandler('GET', path, handlers)
  }

  post(path, ...handlers) {
    this.#registerRequestHandler('POST', path, handlers)
  }

  put(path, ...handlers) {
    this.#registerRequestHandler('PUT', path, handlers)
  }

  delete(path, ...handlers) {
    this.#registerRequestHandler('DELETE', path, handlers)
  }

  use(handler) {
    this.#globalMiddlewares.push(handler)
  }
}
