import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
    const [type, setType] = useState(1)
    const navigate = useNavigate()

    const [form] = Form.useForm()
    
    const onFinish = async (values) => {
        console.log(values);

        const { email, otp } = values
        try {
            debugger
            const { data } = await axios.post("http://localhost:3000/forgot-password", {
                email: email,
                otp: otp,
                type: type
            })
            if (data.message == 'otp sended'){ 
                toast.success(data.message)
                setType(2)
            } 
            if(data.message === 'otp verified') {
                toast.success("otp verified")
                setTimeout(()=>{
                    navigate("/update-password",{
                        state:{
                            id:email
                        }
                    })
                },4000)
            }
        } catch (error) {
            if(error.response.data.error) toast.error(error.response.data.error)
            console.log(error);
        }
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="border px-16 py-20 rounded-lg shadow-lg shadow-gray-500">
                <h1 className="text-3xl mb-9 ms-3 font-extrabold">Forgot Password</h1>
                <Form form={form}
                    onFinish={onFinish}
                    style={{ maxWidth: 600, minWidth: 300 }}
                    layout='vertical'
                >
                    <Form.Item name="email" label="Enter registered Email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    {
                        type == 1
                            ? <Form.Item name="otp" label="OTP">
                                <Input readOnly />
                            </Form.Item>
                            : <Form.Item name="otp" label="OTP">
                                <Input />
                            </Form.Item>
                    }
                    <Form.Item>
                        <Button htmlType="submit">Verify</Button>
                    </Form.Item>
                </Form>

                <div className="rounded-lg my-2">
                    <Link to="/login"
                        className="text-sm underline flex justify-center">
                        Login Page
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword