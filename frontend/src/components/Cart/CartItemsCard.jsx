import React from 'react';
import { useDispatch } from 'react-redux';
import { removeSelectedItem } from '../../redux/productSlice';
import { Link } from 'react-router-dom';

const CartItemsCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeSelectedItem(item.id));
  };

  return (
    <>
      <div className=' px-6 py-8 flex gap-2 justify-between border-b-2 border-blue-500 items-center'>
        <img src={item.images} alt='product image' className='md:max-h-[calc(5vmax)] md:max-w-[calc(10vmax)] max-w-[calc(20vmin)] border-2' />
        <Link className=' text-xl font-bold'>{item.name}</Link>
        <p>${item.price}</p>
        <button onClick={handleRemoveItem} className=' bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg h-1/2'>
          Remove
        </button>
      </div>
    </>
  );
};

export default CartItemsCard;
