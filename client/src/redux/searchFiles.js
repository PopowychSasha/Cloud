import { createSlice } from '@reduxjs/toolkit'

export const searchFilesSlice = createSlice({
  name: 'searchFiles',
  initialState: '',
  reducers: {
    setSearchString: (state, action) => action.payload,
  },
})

export const searchFilesActions = searchFilesSlice.actions
