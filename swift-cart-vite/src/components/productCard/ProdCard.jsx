import React, {useContext} from 'react'
import myContext from '../../context/data/myContext'

const ProdCard = () => {
  const context = useContext(myContext)
  const {mode} = context

  return (
    <div className=' border-2 rounded-lg border-swiftCartLight flex flex-col p-4 m-4 w-fit
      hover:scale-105 duration-300 ease-in-out'>
      <div className='mb-2'>
        <img src="https://dummyimage.com/400x400" alt="product" className=''/>
      </div>
      <div>
        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}  >Seller Name</h2>
        <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>Product Name</h1>
        <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>Rs.500</p>
      </div>
      <div className=" flex justify-center">
        <button type="button" className="focus:outline-none text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-sm w-full  py-2">Add To Cart</button>
      </div>
    </div>
  )
}

export default ProdCard