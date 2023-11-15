import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import Hero from '../../components/hero/Hero'
import Filter from '../../components/filter/Filter'
import ProdCard from '../../components/productCard/ProdCard'
import myContext from '../../context/data/myContext'

const Home = () => {
  const context = useContext(myContext)
  const {mode} = context
  return (
    <Layout>
      <Hero />
      <Filter />
      <div class="lg:w-1/2 w-fit mb-2 ml-4 mt-4 md:mt-8">
        <h1 class="sm:text-3xl text-2xl font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Browse Products</h1>
        <div class="h-1 w-20 bg-cyan-700 rounded"></div>
      </div>
      <div className='grid md:grid-cols-4 grid-cols-2'>
        <ProdCard />
        <ProdCard />
        <ProdCard />
        <ProdCard />
        <ProdCard />
        <ProdCard />
        <ProdCard />
        <ProdCard />
      </div>
    </Layout>
  )
}

export default Home