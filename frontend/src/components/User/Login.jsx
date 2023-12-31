import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login, setError } from '../../redux/userSlice';

function Login() {
  const dispatch = useDispatch();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/auth/login', {
        email: loginEmail,
        password: loginPassword,
      });

      if (response.data.error) {
        dispatch(setError(response.data.error));
      } else {
        dispatch(login(response.data));
        navigate('/'); // Redirect to the home page after successful login
        window.location.reload();
      }
    } catch (error) {
      dispatch(setError('An error occurred during login. Please try again.'));
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-swiftCartLight'>
      <form onSubmit={loginSubmit}>
        <div className='border-2 border-blue-900 px-10 py-10 rounded'>
          <div>
            <h1 className='text-center text-black text-xl mb-4 font-bold'>Login to Swift Cart</h1>
          </div>
          {error && (
            <div className='text-red-500 mb-4'>
              <p>{error}</p>
            </div>
          )}
          <div>
            <input
              type='email'
              name='email'
              value={loginEmail}
              className='border-2 border-blue-800 mb-4 px-6 py-2 w-full lg:w-[20em] rounded text-black placeholder:text-gray-400 outline-none'
              placeholder='e-mail'
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type='password'
              className='border-2 border-blue-800 mb-4 px-6 py-2 w-full lg:w-[20em] text-black placeholder:text-gray-400 outline-none'
              placeholder='password'
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className='flex justify-center mb-3'>
            <button type='submit' className='bg-blue-600 w-full text-white font-bold px-2 py-2'>
              Login
            </button>
          </div>
          <div className='flex justify-center mb-2'>
            <button>Forgot Password</button>
          </div>
          <div className='flex justify-center'>
            <h2 className='text-black'>
              New to Swift Cart?{' '}
              <Link className='text-swiftCart font-bold' to={'/signup'}>
                Signup
              </Link>
            </h2>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
