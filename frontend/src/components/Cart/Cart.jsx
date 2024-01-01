import React from 'react';
import CartItemsCard from './CartItemsCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cart = () => {
  const selectedItems = useSelector((state) => state.products.selectedItems);
  const total = selectedItems.reduce((acc, item) => acc + item.price, 0);
  return (
    <>
      <div className=''>
        <div className='mb-4'>
          {selectedItems.map((item) => (
            <CartItemsCard key={item.id} item={item} />
          ))}
        </div>
        <div className='flex flex-col items-center'>
          <div className='h-1 rounded bg-blue-700 md:w-1/5 w-2/3 mb-4'></div>
          <div className='flex gap-4 align-center mb-4'>
            <p className='text-xl'>Total:</p>
            <p className='text-xl font-bold'>${total}</p>
          </div>
          <Link to={'/payment'} className='bg-blue-500 text-white px-8 hover:bg-blue-600 py-2 mb-4 rounded-lg'>
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cart;
