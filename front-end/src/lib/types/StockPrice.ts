export interface StockPrice {
    ticker: string;
    timestamp: string;
    closingPrice: number;
    volume: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
}