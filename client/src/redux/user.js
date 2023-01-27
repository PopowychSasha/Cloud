import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    id: undefined,
    name: undefined,
    email: undefined,
    role_id: undefined,
    isLoggedIn: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.role_id = action.payload.role_id
      state.isLoggedIn = true
    },
    clearUserData: (state) => {
      state.id = undefined
      state.name = undefined
      state.email = undefined
      state.role_id = undefined
      state.isLoggedIn = false
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.value
    },
  },
})

export const userActions = userSlice.actions
