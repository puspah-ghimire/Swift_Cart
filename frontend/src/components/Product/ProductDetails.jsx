import axios from 'axios'
import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../redux/productSlice'


const ProductDetails = () => {

  const dispatch = useDispatch()
  const products = useSelector(state=>state.products.products)

  useEffect(() => {
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://localhost:4000/api/v1/products');
        dispatch(getProducts(response.data));
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  }, [])
  

  return (
    <>
    <div className='flex flex-col md:flex-row bg-slate-400 p-4'>
      <div className=' md:w-1/2'>
        <Carousel>
          {products && products.map((item, i) => (
            <img src={item.images} alt={`${i} Slide`} key={item.images}/>
          ))}
        </Carousel>
      </div>
      <div>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetails