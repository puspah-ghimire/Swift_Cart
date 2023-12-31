import React, { useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '../../redux/productSlice';
import ReactStars from 'react-rating-stars-component';
import { options } from '../Home/Product';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const cleanedId = id.replace(':', '');
  const productDetails = useSelector((state) => state.products.productDetails);

  useEffect(() => {
    dispatch(fetchProductDetails(cleanedId));
  }, [dispatch, cleanedId]);

  if (!productDetails) {
    return <p>Loading...</p>; // You can replace this with a loading spinner or component
  }

  return (
    <>
      <div className='flex flex-col md:flex-row md:p-12 md:py-20 p-6'>
        <div className='md:w-1/2 mb-4'>
          <Carousel className='border-2 h-[calc(50vmin)]'>
            {productDetails && (
              <img src={productDetails.images} alt={`Slide`} key={productDetails.id} />
            )}
          </Carousel>
        </div>
        <div className='flex flex-col md:mx-14'>
          <div className='mb-4 flex flex-col'>
            <p className='font-bold text-xl'>{productDetails.name}</p>
            <p className='font-bold text-2xl'>${productDetails.price}</p>
            <p>{productDetails.description}</p>
            <div>
              <ReactStars {...options} />
            </div>
            <p>Category: {productDetails.category}</p>
            <p>Brand: {productDetails.brand}</p>
            <p>Stock: {productDetails.amountInStock}</p>
          </div>
          <button className='bg-blue-800 hover:bg-blue-900 text-white w-fit px-4 font-bold py-2 rounded-lg'>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
