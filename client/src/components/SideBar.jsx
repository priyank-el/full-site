import { useContext } from "react"
import { UserName } from '../providers/ContextProvider'
import {Link} from 'react-router-dom'

function SideBar() {
    const { loginUser } = useContext(UserName)
    return (

        <div className='grid grid-cols-1 mt-2 w-52'>
            <div className='h-32 mx-2 my-1 rounded-lg'>
                <div className='grid grid-cols-4 b'>
                    <div className='col-start-1 my-2 mx-1 h-10'>
                        {/* <img src="https://plus.unsplash.com/premium_photo-1661302846246-e8faef18255d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRtaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" className='w-11 h-11 rounded-3xl' alt="Image comes here" /> */}
                    </div>
                    <div className='col-start-2 col-span-3 text-lg font-extrabold flex items-center mt-4'>
                        <h2 className='text-gray-400'>
                            {/* {loginUser.username} */}
                        </h2>
                    </div>
                </div>
                <div className='mx-1 text-gray-400'>
                    {/* {loginUser.email} */}
                </div>
            </div>
            <Link to={"/home/product"} className='bg-white h-10 mx-2 my-1 rounded-lg flex items-center justify-start cursor-pointer'>
                <h2 className='text-lg ms-2 text-slate-400'>Add Product</h2>
            </Link>
            <Link to={"/home/all-products-data"} className='bg-white h-10 mx-2 my-1 rounded-lg flex items-center justify-start'>
                <h2 className='text-lg ms-2 text-slate-400'>All-product-Details</h2>
            </Link>
            <Link to={"/home/all-products"} className='bg-white h-10 mx-2 my-1 rounded-lg flex items-center justify-start cursor-pointer'>
                <h2 className='text-lg ms-2 text-slate-400'>All Products</h2>
            </Link>
            <div className='bg-white h-10 mx-2 my-1 rounded-lg flex items-center justify-start'>
                <h2 className='text-lg ms-2 text-slate-400'>Help</h2>
            </div>
        </div>
    )
}

export default SideBar