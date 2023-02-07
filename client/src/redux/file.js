import { createSlice } from '@reduxjs/toolkit'

export const fileSlice = createSlice({
  name: 'file',
  initialState: [],
  reducers: {
    setFilesData: (state, action) => {
      return action.payload
    },
    addFile: (state, action) => {
      return [...state, action.payload]
    },
    clearFilesData: () => {
      return []
    },
  },
})

export const fileActions = fileSlice.actions
