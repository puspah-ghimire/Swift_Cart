import React from 'react'
import Header from './components/layout/Header/Header.jsx'
import Footer from './components/layout/Footer/Footer.jsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import ProductDetails from './components/Product/ProductDetails.jsx'
import { useSelector } from 'react-redux'
import Products from './components/Product/Products.jsx'
import Search from './components/Product/Search.jsx'
import UserDetails from './components/User/UserDetails.jsx'
import Signup from './components/User/Signup.jsx'
import Login from './components/User/Login.jsx'
import Cart from './components/Cart/Cart.jsx'
import EditProfile from './components/User/EditProfile.jsx'
import PaymentPage from './components/Product/PaymentPage.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Contact from './components/Contact/Contact.jsx'
import About from './components/About/About.jsx'
import Success from './components/Cart/Success.jsx'

const App = () => {
  const products = useSelector(state=>state.products.products)
  return (
    <>
    <Router>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/profile" element={<UserDetails />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
    <Footer />
    </>
  )
}

export default App