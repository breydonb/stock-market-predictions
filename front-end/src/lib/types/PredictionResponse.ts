import type { PredictionWithTimestamp } from "./PredictionWithTimestamp";

export interface PredictionResponse{
    predictions: PredictionWithTimestamp[],
    r_squared: number
}