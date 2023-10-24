import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserName } from "../../providers/ContextProvider"
import { redirect, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { Input, Modal, Select, Table } from "antd"
import Signin from "../Signin"

function Allproducts() {

    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('')
    const [Id, setId] = useState('')
    const { loginUser } = useContext(UserName)

    // const isImage = ['.gif','.jpg','.jpeg','.png']; //you can add more
    // const   isVideo =['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4'] // you can add more extention  

    function checkURL(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                debugger
                const { data } = await axios.get(`http://localhost:3000/all-products?userId=${loginUser._id}&value=${value.trim()}`,{
                    headers:{
                        Authorization:localStorage.getItem("JwtToken")
                    }
                })

                if (data) {
                    setProducts(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                if (error.response.data.error.message) {
                    navigate('/login')
                }
            }
        }
        fetchAllProducts()
    }, [setProducts, loading, value])


    const handletextChange = (e) => {

        const data = e.target.value;

        setValue(data)
    }

    const deleteData = async () => {
        try {
            debugger
            const { data } = await axios.delete(`http://localhost:3000/delete-product?id=${Id}`)

            if (data.message) {
                toast.success("product deleted")
            }
        } catch (error) {
            console.log(error);
        }
    }
    const isOk = () => {
        setIsModalOpen(false)
        deleteData()
        setLoading(true)
    }

    if (loading) {
        return (
            <h1 className="text-center">Loading...</h1>
        )
    }

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'productDescription',
            key: 'description',
        },
        {
            title: 'Image/Video',
            dataIndex: 'image',
            key: 'image',
            render: (text) => 
            checkURL(text) 
            ?
            <img src={`http://localhost:3000/images/${text}`} className="h-14 w-14 rounded-lg" ></img>
            :
            <video src={`http://localhost:3000/images/${text}`} autoPlay className="h-14 w-14 rounded-lg"></video>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_) => (
                <Select
                    aria-readonly
                    className="outline-none"
                    placeholder='...'
                    optionFilterProp="children"
                    onChange={(value) => {

                        if (value == 'edit') {

                            navigate("/home/update-product", {
                                state: {
                                    id: _._id
                                }
                            })
                        }

                        if (value == 'delete') {
                            debugger
                            setIsModalOpen(true)
                            setId(_._id)
                        }

                        if (value == 'view') {

                            const viewProduct = async () => {
                                debugger
                                const { data } = await axios.get(`http://localhost:3000/product-data?productId=${_._id}`)

                                if (data) {
                                    navigate("/home/view-product", {
                                        state: {
                                            data: _
                                        }
                                    })
                                }
                            }
                            viewProduct()
                        }
                    }}
                    style={{ width: "80px" }}
                    options={[
                        {
                            value: 'edit',
                            label: 'Edit',
                        },
                        {
                            value: 'delete',
                            label: 'Delete',
                        },
                        {
                            value: 'view',
                            label: 'View',
                        },
                    ]}
                />
            ),
        },
    ]

    const datasource = products.map((product, index) => {
        return {
            ...product,
            key: index + 1
        }
    })

    return (
        <>
            {datasource.length > 0
                ? <h1 className="text-center text-4xl font-extrabold mb-5">
                    All products
                </h1>
                : <h1 className="text-center font-extrabold text-3xl">No products found</h1>
            }
            {
                
                <div>
                    <Modal
                        style={{
                            height: "800px"
                        }}
                        open={isModalOpen}
                        onHide={() => {
                            setIsModalOpen(false)
                            setLoading(true)
                        }}
                        dialogClassName="modal-90w"
                        aria-labelledby="contained-modal-title-vcenter"
                        onOk={isOk}
                        okButtonProps={{ style: { backgroundColor: "green" } }}
                        onCancel={() => {
                            setIsModalOpen(false)
                            setLoading(true)
                        }
                        }
                        cancelButtonProps={{
                            style: {
                                backgroundColor: "red",
                                color: "white"
                            }
                        }}
                    >
                        <p className="text-3xl text-center">Are you sure ?</p>
                        <p className="text-center">You want to delete post?</p>
                    </Modal>

                </div>
            }
            <div className="w-80">
                Search :<Input className="me-96" onChange={handletextChange} />
            </div>
            <Table
                dataSource={datasource}
                columns={columns}
                pagination={{
                    pageSize: 1,
                    total: products.length,
                    defaultCurrent: 1
                }}
            />
        </>

    )
}

export default Allproducts