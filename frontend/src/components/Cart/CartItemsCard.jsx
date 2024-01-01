import React from 'react'
import { Link } from 'react-router-dom'

const CartItemsCard = ({item}) => {
  return (
    <>
      <div className=' px-6 py-8 flex gap-4 justify-between'>
        <img src={item.image} alt="product image" className='w-[calc(15vmax)] border-2' />
        <Link>{item.name}</Link>
        <p>{item.price}</p>
        <button className=' bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'>Remove</button>
      </div>
    </>
  )
}

export default CartItemsCard