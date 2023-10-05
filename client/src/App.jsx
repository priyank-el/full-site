import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/SignupPage';
import Signin from './pages/Signin';
import UpdateProfile from './pages/dropdownMenu/updateProfile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
