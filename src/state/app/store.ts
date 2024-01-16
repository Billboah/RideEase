import { configureStore } from '@reduxjs/toolkit'
import locationReducer from '../features/locationSlice'

export const store = configureStore({
  reducer: {
    query: locationReducer,
  },
})
