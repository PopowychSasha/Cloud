import { createContext, jsx } from '../lib/hooks.js'

export const Context = ({ data }, children) => createContext(data, children)
export const contextValue = {
  id: 1,
  isLoggedIn: false,
  loggedInToggle: () => {
    contextValue.isLoggedIn = !contextValue.isLoggedIn
  },
  register: () => {
    contextValue.id++
  },
}
