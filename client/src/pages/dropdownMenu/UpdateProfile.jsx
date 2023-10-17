import React, { useContext, useState } from 'react'
import { UserName } from '../../providers/ContextProvider'
import { Button, Form, Input } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateProfile = () => {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  }

  const navigate = useNavigate()
  const { loginUser, setLoginUser, setFile } = useContext(UserName)
  const [form] = Form.useForm()
  const [countryName,setSelectedCountry] = useState('')
  const [stateName,setSelectedState] = useState('')
  const [cityName,setSelectedCity] = useState('')
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

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
    if (selectedFile) setFile(URL.createObjectURL(selectedFile))
    

    const { username, email, firstname, lastname, mobile } = values

    debugger
    if (selectedFile) {
      await axios.post(`http://localhost:3000/upload?id=${loginUser._id}`, formData)
    }
    try {
      const response = await axios.put(`http://localhost:3000/update-profile?id=${loginUser._id}`, {
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        mobile: mobile,
        cityName,
        stateName,
        countryName
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
      if (error.response.data.error) toast.error(error.response.data.error)
      if (error.response.data.mobile) toast.error(error.response.data.mobile)
    }
  }

  const getAllCountries = async (e) => {
    e.preventDefault()

    try {
      debugger
      const { data } = await axios.get("http://localhost:3000/all-countries")

      if (data) setCountries(data)
    } catch (error) {
      console.log(error);
    }

  }

  const oncountryChangeHandler = async (e) => {
    e.preventDefault()

    setSelectedCountry(e.target.value)
    try {
      debugger
      const { data } = await axios.get(`http://localhost:3000/all-states?country=${e.target.value}`)

      if (data) setStates(data)
    } catch (error) {
      console.log(error);
    }
  }

  const onchangeState = async (e) => {
    e.preventDefault()
    setSelectedState(e.target.value)

    try {
      const { data } = await axios.get(`http://localhost:3000/all-cities?state=${e.target.value}`)

      if (data) setCities(data)
    } catch (error) {
      console.log(error);
    }
  }

  const oncityHandle = async (e) => {
    e.preventDefault()
    setSelectedCity(e.target.value)
  }

  return (
    <div className='border px-16 py-20 rounded-lg shadow-lg shadow-gray-500'>
      <h1 className='text-3xl mb-9 ms-3 font-extrabold'>Edit Profile </h1>

      <Form
        form={form}
        onFinish={onFinish}
        initialValues={objectData}
        encType='multipart/form-data'
        layout='vertical'
      >
        <Form.Item name="username" label="Username" rules={[{ required: true }]}>
          <Input className='w-2/3' />
        </Form.Item>
        <Form.Item name="email" label="Email Email" rules={[{ required: true }]}>
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
            <Input className='w-2/3' />
          </Form.Item>
          <label for="countries" >Country</label>
          <select id="countries" class="ms-2 mb-4 outline-none border border-gray-400 rounded-2xl p-2" name='country' onClick={getAllCountries} onChange={oncountryChangeHandler}>
            <option value="default" >select country</option>
            {
              countries.map(country => (
                <option key={country._id} value={country.name} name={country.name}>{country.name}</option>
              ))
            }
          </select>
          <label for="states" className='ms-2'>State</label>
          <select id="states" class="ms-2 mb-4 outline-none border border-gray-400 rounded-2xl p-2" onChange={onchangeState}>
            <option value="default" >select state</option>
            {
              states.map(state => (
                <option key={state._id} value={state.name} name={state.name}>{state.name}</option>
              ))
            }
          </select>
          <label for="states" className='ms-2'>City</label>
          <select id="cities" class="ms-2 mb-4 outline-none border border-gray-400 rounded-2xl p-2" onChange={oncityHandle}>
          <option value="default" >select city</option>
            {
              cities.map(city => (
                <option key={city._id} value={city.name} name={city.name}>{city.name}</option>
              ))
            }
          </select>
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
          <Button
            htmlType="button"
            onClick={(e) => navigate("/home/profile")}
            className='ms-5'
          >
            cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UpdateProfile;
