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

        if (token === null) {
            alert("You not logged-In, please login first")
            navigate("/login")
            return
        }

        const value = e.target.value
        setSearch(value)
        filterDataHandler(value)

    }

    const tokenHandler = (id) => {
        if (token === null) {
            alert("You not logged-In, please login first")
            navigate("/login")
            return
        }
        else {
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
        <div className="overflow-x-hidden">

            {/* Heading */}
            <div className="text-center mt-8 md:mt-14 font-bold text-4xl md:text-6xl">
                <p className="flex flex-col">
                    Largest <span>Crypto Marketplace</span>
                </p>
            </div>

            <div className="text-center mt-5">
                <p className="flex flex-col md:text-lg text-sm">
                    Welcome to world's largest cryptocurrency marketplace.
                    <span>Sign up to explore more about cryptos</span>
                </p>
            </div>

            {/* Search */}
            <div className="mt-8 bg-white text-black md:max-w-142.5 max-w-75 mx-auto rounded-sm px-2">
                <input
                    onChange={searchCoinHandler}
                    className="px-4 py-3 w-full outline-none"
                    type="text"
                    placeholder="Search cryptos..."
                />
            </div>

            {/* Desktop Table Header */}
            <div className="hidden md:grid grid-cols-[1fr_2.5fr_1fr_1.5fr_2fr] bg-blue-950 max-w-6xl mx-auto mt-12 px-7 gap-5 border-b border-gray-400 rounded-t-2xl py-4">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p className="text-center">24H Change</p>
                <p className="text-right">Market Cap</p>
            </div>

            {/* Desktop Table Rows */}
            <div className="hidden md:block">
                {displayData.slice(0, 10).map((item) => (
                    <div
                        key={item.id}
                        onClick={() => tokenHandler(item.id)}
                        className="grid grid-cols-[1fr_2.5fr_1fr_1.5fr_2fr] bg-blue-950 max-w-6xl mx-auto px-7 border-b border-gray-500 py-3 items-center cursor-pointer"
                    >
                        <p>{item.market_cap_rank}</p>

                        <div className="flex items-center gap-3">
                            <img className="w-8" src={item.image} alt="" />
                            <p>{item.name} - {item.symbol}</p>
                        </div>

                        <p>{currency.symbol}{item.current_price.toLocaleString()}</p>

                        <p className={`text-center ${item.price_change_percentage_24h > 0
                                ? "text-green-400"
                                : "text-red-600"
                            }`}>
                            {(Math.floor(item.price_change_percentage_24h * 100) / 100)}
                        </p>

                        <p className="text-right">
                            {currency.symbol}{item.market_cap.toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden px-4 mt-8 space-y-4">
                {displayData.slice(0, 10).map((item) => (
                    <div
                        key={item.id}
                        onClick={() => tokenHandler(item.id)}
                        className="bg-blue-950 p-4 rounded-xl cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            <img className="w-8" src={item.image} alt="" />
                            <p className="font-semibold">
                                {item.name} ({item.symbol})
                            </p>
                        </div>

                        <div className="flex justify-between mt-3 text-sm">
                            <span>Price:</span>
                            <span>{currency.symbol}{item.current_price.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>24H:</span>
                            <span className={
                                item.price_change_percentage_24h > 0
                                    ? "text-green-400"
                                    : "text-red-600"
                            }>
                                {(Math.floor(item.price_change_percentage_24h * 100) / 100)}%
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span>Market Cap:</span>
                            <span>{currency.symbol}{item.market_cap.toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )


}

export default Home
