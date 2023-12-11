import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='flex justify-evenly bg-blue-950 text-white py-12'>
      <div className=' font-bold text-4xl'>Swift Cart</div>
      <div>Contact</div>
      <div className='flex flex-col gap-2'>
        <p>Follow Us</p>
        <div className='flex justify-evenly text-2xl'>
          <FaFacebook />
          <FaInstagram />
        </div>
      </div>
    </div>
  )
}

export default Footer