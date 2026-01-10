import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Signup() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState()
    const [email, setEmail] = useState("")

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchSignupApi = async () => {

        if (!name || !password || !email) {
            alert("Please enter required fields")
            return
        }

        try {
            const response = await axios.post(`${backendUrl}/signup`, {
                name: name,
                password: password,
                email: email
            })
            toast.success("Successfully registered")
            setTimeout(() => {
                navigate("/login");
            }, 3000)
        }
        catch (err) {
            if (err.response?.status === 409) {
                toast.error("You already have an account. Please login 🔐")
                
            } else {
                toast.error("Something went wrong. Please try again later.")

            }
        }

    }

    return (
        <div>
            <div className='min-h-screen bg-linear-to-b from-[#0b004e] via-[#1d152f] to-[#002834] text-white'>
                <div className='pt-15 md:pt-10'>
                    <p className='text-3xl md:text-5xl font-bold text-center '>Sign-Up</p>
                </div>

                <div className='border max-w-[300px] md:max-w-162 m-auto py-8 md:py-15 px-5 rounded-2xl mt-10'>
                    <div className='flex flex-col gap-7 px-5'>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className='py-2 px-5 shadow-2xl border border-gray-400 rounded-lg outline-none'
                            type="text"
                            name='name'
                            placeholder='Enter your name'
                        />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className='py-2 px-5 shadow-2xl border border-gray-400 rounded-lg outline-none'
                            type="text"
                            placeholder='Enter Password'
                        />

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className='py-2 px-5 shadow-2xl border border-gray-400 rounded-lg outline-none'
                            type="text"
                            placeholder='Enter email-address'
                        />

                        <div className='flex flex-col gap-5 md:mt-5'>

                            <button onClick={fetchSignupApi} className='bg-blue-800 py-2 md:py-2 rounded-lg font-semibold md:text-xl text-sm  cursor-pointer '>sign-up</button>
                            <button onClick={() => navigate("/login")} className='bg-blue-800 py-2 px-2 rounded-lg font-semibold md:text-xl text-sm cursor-pointer'>Already sign-up? Login</button>
                        </div>
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

export default Signup
