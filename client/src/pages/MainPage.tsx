import { useEffect, useState } from "react";
import api from "../api";

interface Coin {
  id: string;
  symbol: string;
  current_price: string;
}

export default function MainPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [currency, setCurrency] = useState("usd");

  const fetchCoins = async (currency: string) => {
    try {
      const response = await api.get(`/coins?currency=${currency}`);
      const data = response.data;
      console.log("data : ", data);
      setCoins(data);
    } catch (error) {
      console.error("error fetching coins", error);
    }
  };

  useEffect(() => {
    fetchCoins(currency);
  }, [currency]);

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency(event.target.value);
  };

  return (
    <div>
      <select
        className="mb-4 p-2 rounded"
        value={currency}
        onChange={handleCurrencyChange}
      >
        <option value="usd">USD - United States Dollar</option>
        <option value="eur">EUR - Euro</option>
        <option value="gbp">GBP - British Pound</option>
        <option value="jpy">JPY - Japanese Yen</option>
        <option value="btc">BTC - Bitcoin</option>
        <option value="eth">ETH - Ethereum</option>
      </select>

      <ul className="space-y-2 text-sm">
        {coins.map((coin) => (
          <li
            key={coin.id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300"
          >
            <span className="font-semibold text-gray-800">{coin.symbol}</span>
            <span className="text-gray-600">{coin.current_price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
