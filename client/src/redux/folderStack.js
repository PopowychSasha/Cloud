import { createSlice } from '@reduxjs/toolkit'

export const folderStackSlice = createSlice({
  name: 'folderStackSlice',
  initialState: [null],
  reducers: {
    goToFolder: (state, action) => {
      return [...state, action.payload]
    },
    goBack: (state) => {
      return state.slice(0, -1)
    },
  },
})

export const folderStackActions = folderStackSlice.actions
