import type { StockPrice } from "./StockPrice";

export interface ISpringApiClient {
    fetchStockByTicker(ticker: string): Promise<StockPrice[] | null>;
    fetchStockTickers(): Promise<string | null>;
}