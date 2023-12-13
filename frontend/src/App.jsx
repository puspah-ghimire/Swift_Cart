import React from 'react'
import Header from './components/layout/Header/Header.jsx'
import Footer from './components/layout/Footer/Footer.jsx'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import ProductDetails from './components/Product/ProductDetails.jsx'
import { useSelector } from 'react-redux'

const App = () => {
  const products = useSelector(state=>state.products.products)
  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
    <Footer />
    </>
  )
}

export default App