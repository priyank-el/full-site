
// import SideBar from "./Sidebar";
// import React from 'react';
// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
// import { UserName } from '../providers/ContextProvider'
// import Header from "./Header";
// import SideBar from "../components/SideBar";

// function Home() {
//     const { setLoginUser } = useContext(UserName)
//     const location = useLocation();
//     const data = location.state;
//     const token = localStorage.getItem("JwtToken")

//     const navigate = useNavigate()
//     useEffect(() => {
//         debugger
//         axios.get(`http://localhost:3000/user-profile?email=${data.id}`, {
//             headers: { Authorization: token }
//         })
//             .then(response => {
//                 if (!(localStorage.getItem("JwtToken"))) navigate("/login")
//                 setLoginUser(() => response.data)
//             })
//             .catch((error) => {
//                 if (!(error.response.data.token)) navigate("/login")
//                 alert("fall inside catch")
//                 console.log(error);
//             })
//     }, [setLoginUser])

//     return (
//         <>
//             <Header />
//             <div className="grid grid-cols-6 mx-2">
//                 <SideBar />
//                 {/* <Routes>
//                     <Route exact path='/' element={< ViewProfile />}></Route>
//                     <Route exact path='/profile' element={< ViewProfile />}></Route>
//                     <Route exact path='/update-profile' element={<UpdatePassword />}></Route>
//                 </Routes> */}
//             </div>
//         </>
//     )
// }

function Home(){
    return (
        <>
            <h1>I am Home Page</h1>
        </>
    )
}

export default Home