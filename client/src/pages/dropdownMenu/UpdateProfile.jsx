import React, { useContext,useState } from 'react'
import { UserName } from '../../providers/ContextProvider'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
		setIsFilePicked(true);
  }
  
  // const handleSubmission = (e) => {
  //   const formData = new FormData();
  //   formData.append('File', selectedFile);
  //   console.log(selectedFile);
  // }
  
  const navigate = useNavigate()
  const { loginUser, setLoginUser } = useContext(UserName)
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
    formData.append('File', selectedFile);
    console.log(selectedFile);

    console.log(values);
    const { username, email, firstname, lastname, mobile } = values
    debugger

    const res = await axios.post("http://localhost:3000/upload",formData)
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
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input className='w-8/12 ms-5' />
        </Form.Item>
        <Form.Item>
          <Form.Item name="firstname" label="Firstname" rules={[{ required: true }]}>
            <Input className='w-2/3' />
          </Form.Item>
          <Form.Item name="lastname" label="Lastname" rules={[{ required: true }]}>
            <Input className='w-2/3' />
          </Form.Item>
          <Form.Item name="mobile" label="Mobile no" rules={[{ required: true }]}>
            <Input className='w-2/3' />
          </Form.Item>
          <Form.Item>
            <div class="mb-3">
              <input
                onChange={changeHandler}
                className="relative m-0 block w-8/12 min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile"
                name="image" />
            </div>
          </Form.Item>
          <Button 
            // onClick={handleSubmission}
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
