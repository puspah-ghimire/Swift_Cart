import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productDetails: null,
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getSingleProduct: (state, action) => {
      state.productDetails = action.payload;
    },
  },
});

export const { getProducts, getSingleProduct } = productSlice.actions;

export const fetchProductDetails = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/product/${productId}`);
    dispatch(getSingleProduct(response.data));
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};

export default productSlice.reducer;
