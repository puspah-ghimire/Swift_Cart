import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/');
    window.location.reload();
  }  
  return (
    <>
      <div className='flex flex-col items-center h-[calc(70vmax)]'>
        <h1 className='text-2xl font-bold mb-1 mt-8'>Your Order was placed successfully!</h1>
        <button onClick={goHome} className=' bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg m-12 text-xl'>Go to Home Page</button>
      </div>
    </>
  )
}

export default Success