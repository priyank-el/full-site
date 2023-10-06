import React from 'react'
import { Button, Form, Input } from 'antd'
import { useContext } from 'react'
import {UserName} from '../../providers/ContextProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UpdateProfile = () => {
    const { loginUser } = useContext( UserName )
    const navigate = useNavigate()

    const obj = {
        username:loginUser.username,
        email:loginUser.email,
        password:loginUser.password
    }

    const onFinish = (values) => {
        const { username, email, password } = values
        debugger
        axios.put(`http://localhost:3000/update-profile?id=${loginUser._id}`, {
            username,
            email,
            password
        })
            .then(response => {
                if (response.data.message !== "user updated") navigate("/")
                
                navigate("/home", {
                    state: {
                        id: email
                    }
                })
            }
            )
            .catch((error) => {
                console.log("Unauthenticated..")
                navigate("/login")
            }
            )
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
                <h1 className='text-3xl mb-9 ms-3 font-extrabold'>update profile </h1>
                <Form
                    onFinish={onFinish}
                    initialValues={obj}
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
                            update
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}

export default UpdateProfile;
