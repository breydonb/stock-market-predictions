import psycopg2
from sklearn.linear_model import LinearRegression
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from fastapi import FastAPI, Path
from pydantic import BaseModel
import pandas as pd
import httpx
import logging


app = FastAPI()
logger = logging.getLogger("uvicorn")

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

class PredictionWithTimestamp(BaseModel):
    ticker: str
    timestamp: str
    predicted_value: float
class PredictionResponse(BaseModel):
    predictions: List[PredictionWithTimestamp]
    r_squared: float
    
class StockPriceData(BaseModel):
    ticker: str
    openPrice: float
    highPrice: float
    volume: float
    lowPrice: float
    closingPrice: float
    

def query_stock_data_by_ticker(ticker: str) -> pd.DataFrame:
    sql_query = "SELECT * FROM stock_data WHERE ticker= %s"
    conn = psycopg2.connect(
        host="localhost",
        database="postgres",
        user="postgres",
        password="admin",
        port="5432"
    )
    
    df = pd.read_sql_query(sql_query, conn, params=(ticker,))
    conn.close()
    
    if 'id' in df.columns:
        df.drop(columns=['id'], inplace=True)
    return df
        


async def get_stock_data(ticker: str) -> PredictionResponse:
    url = f"http://stock-market-prediction-spring-boot-api-1:8080/api/stock_data/{ticker}"
    async with httpx.AsyncClient() as client:
        res = await client.get(url)
        res.raise_for_status()
        res = res.json()
    
    if not isinstance(res, list):
        raise ValueError("Expected list of records from Spring Boot API")
    
    for entry in res:
        if "id" in entry:
            entry.update(entry["id"])
            del entry["id"]
            
    df = pd.DataFrame(res)
    logger.info(f"DataFrame columns: {df.columns.tolist()}")
    return df

@app.post("/predict/{ticker}", response_model=PredictionResponse)
async def predict(ticker: str = Path(...)):
    df = query_stock_data_by_ticker(ticker)
    x = df[['volume', 'openPrice', 'highPrice', 'lowPrice']]
    y = df['closingPrice']
    
    
    model = LinearRegression()
    model.fit(x, y)
    
    predictions = model.predict(x)
    r_squared = model.score(x, y)
    
    prediction_list = []
    
    for ts, pred in zip(df['timestamp'], predictions):
        prediction_list.append({
            "ticker": ticker,
            "timestamp": str(ts),
            "predicted_value": f"{round(pred, 2):.2f}"
        })
    
    return PredictionResponse(predictions=prediction_list, r_squared=r_squared)
