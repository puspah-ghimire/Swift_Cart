import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null, // This will store the authenticated user details
  error: null, // This will store any error messages related to authentication
  userDetails: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.error = null; // Clear any previous errors
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    getUser: (state, action)=>{
      state.userDetails = action.payload;
    }
  },
});

export const { login, logout, setError, getUser, } = userSlice.actions;
export const fetchUserData =()=> async(dispatch)=>{
  try{
    const response = await axios.get('http://localhost:4000/api/v1/auth/user');
    dispatch(getUser(response.data));
  }catch(err){
    console.log(err)
  }
}

export default userSlice.reducer;
