import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';


const PaymentPage = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const paymentSubmit = (e) => {
    e.preventDefault()
    navigate('/cart')
  }

  return (
    <>
      <div className='h-[calc(80vh)] flex flex-col p-8 gap-4 items-center justify-center'>
        <div className='border-2 p-24 flex flex-col gap-12 border-blue-400 rounded-lg'>

        <div className=' font-bold text-xl'>Payment and Shipping</div>
        <form onSubmit={paymentSubmit} className='flex flex-col gap-2'>
          <p>Name: {user.name}</p>
          <p>E-mail: {user.email}</p>
          <p>Shipping Information:</p>
          <input type="text" placeholder='Enter Address to ship to' required 
          className='border-2 px-4 py-2 border-blue-400 rounded-lg mb-4'/>
          <button type='submit' className='hover:bg-blue-600 bg-blue-500 px-4 py-2 w-1/2 text-white rounded-lg'>Buy Now</button>
        </form>
        </div>
      </div>
    </>
  )
}

export default PaymentPage