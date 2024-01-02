import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const [order, setOrder] = useState({
    shippingInfo: {
      address: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      phoneNum: '',
    },
    orderItems: [],
    paymentInfo: {
      id: '',
    },
    shippingPrice: 10.00,
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const selectedItems = useSelector((state) => state.products.selectedItems);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    // Update orderItems whenever selectedItems changes
    const updatedOrderItems = selectedItems.map((item) => ({
      productId: item.id,
      quantity: 1,
    }));

    setOrder((prevOrder) => ({
      ...prevOrder,
      orderItems: updatedOrderItems,
    }));
  }, [selectedItems]);

  const paymentSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:4000/api/v1/orders/create', order);
    console.log('Created Order:', response.data);
    navigate('/');
    window.location.reload();
  } catch (err) {
    console.error('Error creating order:', err.message, err.response?.data);
  }
};


  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      shippingInfo: {
        ...prevOrder.shippingInfo,
        [field]: value,
      },
    }));
  };

  return (
    <>
      <div className='flex flex-col p-8 gap-4 items-center justify-center'>
        <div className='border-2 p-24 flex flex-col gap-12 border-blue-400 rounded-lg'>
          <div className='font-bold text-xl'>Payment and Shipping</div>
          <form onSubmit={paymentSubmit} className='flex flex-col gap-2'>
            <p>Name: {user.name}</p>
            <p>E-mail: {user.email}</p>
            <p>Address:</p>
            <input
              type='text'
              placeholder='Enter Address to ship to'
              required
              value={order.shippingInfo.address}
              onChange={(e) => handleInputChange(e, 'address')}
              className='border-2 px-4 py-2 border-blue-400 rounded-lg mb-4'
            />
            <p>City:</p>
            <input
              type='text'
              placeholder='Enter City'
              required
              value={order.shippingInfo.city}
              onChange={(e) => handleInputChange(e, 'city')}
              className='border-2 px-4 py-2 border-blue-400 rounded-lg mb-4'
            />
            <p>State:</p>
            <input
              type='text'
              placeholder='Enter State'
              required
              value={order.shippingInfo.state}
              onChange={(e) => handleInputChange(e, 'state')}
              className='border-2 px-4 py-2 border-blue-400 rounded-lg mb-4'
            />
            <p>Country:</p>
            <input
              type='text'
              placeholder='Enter Country'
              required
              value={order.shippingInfo.country}
              onChange={(e) => handleInputChange(e, 'country')}
              className='border-2 px-4 py-2 border-blue-400 rounded-lg mb-4'
            />
            <p>Pincode:</p>
            <input
              type='text'
              placeholder='Enter Pincode'
              required
              value={order.shippingInfo.pincode}
              onChange={(e) => handleInputChange(e, 'pincode')}
              className='border-2 px-4 py-2 border-blue-400 rounded-lg mb-4'
            />
            <p>Phone Number:</p>
            <input
              type='number'
              placeholder='Enter Phone Number'
              required
              value={order.shippingInfo.phoneNum}
              onChange={(e) => handleInputChange(e, 'phoneNum')}
              className='border-2 px-4 py-2 border-blue-400 rounded-lg mb-4'
            />
            <p>Payment Id:</p>
            <input
              type='text'
              placeholder='Enter Payment id'
              required
              value={order.paymentInfo.id}
              onChange={(e) => setOrder({ ...order, paymentInfo: { id: e.target.value } })}
              className='border-2 px-4 py-2 border-blue-400 rounded-lg mb-4'
            />
            <button
              type='submit'
              className='hover:bg-blue-600 bg-blue-500 px-4 py-2 w-1/2 text-white rounded-lg'
            >
              Buy Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
