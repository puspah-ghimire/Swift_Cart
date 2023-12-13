import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"

const options = {
  edit: false,
  color: "black",
  value: 4.5,
  activeColor: "orange",
  isHalf: true,
  size: window.innerWidth < 600? 20:25
}

const Product = ( {product} ) => {
  return (
    <>
    <Link to={`/product/:${product.id}`} className=' bg-gray-300 flex flex-col items-start p-2 md:w-[calc(14vmax)] border-2 hover:border-blue-500 w-[calc(40vmin)]'>
      <img src={product.images} alt={product.name} />
      <p>{product.name}</p>

      <div className='md:flex items-center w-full justify-between'>
        <ReactStars {...options}/> <span className=' font-extralight text-sm'>(256 reviews)</span>
      </div>

      <span className=' font-bold text-lg'>{product.price}</span>
    </Link>
    </>
  )
}

export default Product