import React,{useContext} from 'react'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserName } from '../../providers/ContextProvider';

const UpdatePassword = () => {
    const { loginUser } = useContext(UserName) 
    const navigate = useNavigate()

    const onFinish = (values) => {
        const { oldpass,newpass } = values
        console.log(values)

        debugger
        axios.post(`http://localhost:3000/update-password?id=${ loginUser._id }`,{
            oldpass,
            newpass
        })
        .then( response => {
            if (response.data.message !== "user password updated") navigate("/login")
                
                navigate("/home", {
                    state: {
                        id: loginUser.email
                    }
                })
        })
    }

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
                <h1 className='text-3xl mb-9 ms-3 font-extrabold'>update password </h1>
                <Form
                    onFinish={onFinish}
                >
                    <Form.Item name="oldpass" label="Old Password" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="newpass" label="New Password" rules={[{ required: true }]}>
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

export default UpdatePassword;
