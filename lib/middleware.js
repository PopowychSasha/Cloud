export const runMiddleware = (middlewares) => {
  return async (req, res, next) => {
    let counter = 0
    while (counter < middlewares.length) {
      let isNextCall = false
      await middlewares[counter](req, res, () => {
        counter++
        isNextCall = true
      })
      if (!isNextCall) {
        return
      }
    }
    next()
  }
}
