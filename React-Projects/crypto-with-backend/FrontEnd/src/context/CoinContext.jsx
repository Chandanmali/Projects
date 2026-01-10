import {  createContext, useEffect, useState } from "react";

export const CoinContext = createContext()

const CoinContextProvider = (props) => {

    const [allCoin, setAllCoin] = useState([])
    const [token, setToken] = useState(null)
    
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoinData = async() => {
        const apiFetch = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`)
        const json = await apiFetch.json()
        console.log(json)
        setAllCoin(json)
    }

    useEffect(() => {
        fetchAllCoinData()
        
    }, [currency])
    

    const contextValue = {
        allCoin, currency, setCurrency, token, setToken
    }

    return(
        <CoinContext.Provider value={contextValue}>
          {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider