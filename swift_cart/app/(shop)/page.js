import React from 'react'
import ProductCard from '@/Components/ProductCard'
import products from '@/app/(shop)/products'

const page = () => {
  return (
    <>
    <h1 className=' text-4xl'>Home Page</h1>
    <div className='flex gap-2 p-2'>
    {products.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
    </div>
    </>
  )
}

export default page