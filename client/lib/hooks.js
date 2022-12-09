import { init, eventListenersModule } from 'snabbdom'
import { jsx } from 'snabbdom'
import { App } from '../src/index.js'

const patch = init([eventListenersModule])
let dom = {}

let hookId = 0
export let hookState = {}

export const render = (application, rootContainer) => {
  hookId = 0
  dom = patch(rootContainer, application)
}

const rerender = () => {
  hookId = 0
  dom = patch(dom, <App></App>)
}

let key = ''
export const component = (c) => (props) => {
  key = new Error().stack.split('\n')[3]
  return c(props)
}

export function useState(initial) {
  if (!hookState.hasOwnProperty(key)) {
    hookState[key] = []
  }
  hookId++

  const stateId = hookId
  const setValueKey = key

  if (!hookState[key][stateId]) {
    if (typeof initial === 'function') {
      initial = initial()
    }
    hookState[key][stateId] = {
      value: initial,
      setValue: (newValue) => {
        if (typeof newValue === 'function') {
          newValue = newValue(hookState[setValueKey][stateId].value)
          if (Object.is(newValue, hookState[setValueKey][stateId].value)) {
            return
          }
        }
        hookState[setValueKey][stateId].value = newValue
        rerender()
      },
    }
  }

  return [hookState[key][stateId].value, hookState[key][stateId].setValue]
}

const dependenciesChanged = (savedDeps, deps) => {
  if (deps === undefined) {
    return true
  }

  for (const item in deps) {
    if (!Object.is(savedDeps[item], deps[item])) {
      return true
    }
  }
  return false
}

export const useMemo = (func, dependencies) => {
  if (!hookState.hasOwnProperty(key)) {
    hookState[key] = []
  }
  hookId++

  if (
    hookState[key][hookId] === undefined ||
    dependenciesChanged(hookState[key][hookId].dependencies, dependencies)
  ) {
    hookState[key][hookId] = { value: func(), dependencies: dependencies }
  }

  return hookState[key][hookId].value
}

export const useCallback = (func, dependencies) =>
  useMemo(() => func, dependencies)

export { jsx }
