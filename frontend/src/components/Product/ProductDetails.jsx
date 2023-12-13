import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/productSlice';
import ReactStars from "react-rating-stars-component"
import { options } from '../Home/Product';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/products');
        dispatch(getProducts(response.data));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching data');
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or component
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const selectedProduct = products[0]; // Display details for the first product

  return (
    <>
      <div className='flex flex-col md:flex-row md:p-12 md:py-20 p-6'>
        <div className='md:w-1/2 mb-4'>
          <Carousel className=' border-2 h-[calc(50vmin)]'>
            {selectedProduct && (
              <img src={selectedProduct.images} alt={`Slide`} key={selectedProduct.id} />
            )}
          </Carousel>
        </div>
        <div className='flex flex-col md:mx-14'>
          <div className=' mb-4 flex flex-col'>
            <p className='font-bold text-xl'>{selectedProduct.name}</p>
            <p className=' font-bold text-2xl'>${selectedProduct.price}</p>
            <p>{selectedProduct.description}</p>
            <p><ReactStars {...options} /></p>
            <p>Retailer: {selectedProduct.retailer}</p>
          </div>
          <button className=' bg-blue-800 hover:bg-blue-900 text-white w-fit px-4 font-bold py-2 rounded-lg'>Add to Cart</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
