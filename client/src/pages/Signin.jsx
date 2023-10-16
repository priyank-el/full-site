import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    debugger;
    try {
      const { data } = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      if (data) {
        localStorage.setItem("JwtToken", data.token);
        toast.success("user login done")
        navigate("/home", {
          state: {
            id: email,
          }
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response.data.error == 'verify otp first') {
        toast.error(error.response.data.error)
        setTimeout(() => {
          navigate("/otp-verify", {
            state: {
              id: email
            }
          })
        }, 3000)
      } else {
        if (error.response.data.error) toast.error(error.response.data.error)
      }
      if (error.response.data.email) toast.error(error.response.data.email)
      if (error.response.data.password) toast.error(error.response.data.password)
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border px-16 py-20 rounded-lg shadow-lg shadow-gray-500">
        <h1 className="text-3xl mb-9 ms-3 font-extrabold">Signin form </h1>
        <Form form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600, minWidth: 300 }}
          layout='vertical'
        >
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">sign in</Button>
          </Form.Item>
        </Form>
        <div className="rounded-lg my-2">
          <Link to="/forgot-password" 
            className="text-sm flex justify-center font-extrabold text-blue-600 cursor-pointer">
            forgot password!
          </Link>
        </div>
        <div className="rounded-lg my-2">
          <Link to="/" 
            className="text-sm underline flex justify-center">
            create account first!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
