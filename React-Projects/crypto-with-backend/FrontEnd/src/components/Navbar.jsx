import React, { useContext, useEffect, useState } from 'react'
import Logo from "../assets/logo.png"
import { CoinContext } from '../context/CoinContext'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Navbar() {

    const { currency, setCurrency, setToken, token } = useContext(CoinContext)
    const navigate = useNavigate()
    const [userName, setuserName] = useState(null)


    const currencyHandler = (e) => {
        switch (e.target.value) {
            case "usd": {
                setCurrency({ name: "usd", symbol: "$" })
                break;
            }

            case "eur": {
                setCurrency({ name: "eur", symbol: "€" })
                break;

            }

            case "inr": {
                setCurrency({ name: "inr", symbol: "₹" })
                break;
            }

            default: {
                setCurrency({ name: "usd", symbol: "$" })
                break;
            }
        }
    }

    const tokenHandler = () => {
        if (token === null) {
            alert("You not logged-In, please login first")
            navigate("/login")
            return
        }
        else
        {
            navigate('/')
            return
        }
    }

    useEffect(() => {
        setuserName(localStorage.getItem("userName"))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        setuserName(null)
        setToken(null)
        toast.success("Logged out successfully 👋")
    }

    return (
        <div>

            <div className='flex items-center justify-between px-25 border-b-2 border-gray-500 py-5'>
                <div onClick={tokenHandler}>
                    <img className='cursor-pointer' src={Logo} alt="" />
                </div>
                <div>

                    <ul onClick={tokenHandler} className='flex gap-10 font-semibold cursor-pointer'>
                        <Link to={"/"}>Home</Link>
                        <li>Features</li>
                        <li>Pricing</li>
                        <li>Blog</li>
                    </ul>


                </div>
                <div  className='flex gap-10'>
                    <select onChange={currencyHandler} className='border-2 px-2 rounded-xl'>
                        <option className='text-black' value="usd">USD</option>
                        <option className='text-black' value="eur">ERU</option>
                        <option className='text-black' value="inr">INR</option>
                    </select>

                    <div className=''>
                        {
                            userName ? (<div className='flex gap-5'>
                                <button className='text-black bg-white px-4 py-2 rounded-full font-semibold text-sm cursor-pointer'>Wecome! {userName}</button>

                                <button onClick={handleLogout} className='text-black bg-white px-4 py-2 rounded-full font-semibold text-sm cursor-pointer'>Logout</button>
                            </div>)
                                :
                                (<div className='flex gap-5'>
                                    <button onClick={() => navigate('/signup')} className='text-black bg-white px-4 py-2 rounded-full font-semibold text-sm cursor-pointer'>Sign Up</button>

                                    <button onClick={() => navigate("/login")} className='text-black bg-white px-4 py-2 rounded-full font-semibold text-sm cursor-pointer'>Login</button>
                                </div>)
                        }

                    </div>
                </div>


            </div>
            {/* Toast container only once */}
            <div className='text-black font-bold'>

                <ToastContainer position="top-right" autoClose={3000} />
            </div>
        </div>
    )
}

export default Navbar
