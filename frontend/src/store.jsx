import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './reducers/userReducers'
import productInfoReducer from './reducers/productReducers'

export const store = configureStore({
      reducer: {
            userInfo: userInfoReducer,
            productInfo: productInfoReducer,
      }
})