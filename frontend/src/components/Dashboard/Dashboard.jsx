import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getOrders } from '../../redux/orderSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.orders.orders);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/orders/allOrders');
        dispatch(getOrders(response.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);
  const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);
  return (
    <div className='min-h-[calc(100vh)]'>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold mb-1 mt-8'>Orders</h1>
        <div className="h-1 w-60 bg-blue-700 rounded mb-6"></div>
      </div>
      <div className="flex justify-center items-center align-middle">
        <table className='w-full border-2'>
          <thead>
            <tr className='border-b-2 border-black'>
              <th className='px-4 py-2'>UserId</th>
              <th className='px-4 py-2'>Address</th>
              <th className='px-4 py-2'>City</th>
              <th className='px-4 py-2'>State</th>
              <th className='px-4 py-2'>Country</th>
              <th className='px-4 py-2'>Pincode</th>
              <th className='px-4 py-2'>Phone</th>
              <th className='px-4 py-2'>Price</th>
              <th className='px-4 py-2'>Payment ID</th>
              <th className='px-4 py-2'>Created At</th>
              <th className='px-4 py-2'>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className='border-b-2 border-black'>
                <td className='px-4 py-2'>{order.user.userId}</td>
                <td className='px-4 py-2'>{order.shippingInfo.address}</td>
                <td className='px-4 py-2'>{order.shippingInfo.city}</td>
                <td className='px-4 py-2'>{order.shippingInfo.state}</td>
                <td className='px-4 py-2'>{order.shippingInfo.country}</td>
                <td className='px-4 py-2'>{order.shippingInfo.pincode}</td>
                <td className='px-4 py-2'>{order.shippingInfo.phoneNum}</td>
                <td className='px-4 py-2'>{order.totalPrice}</td>
                <td className='px-4 py-2'>{order.paymentInfo.id}</td>
                <td className='px-4 py-2'>{order.createdAt}</td>
                <td className='px-4 py-2'>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold mb-1 mt-8'>Total Amount: ${totalAmount}</h1>
        <div className="h-1 w-60 bg-blue-700 rounded mb-6"></div>
      </div>
    </div>
  );
};

export default Dashboard;
