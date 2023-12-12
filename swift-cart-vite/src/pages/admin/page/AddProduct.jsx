import React from 'react'

function AddProduct() {
    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-swiftCart px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-black text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    <div>
                        <input type="text"
                            name='title'
                            className='  mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-200 outline-none'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='price'
                            className='  mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-200 outline-none'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="file"
                            name='image'
                            accept="image/*"
                            className=' bg-white mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-200 outline-none'
                            placeholder='Product image'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='category'
                            className=' mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-200 outline-none'
                            placeholder='Product category'
                        />
                    </div>
                    <div>
                    <textarea cols="30" rows="10" name='title'
                            className=' mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-gray-200 outline-none'
                            placeholder='Product title'>

                    </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            className=' bg-swiftCartLight w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct