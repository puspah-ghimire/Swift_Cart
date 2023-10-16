import React from 'react'

const loginpage = () => {
  return (
    <>
      <body className=' bg-swiftcart-light'>   
        <div className=' bg-white border-swiftcart-dark border-2 flex flex-col p-8 my-12 mx-24 items-center rounded-3xl'>
            <div className='flex flex-col items-center'>
              <h1 className=' font-extrabold text-3xl p-4'>Login to Swift Cart</h1>
              <input type="text" 
              placeholder='email address'
              className=' mb-2 text-xl px-12 py-2 mt-4 rounded-full bg-swiftcart-lighter'/>
              <input type="text" 
              placeholder='password'
              className=' mb-2 text-xl px-12 py-2 rounded-full bg-swiftcart-lighter'/>
              <button className='bg-swiftcart-primary text-white px-10 py-2 rounded-full font-semibold m-4 mb-2 hover:bg-swiftcart-dark'>LOGIN</button>
              <h3 className=' text-xs text-gray-500'>Forgot Password?</h3>
            </div>

            <div>
              <button className='bg-swiftcart-primary text-white px-10 py-2 rounded-lg font-semibold m-4 mb-2 hover:bg-swiftcart-dark'>Sign in with Google</button>
            </div>

            <div className='flex items-center gap-4 my-4'>
              <h2 className=' font-medium'>New to Swift Cart?</h2>
              <button className='bg-swiftcart-primary text-white px-10 py-2 rounded-full font-semibold hover:bg-swiftcart-dark'>Sign Up</button>
            </div>
        </div>
        </body> 
    </>
  )
}

export default loginpage