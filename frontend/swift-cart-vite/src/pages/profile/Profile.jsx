import React from 'react'
import Layout from '../../components/layout/Layout'
import profile from '/profile.svg'
import myContext from '../../context/data/myContext'
import { useContext } from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import ProductCard from '../../components/productCard/ProductCard'
import ProdCard from '../../components/productCard/ProdCard'
import { Link } from 'react-router-dom'


const Profile = () => {
  const context = useContext(myContext)
  const { mode } = context

  return (
    <Layout>
      <div className='flex bg-red-400 justify-evenly md:py-8 flex-col md:flex-row'>
        <div className='flex flex-col items-center md:border-2 md:border-swiftCart md:border-solid md:w-1/4 md:rounded-3xl bg-green-300 h-fit'
        style={{
          color: mode === 'dark' ? 'white' : '',
        }}>
          <div className='flex flex-col align-middle items-center w-1/2 md:w-1/4 mt-8 md:mt-14 mb-4'>
            <img src={profile} alt="Profile Picture" className=' rounded-full bg-swiftCartLight'/>
          </div>
          
          <div className='md:mb-12 md:mx-8 flex flex-col items-center'>
            <ul className='flex flex-col items-center'>
              <li className='mb-2'>Aayush Man Shakya</li>
              <li className='mb-2 flex items-center gap-2'><MdOutlineEmail/>aayushman950@gmail.com</li>
              <li className='mb-2 flex items-center gap-2'><FaLocationDot />Baneshwor, Kathmandu</li>
              <li className='mb-2 flex items-center gap-2'><FaPhoneAlt />9861666110</li>
            </ul>
            <Link to={'/editprofile/:id'} className='flex'>
              <button className='mb-4 bg-red-500 my-4 py-2 px-4 rounded-lg text-white font-bold hover:bg-red-600 md:block'>Edit Profile</button>
            </Link>
          </div>
        </div>

        <div className=' w-fit md:w-1/2 bg-blue-400 px-4 py-2'>
          <h1 className=' font-medium text-xl'>Your Products</h1>
          <div class="h-1 w-20 bg-cyan-700 rounded"></div>
          <div className='md:grid md:grid-cols-3 flex flex-col'>
            <ProdCard />
            <ProdCard />
            <ProdCard />
            <ProdCard />
            <ProdCard />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile