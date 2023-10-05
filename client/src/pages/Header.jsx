import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from '../pages/Home'

function Header() {

    return (
            <div className='grid grid-cols-6 gap-2 px-2 py-1 shadow-gray-600 sticky top-0'>
                <div className='bg-slate-500 h-16 items-center text-center rounded-md col-start-1 col-span-6  grid grid-cols-12 gap-2 px-2 py-1 shadow-gray-600'>
                    <div className='h-3/4 text-center rounded-md col-start-1 flex items-center text-gray-400 text-2xl font-extrabold col-span-3'>
                        <h1>
                            Learning By Doing
                        </h1>
                    </div>
                    <div className='h-3/4 rounded-md col-start-4 col-span-3 items-center justify-center text-gray-400 grid grid-cols-3 gap-1'>
                        {/* <div className='bg-white h-full rounded-md items-center justify-center flex text-gray-400'>
                            <Link to="/home">Home</Link>
                        </div>
                        <div className='bg-white h-full rounded-md items-center justify-center flex text-gray-400'>
                            <Link to="/about">About</Link>
                        </div>
                        <div className='bg-white h-full rounded-md items-center justify-center flex text-gray-400'>
                            <Link to="/contact-us">contact us</Link>
                        </div> */}
                    </div>
                    <div className=' h-14 text-center rounded-md items-center justify-center col-start-8 col-span-3 grid grid-cols-3'>
                    </div>
                    <div className='h-14 text-center rounded-md items-center justify-center col-start-12 grid grid-cols-2'>
                        <div className='h-3/4 bg-white rounded-md flex justify-center'>
                            <img class="rounded-full py-1 px-1 w-3/4 h-full" src="https://plus.unsplash.com/premium_photo-1661302846246-e8faef18255d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRtaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="image comes here.." />
                            
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default Header