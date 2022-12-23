import { init, eventListenersModule, classModule } from 'snabbdom'
import { jsx } from 'snabbdom'

let cleaningFunctions = {}

const onRemoveComponent = {
  remove: function (vnode, removeCallback) {
    for (const key in cleaningFunctions) {
      delete hookState[key][cleaningFunctions[key].hookId]

      if (typeof cleaningFunctions[key].cleaningFunction === 'function') {
        cleaningFunctions[key].cleaningFunction()
      }
    }
    cleaningFunctions = {}
    removeCallback()
  },
}

const patch = init([eventListenersModule, onRemoveComponent, classModule])
let dom = {}

let hookId = 0
export let hookState = {
  context: {},
}

let componentFunc

export const render = (application, rootContainer) => {
  componentFunc = application
  hookId = 0
  dom = patch(rootContainer, componentFunc())
  if (Object.keys(dom).length !== 0) {
    rerender()
  }
}

const rerender = () => {
  hookId = 0
  dom = patch(dom, componentFunc())
}

let key = ''
export const component =
  (c) =>
  (...args) => {
    key = new Error().stack.split('\n')[3]
    return c(...args)
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

export function useReducer(reducerFn, initial, init) {
  const reducerKey = key

  if (!hookState.hasOwnProperty(reducerKey)) {
    hookState[reducerKey] = []
  }
  hookId++
  const stateId = hookId

  const dispatchFn = (action) => {
    const newValue = reducerFn(hookState[reducerKey][stateId].value, action)
    if (Object.is(newValue, hookState[reducerKey][stateId].value)) {
      return
    }
    hookState[reducerKey][stateId].value = newValue
    rerender()
  }

  if (!hookState[reducerKey][stateId]) {
    if (init) {
      initial = init(initial)
    }
    hookState[reducerKey][stateId] = { value: initial, dispatchFn }
  }

  return [
    hookState[reducerKey][stateId].value,
    hookState[reducerKey][stateId].dispatchFn,
  ]
}

export function useEffect(callback, dependencies) {
  if (!hookState.hasOwnProperty(key)) {
    hookState[key] = []
  }

  hookId++

  if (
    hookState[key][hookId] === undefined ||
    dependenciesChanged(hookState[key][hookId].dependencies, dependencies)
  ) {
    hookState[key][hookId] = {
      dependencies: dependencies,
    }
    cleaningFunctions[key] = { hookId, cleaningFunction: callback() }
  }
}

export const createContext = (data, children) => {
  if (Object.keys(hookState.context).length === 0) {
    hookState.context = data
  }

  return <div>{children}</div>
}
export const change = (callback) => {
  callback()
  rerender()
}
export function useContext() {
  return hookState.context
}

export { jsx }
