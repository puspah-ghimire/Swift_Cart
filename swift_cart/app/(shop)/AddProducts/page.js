import React from 'react'

const page = () => {
  return (
    <>
    <div>
      <h2>Add Products</h2>
      <br />
      <form action="">
        <label htmlFor="product-name">Product Name</label>
        <input type="text" required
          className=' border-2 border-blue-700' />

        <br />

        <label htmlFor="product-price">Product Price</label>
        <input type="number" required
          className=' border-2 border-blue-700' />

        <br />
        <label htmlFor="product-image">Product Image</label>
        <input type="file" />
        <br />
        <button className='border-black border-2'>ADD</button>
      </form>
    </div>
    </>
  )
}

export default page