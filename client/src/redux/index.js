import { configureStore } from '@reduxjs/toolkit'
import { fileSlice } from './file'
import { userSlice } from './user'

const store = configureStore({
  reducer: { userReducer: userSlice.reducer, fileReducer: fileSlice.reducer },
})

export default store
