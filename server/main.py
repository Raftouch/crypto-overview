import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price"

@app.get("/")
async def get_coins():
    async with httpx.AsyncClient() as client:
        response = await client.get(BINANCE_API_URL)
        return response.json()


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)

