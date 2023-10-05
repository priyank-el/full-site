import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
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
                navigate('/login')
            })
            .catch((error) => {
                console.log("Unauthenticated..")
                alert(error.response.data.email)
                navigate("/")
            })
    }

    return (
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
                    <Form.Item  name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                <div className='rounded-lg my-2'>
                    <Link to="/login" className='text-sm underline'>already have account?</Link>
                </div>
            </div>

        </div>
    );
};

export default Signup;