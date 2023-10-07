import React, { useState, useContext } from 'react'
import { UserName } from '../../providers/ContextProvider'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UpdateProfile = () => {
  const navigate = useNavigate()
  const { loginUser } = useContext(UserName)
  const [form] = Form.useForm()

  const objectData = {
    username: loginUser.username,
    email: loginUser.email,
    password: loginUser.password
  }

  const onFinish = async (values) => {

    const { username, email, password } = values
    debugger
    const response = await axios.put(`http://localhost:3000/update-profile?id=${loginUser._id}`, {
      username: username,
      email: email,
      password: password
    })
    console.log(response)
    if(response.data.message) navigate("/home")
  }

  return (
    <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
      <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Edit Profile </h1>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={objectData}
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
            Edit
          </Button>
          <ToastContainer />
        </Form.Item>
      </Form>
    </div>

  )
}

export default UpdateProfile;
