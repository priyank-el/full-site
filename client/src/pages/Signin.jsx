import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {UserName} from '../providers/ContextProvider'

const Signin = () => {
    const { setLogin } = useContext(UserName)
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    debugger;
    const { data } = await axios.post("http://localhost:3000/login", {
      email: email,
      password: password,
    });

    if (data) {
      localStorage.setItem("JwtToken", data.token);
      setLogin(true)
      navigate("/home", {
        state: {
          id: email,
        },
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border px-16 py-20 rounded-lg shadow-lg shadow-gray-500">
        <h1 className="text-3xl mb-9 ms-3 font-extrabold">Signin form </h1>
        <Form form={form} onFinish={onFinish} style={{ maxWidth: 600 }}>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">sign in</Button>
          </Form.Item>
        </Form>
        <div className="rounded-lg my-2">
          <Link to="/" className="text-sm underline">
            create account first!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
