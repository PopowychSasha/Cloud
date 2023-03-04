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
    renameFile: (state, action) => {
      return state.map((item) => {
        if (
          item.id === action.payload.id &&
          item.isFolder === action.payload.isFolder
        ) {
          return { ...item, name: action.payload.name }
        } else {
          return item
        }
      })
    },
    favoriteFileToggle: (state, action) =>
      state.map((file) =>
        file.isFolder === action.payload.isFolder &&
        file.id === action.payload.id
          ? { ...file, isFavorite: !file.isFavorite }
          : file
      ),
  },
})

export const fileActions = fileSlice.actions
