import { Navigate, Outlet } from "react-router-dom"
import Header from "../pages/Header"
import SideBar from "../components/SideBar"


export default function AuthVerify() {
    return (localStorage.getItem("JwtToken")
        ?
        <>
            <Header />
            <div className="grid grid-cols-6 mx-2">
                <div className="col-start-1 h-screen fixed rounded-md bg-slate-500">
                    <SideBar />
                </div>
                <div className="col-start-2 col-span-5 m-3 overflow-hidden">

                    <Outlet />
                </div>
            </div>
        </>
        : <Navigate to='/login' />)
}