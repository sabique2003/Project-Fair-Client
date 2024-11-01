import './App.css'
import './bootstrap.min.css'
import Allprojects from './Pages/Allprojects'
import Landing from './Pages/Landing'
import Dashboard from './Pages/Dashboard'
import Auth from './Pages/Auth'
import { ToastContainer } from 'react-toastify'
import Footer from './Components/Footer'
import 'react-toastify/dist/ReactToastify.css';
import { Route,Routes } from 'react-router-dom'
import { tokenContext } from './Context/TokenContext'
import { useContext } from 'react'

function App() {
  const {tokenStatus,setTokenStatus}=useContext(tokenContext)
  return (
    <>
    <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/dash' element={tokenContext?<Dashboard/>:<Auth/>}/>
        <Route path='/projects' element={tokenContext?<Allprojects/>:<Auth/>}/>
    </Routes>
    <ToastContainer/>
    <Footer/>
    </>
  )
}

export default App
