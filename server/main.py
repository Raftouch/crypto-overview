import uvicorn
from fastapi import FastAPI
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price"
API_URL = "https://api.coingecko.com/api/v3/coins/markets"


async def get_coins_data(currency: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_URL}?vs_currency={currency}")
        if response.status_code != 200:
            return {"error": "Error fetching coins"}
        return response.json()


@app.get("/coins")
async def get_coins(
    vs_currency: str = Query("usd", alias="currency"),
    search: str = ""
):
    try:
        coins = await get_coins_data(vs_currency)

        if not isinstance(coins, list):
            return {"error": "Unexpected format"}
        
        if search:
            coins = [
                coin for coin in coins
                if search.lower() in coin["name"].lower() or search.lower() in coin["symbol"].lower()
            ]

        sorted_coins = sorted(coins, key=lambda coin: coin["symbol"])
        return sorted_coins
    except TypeError as error:
        return {"error": "Wrong format"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

