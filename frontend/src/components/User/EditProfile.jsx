import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';


const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userDetails);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  console.log(user)

  return (
    <>
    <div className=' h-[calc(80vh)] flex items-center justify-center'>
      <form action='/' className='flex flex-col items-center gap-4 my-8 border-2 p-12 rounded-lg border-blue-600'>
        <p className=' font-bold text-2xl'>Edit Profile</p>
        <div className='flex align-middle items-center gap-2'>
          <p>Name:</p>
          <input type="text" placeholder={user.name}  className=' border-2 border-blue-500 rounded-lg px-4 py-2' onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className='flex align-middle items-center gap-2'>
          <p>E-mail:</p>
          <input type="email" placeholder={user.email} className=' border-2 border-blue-500 rounded-lg px-4 py-2' onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className='flex align-middle items-center gap-2'>
          <p>Avatar:</p>
          <input type="text" placeholder={user.avatar} className=' border-2 border-blue-500 rounded-lg px-4 py-2' onChange={(e) => setAvatar(e.target.value)}/>
        </div>
        <button type='submit' className='bg-blue-600 text-white font-bold px-6 py-2 rounded-lg'>
          Save
        </button>
      </form>
    </div>
    </>
  )
}

export default EditProfile