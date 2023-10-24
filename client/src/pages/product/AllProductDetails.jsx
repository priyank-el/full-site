import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Table } from "antd"
import InfiniteScroll from 'react-infinite-scroller'

function AllproductsDetails() {

    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    // const [value, setValue] = useState('')
    // const [Id, setId] = useState('')
    // const { loginUser } = useContext(UserName)

    // const isImage = ['.gif','.jpg','.jpeg','.png']; //you can add more
    // const   isVideo =['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4'] // you can add more extention  

    const [value, setValue] = useState('');
    const [page, setPage] = useState(1);

    function checkURL(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }
    useEffect(() => {
        fetchAllProducts()
    }, [page])

    const fetchAllProducts = async () => {
        try {
            debugger
            const { data } = await axios.get(`http://localhost:3000/products?value=${value}&_page=${page}&_limit=5`, {
                headers: {
                    Authorization: localStorage.getItem("JwtToken")
                }
            })
            if (data.length !== 0) {
                setProducts(data)
                setPage(page + 1)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            if (error.response.data.error.message) {
                navigate('/login')
            }
        }
    }
    
    // const handletextChange = (e) => {

    //     const data = e.target.value;

    //     setValue(data)
    // }

    // const deleteData = async () => {
    //     try {
    //         debugger
    //         const { data } = await axios.delete(`http://localhost:3000/delete-product?id=${Id}`)

    //         if (data.message) {
    //             toast.success("product deleted")
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // const isOk = () => {
    //     setIsModalOpen(false)
    //     deleteData()
    //     setLoading(true)
    // }

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
                    <video src={`http://localhost:3000/images/${text}`} className="h-14 w-14 rounded-lg"></video>
        }
    ]

    const datasource = products.map((product, index) => {
        if (product.thumbnail) {
            product.image = product.thumbnail
        }
        return {
            ...product,
            key: index + 1
        }
    })

    return (
        <>
            {/* {datasource.length > 0
                ? <h1 className="text-center text-4xl font-extrabold mb-5">
                    All Users products
                </h1>
                : <h1 className="text-center font-extrabold text-3xl">No products found</h1>
            }

            <div className="w-80">
                Search :<Input className="me-96" onChange={handletextChange} />
            </div> */}
            <InfiniteScroll
                style={{ margin: "10px" }}
                pageStart={0}
                loadMore={()=>fetchAllProducts}
                hasMore={true}
                loader={
                    <div className="loader" key={0}>
                        Loading ...
                    </div>
                }
            >
                <Table
                dataSource={datasource}
                columns={columns}
                pagination={false}
            />
            </InfiniteScroll>
        </>

    )
}

export default AllproductsDetails