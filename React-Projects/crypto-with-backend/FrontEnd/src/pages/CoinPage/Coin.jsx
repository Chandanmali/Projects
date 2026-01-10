import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import Lodder from '../../components/Lodder'
import LineChart from '../../components/LineChart';

function Coin() {

    const { coinId } = useParams();
    const [coinData, setCoinData] = useState()
    const [coinHistory, setCoinHistory] = useState()

    const {currency, setCurrency} = useContext(CoinContext)

    const fetchCoinDataHandler = async () => {
        const fetchApi = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
        const json = await fetchApi.json()
        console.log(json)
        setCoinData(json)
    }

    const fetchHistoryDataHandler = async () => {

        const options = { method: 'GET', headers: { 'x-cg-demo-api-key': 'CG-LnK3sNUcqhXaaB8ph3tTfPXa' } };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCoinHistory(data);
            })
            .catch(err => console.error(err));

    }

    useEffect(() => {
        fetchCoinDataHandler()
        fetchHistoryDataHandler()
    }, [currency])

    return (
        <div>
            <div>
                {
                    coinData ? <div className='md:mt-20 mt-13'>
                        <img className='w-32 m-auto' src={coinData.image.large} alt="" />
                        <p className='text-5xl font-semibold text-center mt-7'>{coinData.name} ({coinData.symbol.toUpperCase()})</p>
                    </div> : <Lodder />
                }

            </div>

            <div className='mt-15 md:max-w-212.5 max-w-[350px] m-auto md:h-85 h-60'>
                <LineChart coinHistory={coinHistory} />
            </div>

            <div className='md:max-w-212.5 max-w-[350px] m-auto mt-20 text-sm'>
                <ul className='flex justify-between border-b border-gray-500 py-2'>
                    <li>Crypto Market Rank</li>
                    <li>{coinData?.market_cap_rank}</li>
                </ul>

                <ul className='flex justify-between border-b border-gray-500 py-2'>
                    <li>Current Price</li>
                    <li>{currency.symbol} {coinData?.market_data?.current_price[currency.name].toLocaleString()}</li>
                </ul>

                <ul className='flex justify-between border-b border-gray-500 py-2'>
                    <li>Market cap</li>
                    <li>{currency.symbol} {coinData?.market_data?.market_cap[currency.name].toLocaleString()}</li>
                </ul>

                <ul className='flex justify-between border-b border-gray-500 py-2'>
                    <li>24 Hour high</li>
                    <li>{currency.symbol} {coinData?.market_data?.high_24h[currency.name].toLocaleString()}</li>
                </ul>

                <ul className='flex justify-between border-b border-gray-500 py-2'>
                    <li>Crypto Market Rank</li>
                    <li>{currency.symbol} {coinData?.market_data?.low_24h[currency.name].toLocaleString()}</li>
                </ul>
            </div>
        </div>
    )
}

export default Coin
