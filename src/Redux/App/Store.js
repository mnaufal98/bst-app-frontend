import { configureStore } from '@reduxjs/toolkit'
import userReducer from './../Features/userSlice'
import postReducer from './../Features/postSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  },
})