"use client"

import React, { useState } from 'react'
import { auth, googleAuth } from '@/app/firebase/firebase'
import { signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import Link from 'next/link'

const loginForm = () => {
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  console.log(auth?.currentUser?.email)

  const signInHandler = async () => {
    if (!email || !password) return
    try { const user = await signInWithEmailAndPassword(auth, email, password) }
    catch(error) { console.error(error) }
  }

  const signInGoogleHandler = async () => {
    try { const user = await signInWithPopup(auth, googleAuth) }
    catch(error) { console.error(error) }
  }
  
  const logout = async () => {
    try { await signOut(auth) }
    catch(error) { console.error(error) }
  }

  return (
    <>  
    <div className=' bg-white border-swiftcart-dark border-2 flex flex-col p-8 my-12 mx-24 items-center rounded-3xl'>
      <form onSubmit={e => e.preventDefault()}>
          <div className='flex flex-col items-center'>
            <h1 className=' font-extrabold text-3xl p-4'>Login to Swift Cart</h1>
            <label>
            <input type="email" required
            placeholder='email address'
            onChange = {(e) => {setEmail(e.target.value)}}
            className=' mb-2 text-xl px-12 py-2 mt-4 rounded-full bg-swiftcart-lighter'/>
            </label>
            <input type="password" required
            placeholder='password'
            onChange = {(e) => {setPassword(e.target.value)}}
            className=' mb-2 text-xl px-12 py-2 rounded-full bg-swiftcart-lighter'/>
            <button 
            onClick={signInHandler}
            className='bg-swiftcart-primary text-white px-10 py-2 rounded-full font-semibold m-4 mb-2 hover:bg-swiftcart-dark'>LOGIN</button>
            <h3 className=' text-xs text-gray-500'>Forgot Password?</h3>
          </div>
    </form>
          <div>
            <button 
            onClick={signInGoogleHandler}
            className='bg-swiftcart-primary text-white px-10 py-2 rounded-lg font-semibold m-4 mb-2 hover:bg-swiftcart-dark'>Sign in with Google</button>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <h2 className=' font-medium'>New to Swift Cart?</h2>
            <button
            className='bg-swiftcart-primary text-white px-10 py-2 rounded-full font-semibold hover:bg-swiftcart-dark'>
              Sign Up
            </button>
          </div>
      </div>
    </>
  )
}

export default loginForm