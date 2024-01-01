import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUserData } from '../../redux/userSlice';

export const options = {
  edit: false,
  color: "black",
  value: 4.5,
  activeColor: "orange",
  isHalf: true,
  size: window.innerWidth < 600? 20:25
}

const Product = ( {product} ) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  if (!user){
    return (
      <>
      <Link to={`/product/:${product.id}`} className=' bg-gray-300 flex flex-col items-start justify-center p-2 md:w-[calc(14vmax)] border-2 hover:border-blue-500 w-[calc(40vmin)] min-h-[calc(20vmin)]'>
        <img src={product.images} alt={product.name} className=' h-1/2 self-center'/>
        <p><span className=' font-bold text-lg'>{product.name}</span></p>
  
        <div className='md:flex items-center w-full justify-between'>
          <ReactStars {...options}/> <span className=' font-extralight text-sm'>(256 reviews)</span>
        </div>
  
        <span className=' font-bold text-lg mb-2'>${product.price}</span>
      </Link>
      </>
    )
  } else {
    return (
      <>
      <Link to={`/product/:${product.id}`} className=' bg-gray-300 flex flex-col items-start justify-center p-2 md:w-[calc(14vmax)] border-2 hover:border-blue-500 w-[calc(40vmin)] min-h-[calc(20vmin)]'>
        <img src={product.images} alt={product.name} className=' h-1/2 self-center'/>
        <p><span className=' font-bold text-lg'>{product.name}</span></p>
  
        <div className='md:flex items-center w-full justify-between'>
          <ReactStars {...options}/> <span className=' font-extralight text-sm'>(256 reviews)</span>
        </div>
  
        <span className=' font-bold text-lg mb-2'>${product.price}</span>
  
        <Link to={'/cart'} className=' bg-blue-500 text-white hover:bg-blue-600 py-4 w-full rounded-lg text-center font-bold'>Add To Cart</Link>
      </Link>
      </>
    )
  }
}

export default Product