import type { PredictionResponse } from "./PredictionResponse";

export interface IFastApiClient {
    getPredictionsByTicker(ticker: string): Promise<PredictionResponse | null>;
    getRSquaredByTicker(ticker: string): Promise<number | null>;
}