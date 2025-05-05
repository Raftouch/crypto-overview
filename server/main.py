import uvicorn
from fastapi import FastAPI
from fastapi import Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
from typing import Literal
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

environment = os.getenv("ENVIRONMENT", "development")

if environment == "production":
    origins = [os.getenv("CORS_ORIGIN", "https://crypto-overview-today.netlify.app")]
else:
    origins = [os.getenv("CORS_ORIGIN", "http://localhost:5173")]

# origins = [
#     os.getenv("CORS_ORIGIN", "http://localhost:5173")
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

API_URL="https://api.coingecko.com/api/v3/coins/markets"

async def get_coins_data(currency: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{API_URL}?vs_currency={currency}")
        if response.status_code != 200:
            return {"error": "Error fetching coins"}
        return response.json()


@app.get("/coins")
async def get_coins(
    vs_currency: str = Query("usd", alias="currency"),
    sort_by: Literal["name", "current_price"] = "name",
    search: str = ""
):
    try:
        coins = await get_coins_data(vs_currency)

        if not isinstance(coins, list):
            return {"error": "Wrong format", "coins": []}
        
        if search:
            coins = [
                coin for coin in coins
                if search.lower() in coin["name"].lower() or search.lower() in coin["symbol"].lower()
            ]

        if sort_by == "name":
            sorted_coins = sorted(coins, key=lambda coin: coin["name"])
        elif sort_by == "current_price":
            sorted_coins = sorted(coins, key=lambda coin: float(coin["current_price"]), reverse=True)

        return {"coins": sorted_coins}
    except TypeError as error:
        return {"error": "Wrong format", "coins": []}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

