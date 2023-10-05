
// import SideBar from "./Sidebar";
import axios from "axios";
import { useContext, useEffect, useState , } from "react";
import { useLocation,Link } from "react-router-dom";
import {UserName} from '../providers/ContextProvider'
import React from 'react';
import { Button, Dropdown } from 'antd';

const items = [
  {
    key: '1',
    label: (
        <Link to={"/update-profile"}>Update profile</Link>
    ),
  },
  {
    key: '2',
    label: (
        <Link to={"/"}>Update password</Link>

    ),
  },
  {
    key: '3',
    label: (
        <Link to={"/"}>Signout</Link>
    ),
  },
];
const DropdownMenu = ({user}) => (
  <>
    <Dropdown
    className="hover:border hover:border-gray-200"
      menu={{
        items,
      }}
      placement="bottom"
      arrow
    >
      <Button className="h-full w-full hover:outline-none hover:border-gray-50 border">
        <img class="h-full w-full rounded-2xl" src="https://plus.unsplash.com/premium_photo-1661302846246-e8faef18255d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRtaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" alt="image comes here.." />  
      </Button>
    </Dropdown>
    
  </>
);


function Header({user}) {

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
                    <div className='h-3/4  rounded-md flex justify-center'>
                        <DropdownMenu user={user}/>
                        </div>
                </div>
            </div>
        </div>

    )
}

function SideBar(props) {
    const { name , setName } = useContext(UserName)
    console.log("nameeeeeeeeeeeeeeeeeee"+name.name)
    return (
        <div className='col-start-1 h-screen fixed rounded-md bg-slate-500'>
            <div className='grid grid-cols-1 mt-2'>
                <div className='h-32 mx-2 my-1 rounded-lg'>
                    <div className='grid grid-cols-4 b'>
                        <div className='col-start-1 my-2 mx-1 h-10'>
                            <img src="https://plus.unsplash.com/premium_photo-1661302846246-e8faef18255d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRtaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" className='w-11 h-11 rounded-3xl' alt="Image comes here" />
                        </div>
                        <div className='col-start-2 col-span-3 text-lg font-extrabold flex items-center mt-4'>
                            <h2 className='text-gray-400'>{name}</h2>
                        </div>
                    </div>
                    <div className='mx-1 text-gray-400'>
                        {/* {props.user.email} */}user
                    </div>
                </div>
                <div className='bg-white h-10 mx-2 my-1 rounded-lg flex items-center justify-start'>
                    <h2 className='text-lg ms-2 text-slate-400'>about us</h2>
                </div>
                <div className='bg-white h-10 mx-2 my-1 rounded-lg flex items-center justify-start'>
                    <h2 className='text-lg ms-2 text-slate-400'>Settings</h2>
                </div>
                <div className='bg-white h-10 mx-2 my-1 rounded-lg flex items-center justify-start'>
                    <h2 className='text-lg ms-2 text-slate-400'>Help</h2>
                </div>
            </div>
        </div>
    )
}

function Home() {
    const [loginUser, setLoginUser] = useState({})
    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        debugger
        axios.get(`http://localhost:3000/user-profile?email=${data.id}`)
            .then(response => {
                setLoginUser(() => response.data)
            })
            .catch((error) => {
                alert("fall inside catch")
                console.log(error);
            })
    }, [setLoginUser])

    const username = loginUser.username
    const userDetails = {
        username: username,
        email: loginUser.email
    }
    console.log(userDetails)
    return (
        <>
            <Header user={userDetails}/>
            <div className="grid grid-cols-6 mx-2">
                <SideBar />
            </div>
        </>
    )
}

export default Home