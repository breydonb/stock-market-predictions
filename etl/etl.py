import os
from dotenv import load_dotenv
import psycopg2
import requests
import datetime
from psycopg2.extras import execute_values
from psycopg2 import OperationalError, Error
import concurrent.futures

load_dotenv(dotenv_path="/home/etl/.env")

API_URL = os.getenv("POLYGON_API_URL")
API_KEY = os.getenv("POLYGON_API_KEY")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_NAME = os.getenv("DB_NAME")
# APPL, "MSFT", "TSLA", "AMZN", "GOOGL"
TICKERS = ["AAPL", "TMUS"]

def database_connection ():
    try: 
        return psycopg2.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            port=DB_PORT,
            host="172.28.0.4",
            connect_timeout=5
        )
    except OperationalError as e:
        print(f"Operational error: Could not connect to the database.\n{e}")
    except Error as e:
        print(f"Database error occured: {e}")
    except Exception as e:
        print(f"An unexpected error has occured: {e}")
        
def fetch_ohlcv(ticker, from_date, to_date):
    url =  f"https://api.polygon.io/v2/aggs/ticker/{ticker}/range/1/day/{from_date}/{to_date}?adjusted=true&sort=asc&limit=30&apiKey={API_KEY}"
    res = requests.get(url)
    if res.status_code == 200:
        return res.json().get("results", [])
    else:
        print(f"Error {res.status_code}: {res.text}")
        return []

def extract_all(from_date, to_date):
    stock_data = {}
    def fetch_for_ticker(ticker):
        return ticker, fetch_ohlcv(ticker, from_date, to_date)
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        results = executor.map(fetch_for_ticker, TICKERS)
        for ticker, data in results:
            stock_data[ticker] = data
    return stock_data

conn = database_connection()
cur = conn.cursor()

stock_data = extract_all('2025-05-01', '2025-05-31')

create_table_query = """
    CREATE TABLE IF NOT EXISTS stock_prices (
        ticker VARCHAR(10) NOT NULL,
        closing_price NUMERIC(10, 2) NOT NULL,
        volume INTEGER NOT NULL,
        open_price NUMERIC(10, 2) NOT NULL,
        high_price NUMERIC(10, 2) NOT NULL,
        low_price NUMERIC(10, 2) NOT NULL,
        timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (ticker, timestamp)
    );
"""
cur.execute(create_table_query)

# Inserts into stock_prices table while being safe from SQL Injection with %s
insert_query = """
    INSERT INTO stock_prices (ticker, closing_price, volume, open_price, high_price, low_price, timestamp)
        VALUES %s
            ON CONFLICT (ticker, timestamp) DO NOTHING
"""
batch_insert = []
for ticker, output_list in stock_data.items():
    for day_data in output_list:
        timestamp = datetime.datetime.fromtimestamp(day_data.get("t") / 1000.0)
        batch_insert.append((
            ticker,
            day_data.get("c"), 
            day_data.get("v"), 
            day_data.get("o"), 
            day_data.get("h"), 
            day_data.get("l"), 
            timestamp
        ))
execute_values(cur, insert_query, batch_insert)
conn.commit()
cur.close()
conn.close()
