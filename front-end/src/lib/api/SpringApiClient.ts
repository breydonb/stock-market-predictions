import { SPRING_API_URL } from "$lib";
import type { ILogger } from "$lib/types/ILogger";
import type { ISpringApiClient } from "$lib/types/ISpringApiClient";
import type { StockPrice } from "$lib/types/StockPrice";

export class SpringApiClient implements ISpringApiClient {
    private baseUrl = SPRING_API_URL;
    private logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }
    async fetchStockTickers(): Promise<string | null> {
        try {
            const res = await fetch(`${this.baseUrl}/tickers`)
            if (!res.ok) {
                this.logger.error(`Error fetching data: ${res.status} ${res.statusText}`);
                return null;
            }
            const data = await res.json();
            return data;
        } catch (e) {
            this.logger.error("Unexpected error: ", e);
            return null;
        }
    }
    async fetchStockByTicker(ticker: string): Promise<StockPrice[] | null> {
        try {
            const res = await fetch(`${this.baseUrl}/${ticker}`);
            if (!res.ok) {
                this.logger.error(`Error fetching data: ${res.status} ${res.statusText}`);
                return null;
            }
            const data = await res.json();
            return data as StockPrice[];
    
        } catch (e) {
            this.logger.error("Unexpected error: ", e)
            return null;
        }
    }

}