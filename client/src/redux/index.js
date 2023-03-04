import { configureStore } from '@reduxjs/toolkit'
import { fileSlice } from './file'
import { filesTypeSlice } from './filesType'
import { folderStackSlice } from './folderStack'
import { selectedFilesSlice } from './selectedFiles'
import { userSlice } from './user'

const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    fileReducer: fileSlice.reducer,
    selectedFilesReducer: selectedFilesSlice.reducer,
    folderStackReducer: folderStackSlice.reducer,
    filesType: filesTypeSlice.reducer,
  },
})

export default store
