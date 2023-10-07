import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [error, setError] = useState("")
    const [signup, setSignUp] = useState(false)
    const [form] = Form.useForm()

    const navigate = useNavigate()

    const onFinish = async (values) => {

        const { username, email, password } = values
        debugger
        const res = await axios.post("http://localhost:3000/register",{
            username:username,
            email:email,
            password:password
        }) 
        const data = await res.data.message
        if(data){
            setSignUp(true)
            console.log(signup)
            if (!signup) toast.success("user created successfully")
            setTimeout(()=>navigate("/login"),6000)
        }
    }

    // function toastHandler() {
    //     if (error) toast.error(error)
    // }

    return (
        <>
            <div className='h-screen w-screen flex items-center justify-center'>
                <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
                    <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Signup form </h1>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">
                                Sign Up
                            </Button>
                            <ToastContainer />
                        </Form.Item>
                    </Form>
                    <div className='rounded-lg my-2'>
                        <Link to="/login" className='text-sm underline'>already have account?</Link>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Signup;