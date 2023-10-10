import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogoutPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='h-screen w-screen flex items-center justify-center'>
                <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
                    <p>Are you sure You want to </p>
                    <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Logout?</h1>

                    <button
                        onClick={() => {
                            localStorage.removeItem("JwtToken")
                            toast.success("loged out successfully")
                            navigate("/login")
                        }}
                        className="text-white bg-red-400 hover:bg-red-500 border border-gray-400 shadow-lg rounded-lg px-3 py-1 me-3"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => {
                            navigate("/home")
                        }}
                        className="text-black border border-gray-400 shadow-lg rounded-lg px-3 py-1 ms-4"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </>
    )
}

export default LogoutPage