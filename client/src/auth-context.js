import { createContext, jsx } from '../lib/hooks.js'

export const Context = ({ data }, children) => createContext(data, children)

export const contextValue = {
  id: undefined,
  name: undefined,
  email: undefined,
  key: undefined,
  logout: () => {
    contextValue.id = undefined
    contextValue.key = undefined
  },
  login: (id, name, email, key) => {
    contextValue.id = id
    contextValue.name = name
    contextValue.email = email
    contextValue.key = key
  },
}
