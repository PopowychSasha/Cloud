import { createSlice } from '@reduxjs/toolkit'

export const sortingSlice = createSlice({
  name: 'sorting',
  initialState: { element: 'id', order: 'asc' },
  reducers: {
    setSortType: (state, action) => {
      if (state.element === action.payload.element) {
        return { ...state, order: state.order === 'asc' ? 'desc' : 'asc' }
      } else if (state.element !== action.payload.element) {
        return {
          element: action.payload.element,
          order: 'asc',
        }
      }
    },
  },
})

export const sortingActions = sortingSlice.actions
