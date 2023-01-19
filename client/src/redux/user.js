import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    id: undefined,
    name: undefined,
    email: undefined,
    role_id: undefined,
    accessToken: undefined,
  },
  reducers: {
    test: (state, action) => {
      state.id = Math.floor(Math.random() * 100)
    },
  },
})

export const userActions = userSlice.actions
