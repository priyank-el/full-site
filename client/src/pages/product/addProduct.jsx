import { Button, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { UserName } from '../../providers/ContextProvider';
import { toast } from 'react-toastify';

function AddProduct() {

    const [form] = Form.useForm()
    const [selectedFile, setSelectedFile] = useState();

    const navigate = useNavigate()
    const { loginUser, setFile } = useContext(UserName)

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const onFinish = async (values) => {
        const {
            name,
            description
        } = values    
        
        const formdata = new FormData()
        formdata.append('image', selectedFile)
        if (selectedFile) setFile(URL.createObjectURL(selectedFile))
        
        try {
            debugger
            if(name.trim().length == 0 || description.trim().length == 0) {
                if(name.trim().length == 0) toast.error("whitespace not allow in name")
                if(description.trim().length == 0) toast.error("whitespace not allow in name description")        
            }else{
                const { data } = await axios.post(`http://localhost:3000/add-product?userId=${loginUser._id}`,formdata,{
                params:{
                    name:name.trim(),
                    description:description.trim()
                }
            })

            if (data) {
                toast.success("product added")
                navigate("/home")
            }
            }
            
        } catch (error) {
            // toast.error("product not added")
            if(error.response.data.error) toast.error(error.response.data.error) 
        }
    }

    return (
        <div className='flex justify-center'>

            <div className='w-3/4'>
                <h1 className="text-4xl font-extrabold mb-32">
                    Add product
                </h1>
                <Form
                    form={form}
                    onFinish={onFinish}
                    encType='multipart/form-data'
                    layout='vertical'
                >
                    <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                        <Input className='w-2/3' />
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
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea className='w-8/12' />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                        >
                            Add product
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

        </div>
    )
}

export default AddProduct