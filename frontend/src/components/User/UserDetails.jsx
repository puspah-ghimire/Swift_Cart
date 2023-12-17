import React from 'react'
import profile from '/profile.svg'
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Product from '../Home/Product';

const UserDetails = () => {
  return (
    <>
      <div className='flex justify-evenly md:py-8 flex-col md:flex-row h-screen'>
        <div className='flex flex-col items-center md:border-2 md:border-swiftCart md:border-solid md:w-1/4 md:rounded-3xl h-fit'
        >
          <div className='flex flex-col align-middle items-center w-1/2 md:w-1/4 mt-8 md:mt-14 mb-4'>
            <img src={profile} alt="Profile Picture" className=' rounded-full bg-swiftCartLight'/>
          </div>
          
          <div className='md:mb-12 md:mx-8 flex flex-col items-center'>
            <ul className='flex flex-col items-center'>
              <li className='mb-2'>aayush</li>
              <li className='mb-2 flex items-center gap-2'><MdOutlineEmail/>aayush@gmail.com</li>
              <li className='mb-2 flex items-center gap-2'><FaLocationDot />address</li>
              <li className='mb-2 flex items-center gap-2'><FaPhoneAlt />9812345678</li>
            </ul>
            <Link to={'/editprofile/:id'} className='flex'>
              <button className='mb-4 bg-red-500 my-4 py-2 px-4 rounded-lg text-white font-bold hover:bg-red-600 md:block'>Edit Profile</button>
            </Link>
          </div>
        </div>

        <div className=' w-fit md:w-1/2 px-4 py-2'>
          <h1 className=' font-medium text-xl'>Your Products</h1>
          <div class="h-1 w-20 bg-cyan-700 rounded"></div>
          <div className='md:grid md:grid-cols-3 flex flex-col'>
            //user ko products
          </div>
        </div>
      </div>
    </>
  )
}

export default UserDetails