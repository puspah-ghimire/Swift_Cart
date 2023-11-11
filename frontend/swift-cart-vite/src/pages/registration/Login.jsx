import { Link } from 'react-router-dom'

function Login() {
  
    return (
        <div className=' flex justify-center items-center h-screen bg-swiftCartLight'>
            <div className=' bg-white px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-black text-xl mb-4 font-bold'>Login to Swift Cart</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        className=' bg-swiftCartLighter mb-4 px-6 py-2 w-full lg:w-[20em] rounded-full text-black placeholder:text-gray-400 outline-none'
                        placeholder='e-mail'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        className=' bg-swiftCartLighter mb-4 px-6 py-2 w-full lg:w-[20em] rounded-full text-black placeholder:text-gray-400 outline-none'
                        placeholder='password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        className=' bg-swiftCart w-full text-white font-bold  px-2 py-2 rounded-full'>
                        Login
                    </button>
                </div>
                <div className=' flex justify-center'>
                    <h2 className='text-black'>New to Swift Cart? <Link className=' text-swiftCart font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login