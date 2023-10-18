import { Button, Form, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useLocation, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserName } from "../../providers/ContextProvider"
import {toast} from 'react-toastify'

function UpdateProduct() {

    const [product, setProduct] = useState({})
    const [loading,setLoading] = useState(true)
    const [selectedFile, setSelectedFile] = useState();
    const [form] = Form.useForm()
    const location = useLocation()
    const { setFile } = useContext(UserName)

    const navigate = useNavigate()

    const productId = location.state.id;

    const objectData = {
        name: product.productName,
        description: product.productDescription
    }

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    useEffect(() => {
        const fetchProductData = async () => {
            debugger
            try {
                const { data } = await axios.get(`http://localhost:3000/product-data?productId=${productId}`)

                if (data) {
                    setProduct(data)
                    setLoading(false)
                }
            
            } catch (error) {
                console.log(error);
            }
        }
        fetchProductData()
    }, [setProduct])

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
            const { data } = await axios.put(`http://localhost:3000/update-product?id=${productId}`, formdata,
                {
                    params: {
                        name: name.trim(),
                        description: description.trim()
                    }
                })

                if (data.message) {
                    toast.success("product updated")
                    navigate("/home/all-products")
                }
        } catch (error) {
            console.log(error);
        }
    }

    if(loading){
        return <h1>Loading..</h1>
    }

    return (
        <div className='flex justify-center'>

            <div className='w-3/4'>
                <h1 className="text-4xl font-extrabold mb-32">
                    Update product
                </h1>
                <Form
                    form={form}
                    onFinish={onFinish}
                    encType='multipart/form-data'
                    initialValues={objectData}
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
                            Update product
                        </Button>
                        <Button
                            htmlType="button"
                            onClick={(e) => navigate("/home/all-products")}
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

export default UpdateProduct