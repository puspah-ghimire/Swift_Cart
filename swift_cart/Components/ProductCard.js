"use client"

import React from 'react'
import Image from 'next/image';
import products from '@/app/(shop)/products'

const ProductCard = ({ image, name, price }) => {
  return (
    <div className=" border-black border-2 flex flex-col w-max p-2">
      <Image src={image} alt={name} width="128" height="128" />
      <h3 className="product-name font-medium">{name}</h3>
      <p className="product-price font-bold">${price}</p>
    </div>
  );
};

export default ProductCard