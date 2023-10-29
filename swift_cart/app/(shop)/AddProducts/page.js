"use client"

import React from 'react'
import { useState } from 'react'

const page = () => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productImg, setProductImg] = useState(null)
  const [error, setError] = useState('')

  const types = ['image/png', 'image/jpeg']

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0]
    if (selectedFile && types.includes(selectedFile.type)){
      setProductImg(selectedFile)
      setError('')
    } else {
      setProductImg(null)
      setError("Pls select png or jpeg image")
    }
  }

  const addProduct =(e)=> {
    e.preventDefault()
    console.log(productName, productPrice, productImg)
  }

  return (
    <>
    <div>
      <h2>Add Products</h2>
      <br />
      <form action="" onSubmit={addProduct}>
        <label htmlFor="product-name">Product Name</label>
        <input type="text" required
          onChange={e => setProductName(e.target.value)} value={productName}
          className=' border-2 border-blue-700' />

        <br />

        <label htmlFor="product-price">Product Price</label>
        <input type="number" required
          onChange={e => setProductPrice(e.target.value)} value={productPrice}
          className=' border-2 border-blue-700' />

        <br />
        <label htmlFor="product-image">Product Image</label>
        <input type="file" 
          onChange={productImgHandler}/>
        <br />
        <button className='border-black border-2'>ADD</button>
      </form>

      {error&&<span>{error}</span>}
    </div>
    </>
  )
}

export default page