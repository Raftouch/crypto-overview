import { useEffect, useState } from "react";
import api from "../api";

interface Coin {
  symbol: string;
  price: string;
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
    <ul>
      {coins.map((coin, index) => (
        <li key={index}>
          {coin.symbol} : {coin.price}
        </li>
      ))}
    </ul>
  );
}
