import { createSlice } from '@reduxjs/toolkit'

export const selectedFilesSlice = createSlice({
  name: 'selectedFile',
  initialState: {
    isAllFilesSelected: false,
    selectedFiles: [],
  },
  reducers: {
    selectFile: (state, action) => {
      state.selectedFiles = [...state.selectedFiles, action.payload]
    },
    selectFiles: (state, action) => {
      if (state.isAllFilesSelected) {
        state.isAllFilesSelected = false
        state.selectedFiles = []
      } else {
        state.isAllFilesSelected = true
        state.selectedFiles = action.payload
      }
    },
    deleteSelectedFile: (state, action) => {
      state.selectedFiles = state.selectedFiles.filter(
        (file) =>
          file.isFolder !== action.payload.isFolder ||
          file.id !== action.payload.id
      )
    },
    clearFilesData: () => {
      return {
        isAllFilesSelected: false,
        selectedFiles: [],
      }
    },
  },
})

export const selectedFilesActions = selectedFilesSlice.actions
