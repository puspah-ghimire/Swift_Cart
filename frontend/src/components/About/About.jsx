import React from 'react'

const About = () => {
  return (
    <>
    <div className=' md:min-h-[calc(40vmax)]  min-h-[calc(70vmax)] px-4 md:px-0'>
    <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold mb-1 mt-12' >About Swift Cart</h1>
        <div className="h-1 w-60 bg-blue-700 rounded mb-12"></div>
      </div>
      <div className='flex justify-center'>
        <div className=' md:w-1/2 text-xl mb-8'>
          <p>&emsp; Swift Cart is an e-commerce platform where users can seamlessly browse, discover, and purchase a diverse range of products. Swift Cart allows users to explore and purchase products from the comfort of their homes, removing the need to travel to physical stores.</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default About