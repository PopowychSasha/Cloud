import { configureStore } from '@reduxjs/toolkit'
import { filesSlice } from './files'
import { filesTypeSlice } from './filesType'
import { folderStackSlice } from './folderStack'
import { selectedFilesSlice } from './selectedFiles'
import { sortingSlice } from './sorting'
import { userSlice } from './user'

const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    filesReducer: filesSlice.reducer,
    selectedFilesReducer: selectedFilesSlice.reducer,
    folderStackReducer: folderStackSlice.reducer,
    filesType: filesTypeSlice.reducer,
    sortingReducer: sortingSlice.reducer,
  },
})

export default store
