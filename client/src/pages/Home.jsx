
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
    const [loginUser,setLoginUser] = useState({})
    const location = useLocation();
    const data = location.state;

    useEffect(()=>{
        debugger
        axios.get(`http://localhost:3000/user-profile?email=${data.id}`)
        .then( response => {
            setLoginUser(() => response.data)
        })
        .catch((error)=>{
            alert("fall inside catch")
            console.log(error);
        })
    },[setLoginUser])

    return (
        <>
            <h1
                className="text-5xl font-extrabold text-gray-600 text-center">
                Well come to home page LearningByDoing
            </h1>
            <div className="w-screen h-64  flex justify-center">
                <div className=" w-96 border rounded-xl grid grid-cols-1 justify-center items-center shadow-md shadow-slate-200 mt-10">
                    <p className="ms-3 h-5 p-0.5">Username:{ loginUser.username ? loginUser.username : "NULL" }</p>
                    <p className="ms-3 h-5 p-0.5">email:{ loginUser.email ? loginUser.email : "NULL"}</p>
                    <p className="ms-3 h-5 p-0.5">createdAt:{ loginUser.createdAt ? loginUser.createdAt : "NULL"}</p>
                    <p className="ms-3 h-5 p-0.5">updatedAt:{ loginUser.updatedAt ? loginUser.updatedAt : "NULL"}</p>
                </div>
            </div>

        </>

    )
}

export default Home