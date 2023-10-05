import React from 'react';
import { Button, Form, Input } from 'antd';

const UpdateProfile = () => {
    const obj = {
        username:"priyank",
        email:"priyank@01.com",
        password:"123"
    }

    const onFinish = () => {
        
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
