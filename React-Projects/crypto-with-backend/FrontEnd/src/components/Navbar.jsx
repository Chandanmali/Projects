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
        else {
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
        <div className="border-b border-gray-500">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-20 py-4">

                {/* Logo */}
                <div
                    onClick={tokenHandler}
                    className="flex justify-center md:justify-start"
                >
                    <img className="cursor-pointer md:w-42 w-40 py-1" src={Logo} alt="logo" />
                </div>

                {/* Nav Links (hidden on small screens) */}
                <ul
                    onClick={tokenHandler}
                    className="hidden md:flex gap-10 font-semibold cursor-pointer justify-center"
                >
                    <Link to="/">Home</Link>
                    <li>Features</li>
                    <li>Pricing</li>
                    <li>Blog</li>
                </ul>

                {/* Right Section */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">

                    {/* Currency */}
                    <select
                        onChange={currencyHandler}
                        className="border-2 px-3 py-1 rounded-xl w-full md:w-auto"
                    >
                        <option className='text-black' value="usd">USD</option>
                        <option className='text-black' value="eur">EUR</option>
                        <option className='text-black' value="inr">INR</option>
                    </select>

                    {/* Auth Buttons */}
                    {userName ? (
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button className="text-black bg-white px-4 py-2 rounded-full font-semibold text-sm text-center">
                                Welcome! {userName}
                            </button>

                            <button
                                onClick={handleLogout}
                                className="text-black bg-white px-4 py-2 rounded-full font-semibold text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-black bg-white px-4 py-2 rounded-full font-semibold text-sm"
                            >
                                Sign Up
                            </button>

                            <button
                                onClick={() => navigate('/login')}
                                className="text-black bg-white px-4 py-2 rounded-full font-semibold text-sm"
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )


}

export default Navbar
