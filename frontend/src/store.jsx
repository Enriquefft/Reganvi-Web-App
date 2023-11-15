import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './reducers/userReducers'

export const store = configureStore({
      reducer: {
            userInfo: userInfoReducer,
      }
})