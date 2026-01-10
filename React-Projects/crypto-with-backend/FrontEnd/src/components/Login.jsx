import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function Login() {

    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [password, setPassword] = useState()
    const notify = () => toast("Wow so easy!");

    const fetchLoginApi = async () => {
        try {
            if (!name || !password) {

                toast.error("Please enter required fields")
                return
            }

            const response = await axios.post("http://localhost:3000/login", {
                name: name,
                password: password
            })
            console.log(response)

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("userName", name)
            toast.success("Login successful 🎉")
            setTimeout(() => {
                navigate("/")
            }, 3000)
        }

        catch (err) {
            toast.error("User not found ❌, Please create account")
        }
    }

    return (
        <div>
            <div className='min-h-screen bg-linear-to-b from-[#0b004e] via-[#1d152f] to-[#002834] text-white'>
                <div className='pt-10'>
                    <p className='text-5xl font-bold text-center '>Login</p>
                </div>

                <div className='border max-w-162 m-auto py-15 px-5 rounded-2xl mt-10'>
                    <div className='flex flex-col gap-7 px-5'>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            className='py-2 px-5 shadow-2xl border border-gray-400 rounded-lg outline-none'
                            type="text"
                            placeholder='Enter your name' />

                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className='py-2 px-5 shadow-2xl border border-gray-400 rounded-lg outline-none'
                            type="text"
                            placeholder='Enter Password' />

                        <div className='flex flex-col gap-5 mt-5 '>
                            <button onClick={fetchLoginApi} className='bg-blue-800 py-2 rounded-lg font-semibold text-xl cursor-pointer '>Login</button>
                            <button onClick={() => navigate('/signup')} className='bg-blue-800 py-2 rounded-lg font-semibold text-xl cursor-pointer'>create account</button>

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

export default Login
