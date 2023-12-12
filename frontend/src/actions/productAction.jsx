import axios from 'axios'
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS } from "../constants/productConstants"

export const getProduct = () => async(dispatch)=>{
  try {
    dispatch({type: ALL_PRODUCT_REQUEST})
    const {data} = await axios.get("/api/v1/products")
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error.response.data.message,
    })
  }
}