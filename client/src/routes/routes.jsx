import CreatePassword from "../pages/CreateNewPassword"
import ForgotPassword from "../pages/ForgotPassword"
import Home from "../pages/Home"
import MainPage from "../pages/MainPage"
import OTPverification from "../pages/OtpVerification"
import Signin from "../pages/Signin"
import Signup from "../pages/SignupPage"
import UpdatePassword from "../pages/dropdownMenu/UpdatePassword"
import UpdateProfile from "../pages/dropdownMenu/UpdateProfile"
import ViewProfile from "../pages/dropdownMenu/Viewprofile"
import LogoutPage from "../pages/dropdownMenu/logoutPage"
import AllproductsDetails from "../pages/product/AllProductDetails"
import ViewproductData from "../pages/product/ViewproductData"
import AddProduct from "../pages/product/addProduct"
import Allproducts from "../pages/product/allProducts"
import UpdateProduct from "../pages/product/updateProduct"

const routes = [
    {
        path: '/',
        component: Signup,
        exact: true,
        name: "Home",
        auth:false
      },
      {
        path: '/otp-verify',
        component: OTPverification,
        name: "otp-verification",
        auth:false
      },
      {
        path: '/forgot-password',
        component: ForgotPassword,
        name: "forgot-password",
        auth:false
      },
      {
        path: '/update-password',
        component: CreatePassword,
        name: "create-password",
        auth:false
      },
      {
        path: '/login',
        component: Signin,
        name: "login",
        auth:false
      },
      {
        path: '/home',
        component: MainPage,
        name: "home",
        auth:true
      },
      {
        path: '/home/',
        component: Home,
        name: "home-page",
        auth:true
      },
      {
        path: '/home/profile',
        component: ViewProfile,
        name: "profile",
        auth:true
      },
      {
        path: '/home/update-profile',
        component: UpdateProfile,
        name: "update-profile",
        auth:true
      },
      {
        path: '/home/update-password',
        component: UpdatePassword,
        name: "update-password",
        auth:true
      },
      {
        path: '/home/product',
        component: AddProduct,
        name: "add-product",
        auth:true
      },
      {
        path: '/home/view-product',
        component: ViewproductData,
        name: "view-products",
        auth:true
      },
      {
        path: '/home/update-product',
        component: UpdateProduct,
        name: "update-products",
        auth:true
      },
      {
        path: '/home/all-products',
        component: Allproducts,
        name: "all-products",
        auth:true
      },
      {
        path: '/home/all-products-data',
        component: AllproductsDetails,
        name: "all-products-data",
        auth:true
      },
      {
        path: '/home/logout',
        component: LogoutPage,
        name: "logout",
        auth:true
      },
]

export default routes