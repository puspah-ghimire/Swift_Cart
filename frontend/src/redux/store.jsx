import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import userReducer from './userSlice';
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    orders: orderReducer,
  },
});
