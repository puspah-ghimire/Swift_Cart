import React from 'react'
import CartItemsCard from './CartItemsCard'
import { Link } from 'react-router-dom'


const Cart = () => {
  const item = {
    product: "productID",
    price:200,
    name:"Product Name",
    image: "",
  }
  return (
    <>
    <div className=''>
      <div className='mb-4'>
        <CartItemsCard item={item} />
        <CartItemsCard item={item} />
        <CartItemsCard item={item} />
        <CartItemsCard item={item} />
      </div>
      <div className=' flex flex-col items-center'>
        <div className='h-1 rounded bg-blue-700 md:w-1/5 w-2/3 mb-4'></div>
        <div className='flex gap-4 align-center mb-4'>
          <p className=' text-xl'>Total:</p>
          <p className=' text-xl font-bold'>200</p>
        </div>
        <button className=' bg-blue-500 text-white px-8 hover:bg-blue-600 py-2 mb-4 rounded-lg'>Checkout</button>
      </div>
    </div>
    </>
  )
}

export default Cart