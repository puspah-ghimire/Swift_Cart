import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/myContext'
import Hero from '../../components/hero/Hero'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Filter />
      <ProductCard />
    </Layout>
  )
}

export default Home