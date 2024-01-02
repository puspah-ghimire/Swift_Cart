import React, { useEffect } from 'react';
import profile from '/profile.svg'
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

import { fetchUserData, logout, setError } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserDetails = () => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const logoutSubmit = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  }


  // const logoutSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:4000/api/v1/auth/login', {
  //       email: loginEmail,
  //       password: loginPassword,
  //     });
  //     if (response.data.error) {
  //       dispatch(setError(response.data.error));
  //     } else {
  //       dispatch(logout());
  //       navigate('/'); // Redirect to the home page after successful login
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     dispatch(setError('An error occurred during login. Please try again.'));
  //   }
  // };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={logoutSubmit} className='flex justify-evenly md:py-8 flex-col md:flex-row h-screen'>
        <div className='flex flex-col items-center md:border-2 md:border-swiftCart md:border-solid md:w-1/4 md:rounded-3xl h-fit'>
          <div className='flex flex-col align-middle items-center w-1/2 md:w-1/4 mt-8 md:mt-14 mb-4'>
            <img src={user.avatar} alt="Profile Picture" className=' rounded-full bg-swiftCartLight'/>
          </div>
          
          <div className='md:mb-12 md:mx-8 flex flex-col items-center'>
            <ul className='flex flex-col items-center'>
              <li className='mb-2'>{user.name}</li>
              <li className='mb-2 flex items-center gap-2'><MdOutlineEmail/>{user.email}</li>
              <li className='mb-2 flex items-center gap-2'><FaLocationDot />{user.id}</li>
              <li className='mb-2 flex items-center gap-2'><FaPhoneAlt />{user.role}</li>
            </ul>
            
            <button type='submit' className='mb-4 bg-red-500 my-4 py-2 px-4 rounded-lg text-white font-bold hover:bg-red-600 md:block'>Logout</button>
            
          </div>
        </div>
      </form>
    </>
  )
}

export default UserDetails