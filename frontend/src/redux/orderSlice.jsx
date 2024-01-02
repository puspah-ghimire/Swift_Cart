import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
  },
  reducers: {
    getorders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { getorders} = orderSlice.actions;

export default orderSlice.reducer;
