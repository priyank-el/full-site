import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [form] = Form.useForm()

    const navigate = useNavigate()

    const onFinish = (values) => {
        const { email, password } = values
        axios.post("http://localhost:3000/login", {
            email,
            password
        })
            .then(response => {
                if (response.data.message !== "user login..") navigate("/")

                navigate("/home", {
                    state: {
                        id: email
                    }
                })
            }
            )
            .catch((error) => {
                if (error.response.data) navigate("/")
                console.log("Unauthenticated..");
                alert(error.response.data.error)

                navigate("/login")
            }
            )
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
                <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Signin form </h1>
                <Form
                    form={form}
                    //   name="signup"
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <div className='rounded-lg my-2'>
                    <Link to="/" className='text-sm underline'>create account first..</Link>
                </div>
            </div>
        </div>
    )
}

export default Signin;