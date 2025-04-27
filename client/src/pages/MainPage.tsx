import { useEffect, useState } from "react";
import api from "../api";

interface Coin {
  id: string;
  symbol: string;
  current_price: string;
}

export default function MainPage() {
  const [coins, setCoins] = useState<Coin[]>([]);

  const fetchCoins = async () => {
    try {
      const response = await api.get("/");
      const data = response.data;
      console.log("data : ", data);
      setCoins(data);
    } catch (error) {
      console.error("error fetching coins", error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
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
  );
}
