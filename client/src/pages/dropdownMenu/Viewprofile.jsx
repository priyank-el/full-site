import {useContext} from 'react'
// import {useNavigate} from 'react-router-dom'

import {UserName} from '../../providers/ContextProvider'

const ViewProfile = () => {
    const { loginUser } = useContext( UserName )
    console.log(loginUser);
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

{/* <div className='h-full w-full m-8'>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
</div> */}

export default ViewProfile;