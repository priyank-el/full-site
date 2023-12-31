import React, { useContext } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserName } from "../../providers/ContextProvider";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const { loginUser, setLoginUser } = useContext(UserName)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    const { oldpass, newpass, confirmpass } = values
    const token = localStorage.getItem("JwtToken")
    debugger;
    try {
      const { data } = await axios.post(
        `http://localhost:3000/update-loginuser-password?id=${loginUser._id}`, {
        oldpass,
        newpass,
        confirmpass
      },{
        headers:{
          Authorization:token
        }
      }
      )

      const updateUser = {
        _id: loginUser._id,
        username: loginUser.username,
        email: loginUser.email,
        password: newpass,
        createdAt: loginUser.createdAt,
        updatedAt: loginUser.updatedAt,
      }

      if (data) setLoginUser(updateUser)
      if (data.message) toast.success("password updated")
        navigate("/home", {
          state: {
            id: loginUser.email,
          }
        })

    } catch (error) {
      if (error.response.data.error) toast.error(error.response.data.error)
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border px-16 py-20 rounded-lg shadow-lg shadow-gray-500">
        <h1 className="text-3xl mb-9 ms-3 font-extrabold">update password </h1>
        <Form
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="oldpass"
            label="Old Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newpass"
            label="New Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmpass"
            label="Confirm Password"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">update</Button>
            <Button
              htmlType="button"
              onClick={(e) => navigate("/home")}
              className='ms-5'
            >
              cancel
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  )
}

export default UpdatePassword;
