import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserName } from "../../providers/ContextProvider"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { Modal, Select, Table } from "antd"

function Allproducts() {

    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [Id, setId] = useState('')
    const { loginUser } = useContext(UserName)

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                debugger
                const { data } = await axios.get(`http://localhost:3000/all-products?userId=${loginUser._id}`)

                if (data) {
                    setProducts(data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllProducts()
    }, [setProducts, loading])

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
        setPermission(true)
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
            title: 'Description',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={`http://localhost:3000/images/${text}`} className="h-14 w-14 rounded-lg" ></img>
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
            <Table 
                dataSource={datasource} 
                columns={columns} 
                pagination={{
                    pageSize:1,
                    total:products.length,
                    defaultCurrent:1
                }}
            />
        </>

    )
}

export default Allproducts