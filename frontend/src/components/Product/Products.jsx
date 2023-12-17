import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Product from '../Home/Product.jsx';
import { useEffect } from 'react'
import axios from 'axios'
import { getProducts } from '../../redux/productSlice.jsx';
import { useParams } from 'react-router-dom';


const Products = ({match}) => {
  const dispatch = useDispatch()
  const products = useSelector(state=>state.products.products)
  const {id} = useParams()
  
  const keyword = id

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
  }, [dispatch, keyword])

  return (
    <>
      <div className='flex flex-wrap md:w-4/5 md:gap-8 gap-4 justify-center md:mb-8 mb-4'>
        {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </>
  )
}

export default Products