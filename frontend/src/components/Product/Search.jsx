import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = ({history}) => {
  const [keyword, setKeyword] = useState("")
  const navigate = useNavigate()

  const searchSubmitHandler = (e) => {
    e.preventDefault()
    if(keyword.trim()) {
      navigate(`/products/${keyword}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <>
    <form onSubmit={searchSubmitHandler} className='flex gap-4 justify-center py-8'>
      <input 
        type="text"
        placeholder='Search Products' 
        onChange={(e)=>setKeyword(e.target.value)}
        className=' border-2 border-black px-4 py-2 rounded-md'
      />
      <input type="submit" value={'Search'} className=' bg-blue-600 px-4 py-2 border-2 rounded-md'/>
    </form>
    </>
  )
}

export default Search