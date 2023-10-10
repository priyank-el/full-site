import React, { useContext,useState } from 'react'
import { UserName } from '../../providers/ContextProvider'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateProfile = () => {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
  }

  const navigate = useNavigate()
  const { loginUser, setLoginUser ,setFile } = useContext(UserName)
  const [form] = Form.useForm()

  const objectData = {
    username: loginUser.username,
    firstname: loginUser.firstname,
    lastname: loginUser.lastname,
    mobile: loginUser.mobile,
    email: loginUser.email
  }

  const onFinish = async (values) => {

    const formData = new FormData();
    formData.append('image', selectedFile);
    console.log(selectedFile);
    setFile(URL.createObjectURL(selectedFile))

    const { username, email, firstname, lastname, mobile } = values

    debugger
    if(selectedFile) {
      const res = await axios.post(`http://localhost:3000/upload?id=${loginUser._id}`,formData)
    }
    try {
      const response = await axios.put(`http://localhost:3000/update-profile?id=${loginUser._id}`, {
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        mobile: mobile
      })

      const updateUser = {
        _id: loginUser._id,
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        password: loginUser.password,
        createdAt: loginUser.createdAt,
        updatedAt: loginUser.updatedAt
      }
  
      if (response.data) setLoginUser(updateUser)
      if (response.data.message) navigate("/home")
      toast.success(response.data.message)

    } catch (error) {
        console.log(error);
        if(error.response.data.error) toast.error(error.response.data.error)
    }
  }

  return (
    <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
      <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Edit Profile </h1>

      <Form
        form={form}
        onFinish={onFinish}
        initialValues={objectData}
        encType='multipart/form-data'
      >
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input className='w-2/3' />
        </Form.Item>
        <Form.Item name="email" label="Email Add" rules={[{ required: true }]}>
          <Input className='w-8/12' />
        </Form.Item>
        <Form.Item>
          <Form.Item name="firstname" label="Firstname" rules={[{ required: true }]}>
            <Input className='w-2/3' />
          </Form.Item>
          <Form.Item name="lastname" label="Lastname" rules={[{ required: true }]}>
            <Input className='w-2/3' />
          </Form.Item>
          <Form.Item name="mobile" label="Mobile no" rules={[{ required: true }]}>
            <Input className='w-2/3'/>
          </Form.Item>
          <Form.Item>
            <div class="mb-3">
              <input
                onChange={changeHandler}
                className="relative m-0 block w-8/12 min-w-0 flex-auto rounded border border-solid"
                type="file"
                id="formFile"
                name="image" />
            </div>
          </Form.Item>
          <Button 
            htmlType="submit"
            >
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateProfile;
