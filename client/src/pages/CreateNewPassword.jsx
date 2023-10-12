import { Link, useLocation } from "react-router-dom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
useLocation

function CreatePassword() {

    const [form] = Form.useForm()

    const location = useLocation()
    const dataObject = location.state

    const onFinish = async (values) => {

        try {
            const { password, currentPassword } = values
            debugger
            const { data } = await axios.post("http://localhost:3000/update-password", {
                email: dataObject.id,
                password,
                currentPassword
            })
            if (data.message == 'password updated') toast.success(data.message)
        } catch (error) {
            if (error.response.data.error) toast.error(error.response.data.error)
            console.log(error);
        }

    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="border px-16 py-20 rounded-lg shadow-lg shadow-gray-500">
                <h1 className="text-3xl mb-9 ms-3 font-extrabold">Update Password</h1>
                <Form form={form}
                    onFinish={onFinish}
                    style={{ maxWidth: 600, minWidth: 300 }}
                    layout='vertical'
                >
                    <p className="border border-gray-500 py-2 px-3 mb-3 rounded-lg bg-slate-400">Email is: {dataObject.id}</p>
                    <Form.Item name="password" label="password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="currentPassword" label="Current password" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit">Update password</Button>
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

export default CreatePassword