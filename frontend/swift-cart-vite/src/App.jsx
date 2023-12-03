import React from 'react'
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Home from './pages/home/Home';
import Cart from './pages/cart/Cart'
import NoPage from './pages/nopage/NoPage'
import Order from './pages/order/Order'
import Dashboard from './pages/admin/dashboard/Dashboard'
import MyState from './context/data/myState';
import SignUp from './pages/registration/SignUp';
import Login from './pages/registration/Login';
import ProductInfo from './pages/productInfo/ProductInfo';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import AddProduct from './pages/admin/page/AddProduct';
import EditProfile from './pages/profile/EditProfile';
import Profile from './pages/profile/Profile';

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/*' element={<NoPage />} />
          <Route path='/order' element={<Order />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/productinfo/:id' element={<ProductInfo/>} />
          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path='/updateproduct' element={<UpdateProduct/>} />
          <Route path='/editprofile/:id' element={<EditProfile/>} />
          <Route path='/profile/:id' element={<Profile/>} />
        </Routes>
    </Router>
    </MyState>
  )
}

export default App