import { useEffect, useState } from "react";
import axios from "axios"

function Register() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function HandleEvent() {

        axios.post("http://localhost:3000/register", {
            username,
            email,
            password
        })
            .then(response => console.log(response))
            .catch((error) => console.log(error.message))
    }

    return (
        <>
            <div className='grid items-center justify-center border border-blue-500 h-screen w-screen'>
                <div className='border border-gray-300 shadow-lg grid items-center justify-center rounded-lg'>

                    <form onSubmit={HandleEvent} action="/home" method="get" className='mx-20 my-20'>
                        <h1 className='flex justify-center mb-14 text-2xl font-extrabold text-gray-600'>REGISTER FORM</h1>
                        <div className='h-14 w-80 border border-gray-400 grid items-center rounded-lg my-2'>
                            <input type="text" onChange={(e) => setUsername(e.target.value)} name="username" id="usernameInput" placeholder='Enter username' className='h-full mx-3 px-2 focus:outline-none focus:border-blue-200 text-gray-600' required />
                        </div>
                        <div className='h-14 w-80 border border-gray-400 grid items-center rounded-lg my-2'>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="emailInput" placeholder='Enter Email' className='h-full mx-3 px-2 focus:outline-none focus:border-blue-200 text-gray-600' required />
                        </div>
                        <div className='h-14 w-80 border border-gray-400 grid items-center rounded-lg my-2'>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="passwordInput" placeholder='Enter Password' className='h-full mx-3 px-2 focus:outline-none focus:border-blue-200 text-gray-600' required />
                        </div>
                        <div className='h-14 w-80 grid items-center rounded-lg my-2'>
                            <button type="submit" className='bg-blue-600 p-2 rounded-lg text-white'>register</button>
                        </div>
                    </form>
                    <div className='rounded-lg my-2'>
                        <form action="/login" method='get'>
                            <button type="submit" className='bg-blue-600 p-2 rounded-lg text-white w-28'>login first</button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register
