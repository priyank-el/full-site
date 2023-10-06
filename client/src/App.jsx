import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/SignupPage'
import Signin from './pages/Signin'
import MainPage from './pages/MainPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/home" element={<MainPage />} />
        </Routes>
      </BrowserRouter> 
    </>
  )
}

export default App