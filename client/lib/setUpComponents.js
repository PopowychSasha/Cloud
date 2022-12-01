import { init } from 'snabbdom'
import { jsx } from 'snabbdom'
const patch = init([])

export const render = (application, rootContainer) => {
  patch(rootContainer, application)
}

export { jsx }
