import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
  },
  reducers: {
    getOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { getOrders } = orderSlice.actions;

export default orderSlice.reducer;
