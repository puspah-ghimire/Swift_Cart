import React, { useState } from 'react'
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
      <div className=' bg-gray-300 flex flex-col items-center justify-between p-2 md:w-[calc(15vmax)] border-2 hover:border-blue-500 w-[calc(40vmin)] min-h-[calc(25vmax)]'>
        <Link to={`/product/:${product.id}`} className='flex flex-col'>
          <img src={product.images} alt={product.name} className=' h-40 self-center w-full'/>
          <div className=''>
            <p><span className=' font-bold text-lg'>{product.name}</span></p>
      
            <div className='md:flex items-center w-full justify-between'>
              <ReactStars {...options}/> <span className=' font-extralight text-sm'>(256 reviews)</span>
            </div>
      
            <p className=' font-bold text-lg'>${product.price}</p>
          </div>
        </Link>
        
      </div>
      </>
    )
  } else {
    return (
      <>
      <div className=' bg-gray-200 flex flex-col justify-between items-center p-2 md:w-[calc(14vmax)] border-2 hover:border-blue-500'>
        <Link to={`/product/:${product.id}`} className='flex flex-col'>
          <img src={product.images} alt={product.name} className=' h-1/2 self-center'/>
          <div className=' h-1/4'>
            <p><span className=' font-bold text-lg'>{product.name}</span></p>
      
            <div className='md:flex flex-wrap items-center w-full justify-between'>
              <ReactStars {...options}/> <span className=' font-extralight text-sm'>(256 reviews)</span>
            </div>
      
            <span className=' font-bold text-lg'>${product.price}</span>
          </div>
        </Link>
        
      </div>
      </>
    )
  }
}

export default Product