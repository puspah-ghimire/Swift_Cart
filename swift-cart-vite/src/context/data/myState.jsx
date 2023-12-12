import { useState } from 'react'
import React from 'react'
import myContext from './myContext'

const MyState = (props) => {
  const [mode, setMode] = useState('light')
  const toggleMode = ()=>{
    if (mode == 'light') {
      setMode('dark')
      document.body.style.backgroundColor = "rgb(27,29,34)"
    } else {
      setMode('light')
      document.body.style.backgroundColor = "white"
    }
  }
  return (
    <myContext.Provider value={{mode, toggleMode}}>
      {props.children}
    </myContext.Provider>
  )
}

export default MyState