import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import CoinContextProvider from './context/CoinContext.jsx'
import Coin from './pages/CoinPage/Coin.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      
      {
        path: "/coin/:coinId",
        element: <Coin />
      }
    ]
  },

  {
    path: "/signup",
    element: <Signup />
  },
  
  {
    path: "/login",
    element: <Login />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoinContextProvider>
      
      <RouterProvider router={appRouter} />
    </CoinContextProvider>
  </StrictMode>,
)
