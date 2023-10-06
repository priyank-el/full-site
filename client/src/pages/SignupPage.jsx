import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// toast.configure()

const Signup = () => {
    const [error, setError] = useState("")
    const [signup, setSignUp] = useState(false)
    const [form] = Form.useForm()

    const navigate = useNavigate()

    const onFinish = (values) => {

        const { username, email, password } = values
        console.log(values)
        axios.post("http://localhost:3000/register", {
            username,
            email,
            password
        })
            .then(response => {
                console.log(response);
                if (response.data.message !== "user created..") navigate("/")
                setSignUp(true)
                setTimeout(() => {
                    navigate('/login')
                }, 6000)

            })
            .catch((error) => {
                setError(error.response.data.email)
                console.log("Unauthenticated..")
                navigate("/")
            })
    }

    function toastHandler() {
        if (error) toast.error(error)
        if (setSignUp) toast.success("user created successfully")
    }

    return (
        <>
            <div className='h-screen w-screen flex items-center justify-center'>
                <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
                    <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Signup form </h1>
                    <Form
                        form={form}
                        //   name="signup"
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
                            <Button onClick={toastHandler} htmlType="submit">
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