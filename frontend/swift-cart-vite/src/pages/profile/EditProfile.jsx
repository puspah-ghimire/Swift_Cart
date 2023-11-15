import React, {useContext} from 'react'
import Layout from '../../components/layout/Layout'
import profile from '/profile.svg'
import myContext from '../../context/data/myContext'

const EditProfile = () => {
  const context = useContext(myContext)
  const { mode } = context

  return (
    <Layout>
      <div className='flex justify-center md:py-8'>
        <div className='flex flex-col items-center md:flex-row md:justify-evenly md:border-2 md:border-swiftCart md:border-solid md:w-1/2 md:rounded-3xl'
        style={{
          color: mode === 'dark' ? 'white' : '',
        }}>
          <div className='flex flex-col align-middle items-center w-1/2 md:w-1/4 mt-8 md:my-14'>
            <img src={profile} alt="Profile Picture" className=' rounded-full bg-swiftCartLight mb-2'/>
            <button className='text-sm mb-4'>Change Profile Picture</button>
            <input type="submit" className='mb-4 bg-red-500 my-4 py-2 px-4 rounded-lg text-white font-bold hover:bg-red-600 hidden md:block'  value='Save Changes' />
          </div>
          <div className='md:my-12 md:mx-8 flex justify-center'>
            <form className='flex flex-col items-center'>
              <label className='mb-2 w-full'>
                <p className='text-sm ml-2'>First Name</p>
                <input type="text" className='border-swiftCart w-72 border-solid border-2 rounded-md p-2 focus:border-swiftCartDark   focus:outline-none' required />
              </label>
              <label className='mb-2 w-full'>
                <p className='text-sm ml-2'>Middle Name</p>
                <input type="text" className='border-swiftCart w-72 border-solid border-2 rounded-md p-2 focus:border-swiftCartDark   focus:outline-none' />
              </label>
              <label className='mb-2 w-full'>
                <p className='text-sm ml-2'>Last Name</p>
                <input type="text" className='border-swiftCart w-72 border-solid border-2 rounded-md p-2 focus:border-swiftCartDark   focus:outline-none' required/>
              </label>
              <label className='mb-2 w-full'>
                <p className='text-sm ml-2'>Date of Birth</p>
                <input type="date" className='border-swiftCart w-72 border-solid border-2 rounded-md p-2 focus:border-swiftCartDark   focus:outline-none'/>
              </label>
              <label className='mb-2 w-full'>
                <p className='text-sm ml-2'>Phone Number</p>
                <input type="number" className='border-swiftCart w-72 border-solid border-2 rounded-md p-2 focus:border-swiftCartDark   focus:outline-none'/>
              </label>
              <label className='mb-2 w-full'>
                <p className='text-sm ml-2'>Province</p>
                <select 
                  className='border-swiftCart w-72 border-solid border-2 rounded-md p-2 focus:border-swiftCartDark focus:outline-none text-black'>
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                  <option value="province3">Bagmati</option>
                  <option value="province4">Gandaki</option>
                  <option value="province5">Lumbini</option>
                  <option value="province6">Karnali</option>
                  <option value="province7">Sudurpaschim</option>
                </select>
              </label>
              <label className='mb-2 w-full'>
                <p className='text-sm ml-2'>Address</p>
                <input type="text" className='border-swiftCart w-72 border-solid border-2 rounded-md p-2 focus:border-swiftCartDark   focus:outline-none'/>
              </label>
              <label className=' w-full'>
                <p className='text-sm ml-2'>e-mail</p>
                <input type="email" className='border-swiftCart w-72 border-solid border-2 rounded-md p-2 focus:border-swiftCartDark  focus:outline-none'/>
              </label>
              <label>
                <input type="submit" className='mb-4 bg-red-500 my-4 py-2 px-4 rounded-lg text-white font-bold hover:bg-red-600 md:hidden'  value='Save Changes' />
              </label>
            </form>
          </div>
        </div>
      </div>
      
    </Layout>
  )
}

export default EditProfile