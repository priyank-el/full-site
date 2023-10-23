import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import router from '../src/routes/routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthVerify from "./auth/Jwtauth";
import RouteVerify from "./auth/RoutesAuth";
import MainPage from "./pages/MainPage";
import ViewProfile from "./pages/dropdownMenu/Viewprofile";
import Home from "./pages/Home";
import { Header } from "antd/es/layout/layout";

function App() {

  return (
    <>
      <ToastContainer />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/otp-verify" element={<OTPverification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<CreatePassword />} />
          <Route path="/login" element={<Signin />} />
         
              <Route path="/home" element={<MainPage />}>
                <Route path="/home/" element={<Home />} />
                <Route path="/home/profile" element={<ViewProfile />} />
                <Route path="/home/update-profile" element={<UpdateProfile />} />
                <Route path="/home/update-password" element={<UpdatePassword />} />
                <Route path="/home/product" element={<AddProduct />} />
                <Route path="/home/view-product" element={<ViewproductData />} />
                <Route path="/home/update-product" element={<UpdateProduct />} />
                <Route path="/home/all-products" element={<Allproducts />} />
                <Route path="/home/logout" element={<LogoutPage />} />
              </Route>
            
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
      <Routes>
        {
          router.map(({ path, component: Comp, auth }, index) => {
            return (
              auth == true ?
              <>
                <Route key={index} path={path} element={<AuthVerify />}>
                    <Route path={path} element={<Comp />} />
                </Route>
              </>
                
                : auth == false ?
                  <Route key={index} path={path} element={<RouteVerify />}>
                    <Route path={path} element={<Comp />} />
                  </Route>
                  : <Route key={index} path={path} element={<Comp />} />
            )
          })
        }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
