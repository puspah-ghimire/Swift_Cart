import { Link } from 'react-router-dom'
import { React, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../../backend/controllers/authController';
import axios from 'axios'


function Signup() {
  const [user, setUser] = useState({
    name:"",
    email:"",
    password:"",
  })
  const {name, email, password} = user

  const [avatar, setAvatar] = useState("/profile.svg");
  const [avatarPreview, setAvatarPreview] = useState("/profile.svg");

  const registerSubmit = (e) => {
    e.preventDefault()
    
    const myForm = new FormData
    myForm.set("name", name)
    myForm.set("email", email)
    myForm.set("password", password)
    myForm.set("avatar", avatar);
    console.log("regsubmit")
    console.log(user)

    try {
        const response = axios.post('/api/v1/auth/register', user);
    } catch(err) {
        console.log(err)
    }
  }

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      
    }
  };
  
    return (
        <div className=' flex justify-center items-center h-screen'>
          <form onSubmit={registerSubmit}>
            <div className=' border-2 border-blue-900 px-6 py-10 rounded '>
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Sign Up</h1>
                </div>
                <div>
                    <input type="name"
                        name='name'
                        className='border-2 border-blue-800 r mb-4 px-6 py-2 w-full lg:w-[20em] rounded text-black placeholder:text-gray-400 outline-none'
                        placeholder='name'
                        value={name}
                        onChange={registerDataChange}
                    />
                </div>
                <div>
                    <input type="email"
                        name='email'
                        className='border-2 border-blue-800 r mb-4 px-6 py-2 w-full lg:w-[20em] rounded text-black placeholder:text-gray-400 outline-none'
                        placeholder='e-mail'
                        value={email}
                        onChange={registerDataChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name='password'
                        className='border-2 border-blue-800 mb-4 px-6 py-2 w-full lg:w-[20em] rounded text-black placeholder:text-gray-400 outline-none'
                        placeholder='password'
                        value={password}
                        onChange={registerDataChange}
                    />
                </div>
                <div className=' mb-3'>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button type='submit'
                        className=' bg-blue-700 w-full text-white font-bold  px-2 py-2 rounded'>
                        Signup
                    </button>
                </div>
                <div className='flex justify-center'>
                    <h2 className='text-black'>Already have an account? <Link className=' text-swiftCart font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
          </form>
        </div>
    )
}

export default Signup