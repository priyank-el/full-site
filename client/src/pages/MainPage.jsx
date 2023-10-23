import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { UserName } from "../providers/ContextProvider";
import { useContext, useEffect } from "react";
import SideBar from "../components/SideBar";
import Header from "./Header";
import Home from "./Home";
import ViewProfile from "./dropdownMenu/Viewprofile";
import UpdatePassword from "./dropdownMenu/UpdatePassword";
import axios from "axios";
import UpdateProfile from "./dropdownMenu/UpdateProfile";
import LogoutPage from "./dropdownMenu/logoutPage";
import AddProduct from "./product/addProduct";
import Allproducts from "./product/allProducts";
import UpdateProduct from "./product/updateProduct";
import ViewproductData from "./product/ViewproductData";

function MainPage(props) {
  const { setLoginUser,setToken,token } = useContext(UserName)
  const location = useLocation();
  const dataObject = location.state;
  const authToken = localStorage.getItem("JwtToken")

  const navigate = useNavigate()
  useEffect(() => {

    const fetchData = async () => {
      try {
        debugger
        const { data } = await axios.get(`http://localhost:3000/user-profile?email=${dataObject.id}`, {
          headers: { Authorization: authToken }
        })

        if(data) setToken(authToken)
        console.log(token);
        setLoginUser(() => data)
      } catch (error) {
        navigate("/login")
      }
    }
    fetchData()
  }, [setLoginUser])
  return (
    <>
      
      {/* <div className="grid grid-cols-6 mx-2">
        <div className="col-start-1 h-screen fixed rounded-md bg-slate-500">
          <SideBar />
        </div> */}
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
            <Route path="/product" element={<AddProduct />} />
            <Route path="/view-product" element={<ViewproductData />} />
            <Route path="/update-product" element={<UpdateProduct />} />
            <Route path="/all-products" element={<Allproducts />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      {/* </div> */}
    </>
  );
}

export default MainPage;