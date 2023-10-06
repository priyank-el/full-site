import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/SignupPage";
import Signin from "./pages/Signin";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import ViewProfile from "./pages/dropdownMenu/Viewprofile";
import UpdatePassword from "./pages/dropdownMenu/UpdatePassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/home" element={<MainPage />}>
            <Route path="/home/" element={<Home />} />
            <Route path="/home/profile" element={<ViewProfile />} />
            <Route path="/home/update-password" element={<UpdatePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
