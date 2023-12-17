import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const loginSubmit = (e) => {
        e.preventDefault()
        console.log('form submitted')
    }

    return (
        <div className=' flex justify-center items-center h-screen bg-swiftCartLight'>
            <form onSubmit={loginSubmit}>
                <div className=' border-2 border-blue-900 px-10 py-10 rounded '>
                    <div className="">
                        <h1 className='text-center text-black text-xl mb-4 font-bold'>Login to Swift Cart</h1>
                    </div>
                    <div>
                        <input type="email"
                            name='email'
                            value={loginEmail}
                            className='border-2 border-blue-800  mb-4 px-6 py-2 w-full lg:w-[20em] rounded text-black placeholder:text-gray-400 outline-none'
                            placeholder='e-mail'
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            className=' border-2 border-blue-800 mb-4 px-6 py-2 w-full lg:w-[20em] text-black placeholder:text-gray-400 outline-none'
                            placeholder='password'
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button type='submit'
                            className=' bg-blue-600 w-full text-white font-bold  px-2 py-2'>
                            Login
                        </button>
                    </div>
                    <div className=' flex justify-center mb-2'>
                        <button>Forgot Password</button>
                    </div>
                    <div className=' flex justify-center'>
                        <h2 className='text-black'>New to Swift Cart? <Link className=' text-swiftCart font-bold' to={'/signup'}>Signup</Link></h2>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
