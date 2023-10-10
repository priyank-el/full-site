import React, {createContext, useState } from 'react'
    export const UserName = createContext()

export default function ContextProvider({children}) {
    const [loginUser, setLoginUser] = useState([])
    const [name,setName] = useState('priyank')
    const [file, setFile] = useState(null);
    const [isLogin,setLogin] = useState(false)
  return (
    <UserName.Provider value={{name,setName,loginUser,setLoginUser,isLogin,setLogin,file, setFile}} >
      {  children }
    </UserName.Provider>
  )
}

