import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'
import { Input } from "antd"


function AllproductsDetails() {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [hasMore,setHasMore] = useState(true)
    const [page, setPage] = useState(2)
    const [value, setValue] = useState('');

    // const isImage = ['.gif','.jpg','.jpeg','.png']; //you can add more
    // const   isVideo =['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4'] // you can add more extention  


    function checkURL(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    const handletextChange = (e) => {

        const data = e.target.value;

        setValue(data)
    }

    const fetchAllProducts = async () => {
        try {
            debugger
            const { data } = await axios.get(`http://localhost:3000/products?value=${value}&_page=1&_limit=6`, {
                headers: {
                    Authorization: localStorage.getItem("JwtToken")
                }
            })
           
                setProducts(data)
                setLoading(false)
                setHasMore(true)
            
        } catch (error) {
            console.log(error)
            if (error.response.data.error.message) {
                navigate('/login')
            }
        }
    }

    const fetchMoreData = async () => {
        const { data } = await axios.get(`http://localhost:3000/products?value=${value}&_page=${page}&_limit=6`, {
                headers: {
                    Authorization: localStorage.getItem("JwtToken")
                }
            })
            data.length > 0 
            ? setHasMore(true)
            : setHasMore(false)

                setProducts((prev) => [...prev,...data])
                setPage((prev)=>prev + 1)
            
    }

    useEffect(() => {
        fetchAllProducts()
    }, [value])

    return (
        <>      
             <div className="w-80">
                Search :<Input className="me-96 bg-transparent border border-slate-500 focus:border focus:border-slate-500 hover:border hover:border-slate-500" onChange={handletextChange}/>
            </div>
            <div>
            <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreData}
                    hasMore={hasMore} // Replace with a condition based on your data source
                    loader={<p className="text-center text-2xl ">Loading...</p>}
                >
            <div id="main-div" className="grid grid-cols-3 gap-10">
                    {
                        products.length !== 0 && products.map(product => (

                            <div id="card-content">
                                <div className="border border-gray-300 shadow shadow-gray-400 rounded-xl m-2" key={product._id}>
                                    {
                                        checkURL(product.image)
                                        ?
                                        <img src={`http://localhost:3000/images/${product.image}`} className="h-52 w-full m-auto rounded-md" alt="product come here" />
                                        :
                                        <img className="h-52 w-full m-auto rounded-md" alt="product come here" src={`http://localhost:3000/images/${product.thumbnail}` }></img>
                                    }
                                    <p className="text-center mt-2 text-2xl font-extrabold">{product.productName}</p>
                                    <p className="text-center mt-2">{product.productDescription}</p>
                                </div>

                            </div>
                        ))
                    }
            </div>
                </InfiniteScroll>
            </div>
                

        </>

    )
}

export default AllproductsDetails