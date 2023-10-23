import React, {createContext, useState } from 'react'
    export const UserName = createContext()

export default function ContextProvider({children}) {
    const [loginUser, setLoginUser] = useState([])
    const [name,setName] = useState('priyank')
    const [file, setFile] = useState(null);
    const [isLogin,setLogin] = useState(false)
    const [token,setToken] = useState(null)
  return (
    <UserName.Provider value={{name,setName,loginUser,setLoginUser,isLogin,setLogin,file, setFile,token,setToken}} >
      {  children }
    </UserName.Provider>
  )
}

