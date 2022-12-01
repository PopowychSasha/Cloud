export const runMiddleware = (middlewares, errorHandler) => {
  return async (req, res) => {
    let counter = 0
    while (counter < middlewares.length) {
      let isNextCall = false
      await middlewares[counter](req, res, (err) => {
        if (err) {
          errorHandler(err, req, res)
          return
        }
        counter++
        isNextCall = true
      })
      if (!isNextCall) {
        return
      }
    }
  }
}
