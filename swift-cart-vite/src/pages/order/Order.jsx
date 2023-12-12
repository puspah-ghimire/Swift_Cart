import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/myContext'

const Order = () => {
  const context = useContext(MyContext)
  console.log(context)  
  return (
    <Layout>
      Order
    </Layout>
  )
}

export default Order