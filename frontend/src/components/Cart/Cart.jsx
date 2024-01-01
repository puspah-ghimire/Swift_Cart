import React from 'react'
import CartItemsCard from './CartItemsCard'
import { Link } from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { getProducts } from '../../redux/productSlice'


const Cart = () => {
  const item = {
    product: "productID",
    price:200,
    name:"Product Name",
    image: "",
  }

  const dispatch = useDispatch()
  const products = useSelector(state=>state.products.products)
  
  useEffect(() => {
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://localhost:4000/api/v1/products');
        dispatch(getProducts(response.data));
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  }, [])

  return (
    <>
    <div className=''>
      <div className='mb-4'>
        <CartItemsCard item={item} />
        <CartItemsCard item={item} />
        <CartItemsCard item={item} />
        <CartItemsCard item={item} />

        {products.map(product => (
            <CartItemsCard key={product.id} item={product} />
          ))}
      </div>
      <div className=' flex flex-col items-center'>
        <div className='h-1 rounded bg-blue-700 md:w-1/5 w-2/3 mb-4'></div>
        <div className='flex gap-4 align-center mb-4'>
          <p className=' text-xl'>Total:</p>
          <p className=' text-xl font-bold'>200</p>
        </div>
        <Link to={'/payment'} className=' bg-blue-500 text-white px-8 hover:bg-blue-600 py-2 mb-4 rounded-lg'>Checkout</Link>
      </div>
    </div>
    </>
  )
}

export default Cart