import {useContext} from 'react'
import { UserName } from '../../providers/ContextProvider'

const ViewProfile = () => {
    const { loginUser } = useContext( UserName )
    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
                <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Profile Page </h1>
                <h1>Username:{loginUser.username}</h1>
                <h1>Email:{loginUser.email}</h1>
               
            </div>
        </div>
    )
}

export default ViewProfile;