import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: undefined,
    name: undefined,
    email: undefined,
    roleId: undefined,
    isLoggedIn: false,
  },
  reducers: {
    setUserData: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.roleId = action.payload.role_id
      state.isLoggedIn = true
    },
    clearUserData: (state) => {
      state.id = undefined
      state.name = undefined
      state.email = undefined
      state.roleId = undefined
      state.isLoggedIn = false
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.value
    },
  },
})

export const userActions = userSlice.actions
