import { configureStore } from '@reduxjs/toolkit'
import userLoginSlice from './slices/userLoginSlice'
import { productListSlice } from './slices/productListSlice'


export default configureStore({
  reducer: {
    userLogin: userLoginSlice,
    productList: productListSlice
  }
})