import http, { ServerResponse } from 'http'

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

  #registerRequestHandler = (method, path, handler) => {
    this.#checkIfRouteAlreadyExist(method, path)
    this.#requestHandlers[method][path] = handler
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
    const requestListener = (req, res) => {
      const { method, url } = req

      if (!this.#requestHandlers.hasOwnProperty(method)) {
        res.status(405).json()
        return
      }

      try {
        if (this.#requestHandlers[method][url]) {
          this.#requestHandlers[method][url](req, res)
        } else {
          this.#notFoundHandler(req, res)
        }
      } catch (err) {
        this.#errorHandler(err, req, res)
      }
    }
    this.server = http.createServer(
      { ServerResponse: Response },
      requestListener
    )
  }

  listen(port, runAfterStartServer) {
    this.server.listen(port, () => runAfterStartServer(port))
  }

  get(path, handler) {
    this.#registerRequestHandler('GET', path, handler)
  }

  post(path, handler) {
    this.#registerRequestHandler('POST', path, handler)
  }

  put(path, handler) {
    this.#registerRequestHandler('PUT', path, handler)
  }

  delete(path, handler) {
    this.#registerRequestHandler('DELETE', path, handler)
  }
}
