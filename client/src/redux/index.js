import { configureStore } from '@reduxjs/toolkit'
import { fileSlice } from './file'
import { folderStackSlice } from './folderStack'
import { selectedFilesSlice } from './selectedFiles'
import { userSlice } from './user'

const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    fileReducer: fileSlice.reducer,
    selectedFilesReducer: selectedFilesSlice.reducer,
    folderStackReducer: folderStackSlice.reducer,
  },
})

export default store
