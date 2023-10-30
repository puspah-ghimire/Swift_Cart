"use client"

import React from 'react'
import { useState } from 'react'
import { storage, db } from '@/app/firebase/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import { addDoc, collection } from 'firebase/firestore'

const page = () => {
  const [productName, setProductName] = useState('') 
  const [productPrice, setProductPrice] = useState(0) 
  const [productImage, setproductImage] = useState(null)

  const upload = () => {
    if (productImage == null) return
    
    const productImageRef = ref(storage, `productImages/${productImage.name + v4()}`)
    
    uploadBytes(productImageRef, productImage).then(()=> {
      alert("Image Uploaded")

      getDownloadURL(productImageRef).then(url => {
        addDoc(collection(db, "products"), {
          productName: productName,
          productPrice: productPrice,
          productImg: url
        });
    })
    })
  }

  return (
    <div>
      <input type="text" placeholder='product name' onChange={e=>setProductName(e.target.value)}/>
      <br />
      <input type="number" placeholder='price' onChange={e=>setProductPrice(e.target.value)}/>
      <br />
      <input type="file" onChange={e => setproductImage(e.target.files[0])} />
      <br />
      <button onClick={upload}>ADD</button>
    </div>
  )
}
export default page