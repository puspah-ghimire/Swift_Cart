import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Searchbar = () => {
  return (
    <div className='flex justify-between items-center bg-swiftcart-light rounded-full'>
        <input type="text" 
        className=' text-black py-2 pl-5 rounded-full rounded-r-none bg-swiftcart-light' 
        placeholder='Search Products' />

        <FontAwesomeIcon icon={faMagnifyingGlass} className=' h-5 px-4'></FontAwesomeIcon>
    </div>
  )
}

export default Searchbar