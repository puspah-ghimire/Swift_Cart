import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    productDetails: null,
    selectedItems: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload;
    },
    getSingleProduct: (state, action) => {
      state.productDetails = action.payload;
    },
    addSelectedItem: (state, action) => {
      state.selectedItems.push(action.payload);
    },
  },
});

export const { getProducts, getSingleProduct, addSelectedItem } = productSlice.actions;

export const fetchProductDetails = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/product/${productId}`);
    dispatch(getSingleProduct(response.data));
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};

export default productSlice.reducer;
