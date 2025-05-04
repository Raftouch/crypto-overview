import { useEffect, useState } from "react";
import api from "../api";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: string;
  image: string;
}

export default function MainPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState<"name" | "current_price">("name");

  const fetchCoins = async (
    currency: string,
    sortBy: "name" | "current_price"
  ) => {
    try {
      console.log(
        `Fetching coins with currency=${currency} and sort_by=${sortBy}`
      );

      const response = await api.get(
        `/coins?currency=${currency}&sort_by=${sortBy}`
      );
      const data = response.data;
      console.log("data : ", data);
      setCoins(data);
    } catch (error) {
      console.error("error fetching coins", error);
    }
  };

  useEffect(() => {
    fetchCoins(currency, sortBy);
  }, [currency, sortBy]);

  const handleCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrency(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as "name" | "current_price");
  };

  return (
    <div>
      <h1 className="text-center pb-5 font-bold">Crypto Today</h1>
      <div className="flex w-full">
        <select
          className="mb-4 p-2 border border-gray-400 rounded text-sm w-1/2"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="name">Sort by name</option>
          <option value="current_price">Sort by current price</option>
        </select>

        <select
          className="mb-4 p-2 border border-gray-400 rounded text-sm w-1/2"
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
      </div>

      <ul className="space-y-2 text-sm">
        {coins.map((coin) => (
          <li
            key={coin.id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300"
          >
            <div className="flex items-center">
              <img
                src={coin.image}
                alt={coin.symbol}
                className="w-6 h-6 mr-4"
              />
              <span className="font-semibold text-gray-800">{coin.name}</span>
            </div>
            <span className="text-gray-600">{coin.current_price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
