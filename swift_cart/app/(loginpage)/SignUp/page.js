"use client"

import React from 'react'
import { useState } from 'react'
import { auth, googleAuth } from '@/app/firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, signOut } from 'firebase/auth'

const SignUpPage = () => {

  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const signUphandler = async () => {
    if (!username || !email || !password) return
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(auth.currentUser, {
        displayName: username
      })
      console.log(user) }
    catch(error) { console.error(error) }
  }

  const signInGoogleHandler = async () => {
    try { const user = await signInWithPopup(auth, googleAuth) }
    catch(error) { console.error(error) }
  }


  return (
    <>
      <button
      onClick={signInGoogleHandler}
      className=' bg-swiftcart-dark'>Sign In with Google</button>

      <form onSubmit={e => e.preventDefault()}>
        <div>
            <label>username
            <input type="text" required
                className=' bg-red-400'
                onChange={e => setUsername(e.target.value)} />
            </label>
        </div>

        <div>
            <label>email
            <input type="email" required
                className=' bg-red-400' 
                onChange={e => setEmail(e.target.value)}/>
            </label>
        </div>

        <div>
            <label>password
            <input type="password" required
                className=' bg-red-400'
                onChange={e => setPassword(e.target.value)} />
            </label>
        </div>

        <button 
        onClick={signUphandler}
        className=' bg-swiftcart-primary'>Sign Up</button>
      </form>
    </>
  )
}

export default SignUpPage