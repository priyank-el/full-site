
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const gotoRegisterPage = () => navigate("/")

    const HandleEvent = (e) => {
        e.preventDefault()
        debugger
        axios.post("http://localhost:3000/login", {
            email,
            password
        })
            .then(response => 
                {
                    if(response.data.message !== "user login..") navigate("/")
                    
                    navigate("/home",{
                        state:{
                            id:email
                        }
                    })
                }
            )
            .catch((error) => 
                {   
                    if(error.response.data) navigate("/")
                    console.log("Unauthenticated..");
                    alert(error.response.data.error)

                    navigate("/login")
                }
            )
    }

    return (
        <>
            <div className='grid items-center justify-center border border-blue-500 h-screen w-screen'>
                <div className='border border-gray-300 shadow-lg grid items-center justify-center rounded-lg'>

                    <form action="/home" method="post" className='mx-20 my-20'>
                        <h1 className='flex justify-center mb-14 text-2xl font-extrabold text-gray-600'>LOGIN FORM</h1>
                        <div className='h-14 w-80 border border-gray-400 grid items-center rounded-lg my-2'>
                            <input 
                            type="email" 
                            name="email" 
                            id="emailInput" 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter Email' 
                            className='h-full mx-3 px-2 focus:outline-none focus:border-blue-200' required />
                        </div>
                        <div className='h-14 w-80 border border-gray-400 grid items-center rounded-lg my-2'>
                            <input 
                            type="password" 
                            name="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            id="passwordInput" 
                            placeholder='Enter Password' 
                            className='h-full mx-3 px-2 focus:outline-none focus:border-blue-200' required />
                        </div>
                        <div className='h-14 w-80 grid items-center rounded-lg my-2'>
                            <button 
                            // type="submit" 
                            onClick={HandleEvent}
                            className='bg-blue-600 p-2 rounded-lg text-white'>login</button>
                        </div>
                    </form>
                    <div className='rounded-lg my-2'>
                        <button
                            type="submit"
                            onClick={gotoRegisterPage}
                            className='bg-blue-600 p-2 rounded-lg text-white w-28'>
                            register page
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Login
