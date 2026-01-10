import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link, useNavigate } from 'react-router-dom'


function Home() {

    const { allCoin, currency, token, setToken } = useContext(CoinContext)

    const [displayData, setDisplayData] = useState([])

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    const filterDataHandler = (searchTeaxt) => {
         const filter = allCoin.filter((item) => {
            return item.name.toLowerCase().includes(searchTeaxt.toLowerCase());
         })
         setDisplayData(filter)
    }

    const searchCoinHandler = (e) => {
        
            if(token === null)
            {
                alert("You not logged-In, please login first")
                navigate("/login")
                return
            }
        
        const value = e.target.value
        setSearch(value)
        filterDataHandler(value)

    }

    const tokenHandler = (id) => {
        if(token === null)
        {
             alert("You not logged-In, please login first")
                navigate("/login")
                return
        }
        else
        {
            navigate(`/coin/${id}`)
                return
        }
    } 

    useEffect(() => {
        setDisplayData(allCoin)
    }, [allCoin])

     useEffect(() => {
        setToken(localStorage.getItem("token"))
    }, [])


    console.log(allCoin)
    return (
        <div>
            <div>
                <div className='text-center mt-14 font-bold text-6xl leading-18'>
                    <p className='flex flex-col'>Largest <span>Crypto Marketplace</span> </p>
                </div>

                <div className='text-center mt-5 leading-6'>
                    <p className='flex flex-col text-lg'>welcome to world's largest cryptocurrency marketplace. <span>Sign up to explore more about cryptos</span></p>
                </div>

                <div className=' mt-8 bg-white text-black max-w-142.5 mx-auto rounded-sm'>
                    <input
                     onChange={searchCoinHandler}
                     className='px-5 py-3 w-142.5 outline-none' type="text" placeholder='Search cryptos...' />
                </div>

                <div>
                    <div className='grid grid-cols-[1fr_2.5fr_1fr_1.5fr_2fr] bg-blue-950 max-w-225 m-auto mt-12 px-7 gap-5 border-b border-gray-400 rounded-t-2xl py-4 '>
                        <p>#</p>
                        <p>Coins</p>
                        <p>Price</p>
                        <p className='text-center'>24H Change</p>
                        <p className='text-right'>Market Cap</p>
                    </div>

                    {
                        displayData.slice(0, 10).map((item) => {
                            return <div onClick={() => tokenHandler(item.id)} className='grid grid-cols-[1fr_2.5fr_1fr_1.5fr_2fr] bg-blue-950 max-w-225 m-auto  px-7  border-b border-gray-500 rounded-t-2xl py-3 items-center last:border-none cursor-pointer'>
                                <p>{item.market_cap_rank}</p>
                                <div className='flex items-center gap-3'>
                                    <img className='w-10' src={item.image} alt="" />
                                    <p>{item.name} - {item.symbol}</p>
                                </div>

                                <p>{currency.symbol} {item.current_price.toLocaleString()}</p>

                                {
                                   Math.floor(item.price_change_percentage_24h * 100) / 100 > 0 ? <p className='text-center text-green-400'>{Math.floor(item.price_change_percentage_24h * 100) / 100}</p> : <p className='text-center text-red-600'>{Math.floor(item.price_change_percentage_24h * 100) / 100}</p> 
                                }
                                
                                <p className='text-right'>{currency.symbol} {item.market_cap.toLocaleString()}</p>

                            </div>
                        })

                    }
                </div>

            </div>
        </div>
    )
}

export default Home
