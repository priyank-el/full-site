import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const [form] = Form.useForm()

    const navigate = useNavigate()

    const onFinish = async (values) => {

        const { username, email, password } = values
        debugger
        try {
            const res = await axios.post("http://localhost:3000/register", {
                username: username,
                email: email,
                password: password
            })
            const data = await res.data.message
            if (data) {
                if (data) toast.success("user created successfully")
                navigate("/otp-verify", {
                    state: {
                        id: email
                    }
                })
            }
        } catch (error) {
            if (error.response.data.email) toast.error(error.response.data.email)
            if (error.response.data.username) toast.error(error.response.data.username)
            if (error.response.data.password) toast.error(error.response.data.password)
        }
    }

    return (
        <>
            <div className='h-screen w-screen flex items-center justify-center'>
                <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
                    <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Signup form </h1>

                    <Form
                        form={form}
                        onFinish={onFinish}
                        style={{ maxWidth: 600,minWidth:300 }}
                        layout='vertical'
                    >
                        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                            <Input.Password />
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