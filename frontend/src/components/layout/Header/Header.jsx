import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from 'react-icons/rx'
import { Link, useNavigate } from 'react-router-dom'; 
import { getUserInfo } from '../../../../../backend/controllers/authController';
import { getAuth } from 'firebase/auth';

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  
  const auth = getAuth();
  const user = auth.currentUser; //return garena yesle
  
  const admin = 0 //admin kasari check garne ho


  if (user) {
    return (
      <div className="bg-white sticky top-0 z-50  "  >
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
  
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-28">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="space-y-4 border-t border-gray-200 px-4 py-6">
                    <Link to={'/products'} className=' flow-root'>
                      Products
                    </Link>
                    <div className="flow-root">
                      About
                    </div>
                    <div className="flow-root">
                      Contact
                    </div>
  
                    
                    <div className="flow-root">
                      <a href="/profile">
                      <img
                          className="inline-block w-10 h-10 rounded-full"
                          src='profile.svg'
                          alt="profile" />  
                      </a>
                                                            
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
  
        {/* desktop  */}
        <header className="relative bg-white">
  
          <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " >
            <div className="">
              <div className="flex h-16 items-center ">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)} 
                >
                  <span className="sr-only">Open menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
  
                </button>
  
                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
  
                    <div className="flex ">
                      <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' >Swift Cart</h1>
                    </div>
  
                </div>
  
                <div className="ml-auto flex items-center gap-4">
                  <div className="ml-4 flow-root lg:ml-6 text-2xl lg:mr-4">
                    <button>
                      <FaSearch />
                    </button>
                  </div>
  
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 lg:gap-4">
  
  
                      <Link to={'/products'}>Products</Link>
                      <a href="">About</a>
                      <a href="">Contact</a>
  
                  </div>
  
                  
                  
  
                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="/profile" className="flex items-center text-gray-700 ">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src='/profile.svg'
                        alt="profile" />
                    </a>
                  </div>
  
                  
  
                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6 text-4xl">
                    <button>
                      <AiOutlineShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    )
  } else if(admin) {
    return (
      <div className="bg-white sticky top-0 z-50  "  >
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
  
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-28">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <RxCross2 />
                    </button>
                  </div>
                  <div className="space-y-4 border-t border-gray-200 px-4 py-6">
                    <Link to={'/products'} className=' flow-root'>
                      Products
                    </Link>
                    <div className="flow-root">
                      About
                    </div>
                    <div className="flow-root">
                      Contact
                    </div>
  
                    
                    <div className="flow-root">
                      <a href="/profile">
                      <img
                          className="inline-block w-10 h-10 rounded-full"
                          src='profile.svg'
                          alt="profile" />  
                      </a>
                                                            
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
  
        {/* desktop  */}
        <header className="relative bg-white">
  
          <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " >
            <div className="">
              <div className="flex h-16 items-center ">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)} 
                >
                  <span className="sr-only">Open menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
  
                </button>
  
                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
  
                    <div className="flex ">
                      <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' >Swift Cart</h1>
                    </div>
  
                </div>
  
                <div className="ml-auto flex items-center gap-4">
                  <div className="ml-4 flow-root lg:ml-6 text-2xl lg:mr-4">
                    <button>
                      <FaSearch />
                    </button>
                  </div>
  
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 lg:gap-4">
  
  
                      <Link to={'/products'}>Products</Link>
                      <a href="">About</a>
                      <a href="">Contact</a>
  
                  </div>
  
                  
                  
  
                  <div className="hidden lg:ml-8 lg:flex">
                    <a href="/profile" className="flex items-center text-gray-700 ">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src='/profile.svg'
                        alt="profile" />
                    </a>
                  </div>
  
                  
  
                  
                  <div className="ml-4 flow-root lg:ml-6 text-xl">
                    <button>
                      Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    )
  } else {
    return (
    <div className="bg-white sticky top-0 z-50  "  >
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-4 border-t border-gray-200 px-4 py-6">
                  <Link to={'/products'} className=' flow-root'>
                    Products
                  </Link>
                  <div className="flow-root">
                    About
                  </div>
                  <div className="flow-root">
                    Contact
                  </div>

                  
                  <div className="flow-root">
                    <a href="/login">
                    Login
                    </a>
                                                          
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* desktop  */}
      <header className="relative bg-white">

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " >
          <div className="">
            <div className="flex h-16 items-center ">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} 
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">

                  <div className="flex ">
                    <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' >Swift Cart</h1>
                  </div>

              </div>

              <div className="ml-auto flex items-center gap-4">
                <div className="ml-4 flow-root lg:ml-6 text-2xl lg:mr-4">
                  <button>
                    <FaSearch />
                  </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 lg:gap-4">


                    <Link to={'/products'}>Products</Link>
                    <a href="">About</a>
                    <a href="">Contact</a>

                </div>

                
                

                <div className="lg:ml-8 lg:flex">
                  <a href="/login" className="flex items-center text-gray-700 ">
                    Login
                  </a>
                </div>

                

                
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
  }

  
}