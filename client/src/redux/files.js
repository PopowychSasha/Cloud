import { createSlice } from '@reduxjs/toolkit'

export const filesSlice = createSlice({
  name: 'files',
  initialState: { files: [], countOfFilesInFolder: 0, rowsPerPage: 5 },
  reducers: {
    setFilesData: (state, action) => {
      state.files = action.payload.files
      state.countOfFilesInFolder = action.payload.countOfFilesInFolder
    },
    addFile: (state, action) => ({
      files: [...state.files, action.payload],
      countOfFilesInFolder: state.countOfFilesInFolder + 1,
      rowsPerPage: state.rowsPerPage + 1,
    }),
    clearFilesData: () => {
      return { files: [], countOfFilesInFolder: 0, rowsPerPage: 1 }
    },
    renameFile: (state, action) => {
      state.files = state.files.map((item) => {
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
    favoriteFileToggle: (state, action) => {
      state.files = state.files.map((file) =>
        file.isFolder === action.payload.isFolder &&
        file.id === action.payload.id
          ? { ...file, isFavorite: !file.isFavorite }
          : file
      )
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload
    },
  },
})

export const filesActions = filesSlice.actions
