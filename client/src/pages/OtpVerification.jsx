import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function OTPverification() {

    const [text,setText] = useState('')
    const navigate = useNavigate()

    const location = useLocation();
    const email = location.state.id;

    const onfinish = async (e) => {
        e.preventDefault()
        console.log("i am here..");

        try {
            debugger
            const { data } = await axios.post("http://localhost:3000/otp-verify",{
                email:email,
                otp:text
            })

            if(data) {
                navigate("/login")
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const resendOtpHandler = async (e) => {
        e.preventDefault()
        try {
            debugger
            const { data } = await axios.post("http://localhost:3000/resend-otp",{
                email:email
            })

            if(data) {
                toast.success(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div class="flex flex-col items-center justify-center text-center space-y-2">
                            <div class="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div class="flex flex-row text-sm font-medium text-gray-400">
                                <p>We have sent a code to your email </p>
                            </div>
                        </div>

                        <div>
                            <form onSubmit={onfinish}>
                                <div class="flex flex-col space-y-16">
                                    <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">

                                        <div class="">
                                            <input
                                                type="text"
                                                name="otp"
                                                onChange={(e) => setText(e.target.value)}
                                                className="border border-gray-300 mt-5 w-full py-2 rounded-lg shadow-lg shadow-gray-400 hover:outline-none outline-none px-3"
                                                id="inputotpContainer" />
                                        </div>
                                    </div>

                                    <div class="flex flex-col space-y-5">
                                        <div>
                                            <button
                                                type="submit"
                                                class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                                Verify Account
                                            </button>
                                        </div>

                                        <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't recieve code?</p> <a onClick={resendOtpHandler} class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            }

        </>
    )
}

export default OTPverification