import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserName } from "../../providers/ContextProvider"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import { Modal, Select } from "antd"
import Pagepagination from "../../components/Pagination"

function Allproducts() {

    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [Id, setId] = useState('')
    const { loginUser } = useContext(UserName)

    let id = 1

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

    return (
        <>
            {products.length > 0
                ? <h1 className="text-center text-4xl font-extrabold mb-5">
                    All products
                </h1>
                : <h1 className="text-center font-extrabold text-3xl">No products found</h1>
            }
            <div className="grid grid-cols-1">
                <table className="h-full table-fixed border border-black text-center">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>product-name</th>
                            <th>product-description</th>
                            <td>Image</td>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product._id} className="border border-black ">
                                    <td>{id++}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.productDescription}</td>
                                    <td>
                                        <div className="h-16 w-16 flex items-center justify-center mx-auto">
                                            <img className="h-14 rounded-md w-14" src={`http://localhost:3000/images/${product.image}`} alt="image" />
                                        </div>
                                    </td>
                                    <td>
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
                                            <Select
                                                aria-readonly
                                                className="outline-none"
                                                placeholder='...'
                                                optionFilterProp="children"
                                                onChange={(value) => {

                                                    if (value == 'edit') {

                                                        navigate("/home/update-product", {
                                                            state: {
                                                                id: product._id
                                                            }
                                                        })
                                                    }

                                                    if (value == 'delete') {
                                                        debugger
                                                        setIsModalOpen(true)
                                                        setId(product._id)
                                                    }

                                                    if (value == 'view') {

                                                        const viewProduct = async () => {
                                                            debugger
                                                            const { data } = await axios.get(`http://localhost:3000/product-data?productId=${product._id}`)

                                                            if (data) {
                                                                navigate("/home/view-product", {
                                                                    state: {
                                                                        data: data
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
                                        </div>
                                    </td>
                                    {/* <td><button className="bg-gray-500 text-white px-4 py-2 mt-1 mb-1 rounded-lg" onClick={(e) => {
                                        e.preventDefault()

                                        navigate("/home/update-product", {
                                            state: {
                                                id: product._id
                                            }
                                        })
                                    }}>Edit</button></td>
                                    <td><button className="bg-red-700 text-white px-4 py-2 mt-1 mb-1 rounded-lg" onClick={() => {

                                        const deleteData = async () => {
                                            try {
                                                debugger
                                                const { data } = await axios.delete(`http://localhost:3000/delete-product?id=${product._id}`)

                                                if (data.message) {
                                                    toast.success("product deleted")
                                                }
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }
                                        deleteData()
                                        setLoading(true)
                                    }}>Delete</button></td>
                                    <td><button className="bg-green-600 text-white px-4 py-2 mt-1 mb-1 rounded-lg" onClick={() => {
                                        const viewProduct = async () => {
                                            debugger
                                            const { data } = await axios.get(`http://localhost:3000/product-data?productId=${product._id}`)

                                            if (data) {
                                                navigate("/home/view-product",{
                                                    state:{
                                                        data:data
                                                    }
                                                })
                                            }
                                        }
                                        viewProduct()
                                    }}>View</button></td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <Pagepagination />
        </>

    )
}

export default Allproducts