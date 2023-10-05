import React, {createContext, useState } from 'react'
    export const UserName = createContext()

export default function ContextProvider({children}) {
    const [name,setName] = useState('priyank')
  return (
    <UserName.Provider value={{name,setName}} >
      {  children }
    </UserName.Provider>
  )
}

