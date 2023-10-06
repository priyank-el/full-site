import { Route, Routes } from "react-router-dom"
import SideBar from "../components/SideBar"
import Header from "./Header"
import Home from "./Home"
import ViewProfile from "./dropdownMenu/Viewprofile"
import UpdatePassword from "./dropdownMenu/UpdatePassword"

function MainPage() {
    return (

        <>
            <Header />
            <div className="grid grid-cols-6 mx-2">
                <div className='col-start-1 h-screen fixed rounded-md bg-slate-500'>
                    <SideBar />
                </div>
                <div className="col-start-2 col-span-5 m-3">
                    <Routes>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route path="/" element={<ViewProfile />} />
                        <Route path="/update-password" element={<UpdatePassword />} />
                    </Routes>
                </div>
            </div>
        </>

    )
}

export default MainPage