import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{fontFamily: "Outfit, san-serif"}} className='min-h-screen bg-linear-to-b from-[#0b004e] via-[#1d152f] to-[#002834] text-white'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
