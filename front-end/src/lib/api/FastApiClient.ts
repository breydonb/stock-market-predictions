import { ML_API_URL } from "$lib";
import type { IFastApiClient } from "$lib/types/IFastApiClient";
import type { ILogger } from "$lib/types/ILogger";
import type { PredictionResponse } from "$lib/types/PredictionResponse";

export class FastApiClient implements IFastApiClient {
    private baseUrl = ML_API_URL;
    private logger: ILogger;

    constructor(logger: ILogger) {
        this.logger = logger;
    }

    async getPredictionsByTicker(ticker: string): Promise<PredictionResponse | null> {
        try {
            const res = await fetch(`${this.baseUrl}/${ticker}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ticker })
            });
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            const data = await res.json();
            return data as PredictionResponse;
        } catch (e) {
            this.logger.error(`Unexpected error: ${e}`);
            return null;
        }
    }
    async getRSquaredByTicker(ticker: string): Promise<number | null> {
        try {
            const res = await fetch(`${this.baseUrl}/${ticker}`);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            const data = await res.json() as PredictionResponse;
            return data.r_squared;
        } catch (e) {
            this.logger.error(`Unexpected Error ${e}`);
            return null;
        }
    }

}