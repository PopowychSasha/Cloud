import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './user'

const store = configureStore({
  reducer: { userReducer: userSlice.reducer },
})

export default store
