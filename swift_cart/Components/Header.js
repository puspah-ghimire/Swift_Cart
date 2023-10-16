import React from 'react'
import Link from 'next/link'
import Searchbar from './Searchbar'

const Header = () => {
  return (
    <div className=' bg-swiftcart-primary flex items-center justify-between p-8 text-white'>
        <Link href="/">Swift Cart</Link>

        <Searchbar></Searchbar>
        
        <div className='flex gap-6'>
            <Link href="/MyCart">Cart</Link>
            <Link href="/Buy">Buy</Link>
            <Link href="/Sell">Sell</Link>
            <Link href="/Profile">Profile</Link>
            <Link href="/Login">Log In</Link>
        </div>
    </div>
  )
}

export default Header