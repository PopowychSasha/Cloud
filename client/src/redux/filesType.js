import { createSlice } from '@reduxjs/toolkit'

export const filesTypeSlice = createSlice({
  name: 'folderStackSlice',
  initialState: {
    types: ['USER_FILES', 'SHARED_FILES'],
    active: 'USER_FILES',
  },
  reducers: {
    setUsersFile: (state) => {
      state.active = 'USER_FILES'
    },
    setSharedFile: (state) => {
      state.active = 'SHARED_FILES'
    },
  },
})

export const filesTypeActions = filesTypeSlice.actions
