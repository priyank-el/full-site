import React, {createContext, useState } from 'react'
    export const UserName = createContext()

export default function ContextProvider({children}) {
    const [loginUser, setLoginUser] = useState([])
    const [name,setName] = useState('priyank')
  return (
    <UserName.Provider value={{name,setName,loginUser,setLoginUser}} >
      {  children }
    </UserName.Provider>
  )
}

