import { Route, Routes, useLocation,useNavigate } from "react-router-dom";
import { UserName } from "../providers/ContextProvider";
import { useContext,useEffect } from "react";
import SideBar from "../components/SideBar";
import Header from "./Header";
import Home from "./Home";
import ViewProfile from "./dropdownMenu/Viewprofile";
import UpdatePassword from "./dropdownMenu/UpdatePassword";
import axios from "axios";
import UpdateProfile from "./dropdownMenu/UpdateProfile";
import LogoutPage from "./dropdownMenu/logoutPage";

function MainPage() {
  const { setLoginUser } = useContext(UserName)
      const location = useLocation();
      const data = location.state;
      const token = localStorage.getItem("JwtToken")
  
      const navigate = useNavigate()
      useEffect(() => {
          
          axios.get(`http://localhost:3000/user-profile?email=${data.id}`, {
              headers: { Authorization: token }
          })
              .then(response => {
                  if (!(localStorage.getItem("JwtToken"))) navigate("/login")
                  setLoginUser(() => response.data)
                  console.log(response.data);
              })
              .catch((error) => {
                  if (!(error.response.data.token)) navigate("/login")
                  alert("fall inside catch")
              })
      }, [setLoginUser])
  return (
    <>
      <Header />
      <div className="grid grid-cols-6 mx-2">
        <div className="col-start-1 h-screen fixed rounded-md bg-slate-500">
          <SideBar />
        </div>
        <div className="col-start-2 col-span-5 m-3 overflow-hidden">
          {/* 
            Remove the routes for ViewProfile and UpdatePassword from here 
            and place them outside this Routes component in your main routing setup 
          */}
          <Routes>
            {/* Define your other routes here */}
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<ViewProfile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default MainPage;