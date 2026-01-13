import React, { useContext, useEffect, useState } from 'react'
import { data, useParams } from 'react-router-dom'
import Shimmer from '../../components/Shimmer';
import Loadder from '../../components/Loadder';
import { Coincontext } from '../../context/Coincotext';
import LineChart from '../../components/LineChart';

function Coin() {

  const { coinId } = useParams();
  const [coinData, setCoinData] = useState()
  

  const {currency} = useContext(Coincontext);
  const [coinHistory, setCoinHistory] = useState()

  const coinDataHandler = async () => {
    const options = { method: 'GET', headers: { 'x-cg-demo-api-key': 'CG-LnK3sNUcqhXaaB8ph3tTfPXa' } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCoinData(data);
      })
      .catch(err => console.error(err));
  }



  const fetchHistoryDataHandler = async() => {

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
    coinDataHandler()
    fetchHistoryDataHandler()
  }, [currency])

  console.log(coinData)

  return (
    <div>
      <div className='pt-18 pb-14 flex justify-center m-auto'>
        {
          coinData && coinHistory ? <div>
          <img className='w-32 m-auto mb-5' src={coinData.image.large} alt="" />
          <p className='text-white text-5xl font-semibold'>{coinData.name} ({coinData.symbol.toUpperCase()})</p>
        </div> : <Loadder />
        }
        
      </div>

      <div className='max-w-[850px] m-auto h-[320px] '>
        <LineChart coinHistory={coinHistory}/>
      </div>

      <div className='mt-15'>
        <div className='max-w-[850px] m-auto '>
          <ul className='text-white border-b border-gray-500 flex justify-between py-2'>
            <li>Crypto Market Rank</li>
            <li>{coinData?.market_cap_rank}</li>
          </ul>
          
          <ul className='text-white border-b border-gray-500 flex justify-between py-2'>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData?.market_data?.current_price[currency.name]?.toLocaleString()}</li>
          </ul>
          
          <ul className='text-white border-b border-gray-500 flex justify-between py-2'>
            <li>Market cap</li>
            <li>{currency.symbol} {coinData?.market_data?.market_cap[currency.name]?.toLocaleString()}</li>
          </ul>
          
          <ul className='text-white border-b border-gray-500 flex justify-between py-2'>
            <li>24 Hour high</li>
            <li>{currency.symbol} {coinData?.market_data?.high_24h[currency.name]?.toLocaleString()}</li>
          </ul>
          
          <ul className='text-white border-b border-gray-500 flex justify-between py-2'>
            <li>24 Hour low</li>
            <li>{currency.symbol} {coinData?.market_data?.low_24h[currency.name]?.toLocaleString()}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Coin
