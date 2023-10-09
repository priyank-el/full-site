import {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserName } from '../../providers/ContextProvider'

const ViewProfile = () => {
    const navigate = useNavigate()
    const { loginUser } = useContext( UserName )

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
                <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Profile Page </h1>
                <h1>UserName:{loginUser.username}</h1>
                <h1>FirstName:{loginUser.firstname ? loginUser.firstname : null}</h1>
                <h1>LastName:{loginUser.lastname ? loginUser.lastname : null}</h1>
                <h1>Email:{loginUser.email}</h1>
                <h1>Mobile no:{loginUser.mobile ? loginUser.mobile : null}</h1>
                <button 
                    className='bg-gray-500 px-5 py-2 rounded-lg mt-4 text-white'
                    onClick={ () => navigate("/home/update-profile") }
                    >Update profile
                </button>
            </div>
        </div>
    )
}

export default ViewProfile;