import { SPRING_API_URL } from "$lib";
import type { StockPrice } from "$lib/types/StockPrice";
import { createResourceStore } from "$lib/utils/createResourceStore";

export const stockStore = createResourceStore<StockPrice[]>();

async function fetchStockData(ticker: string): Promise<StockPrice[]> {
    const res = await fetch(`${SPRING_API_URL}/${ticker}`);
    if (!res.ok) throw new Error(`HTTP ERROR: ${res.status}`);
    return res.json();
}

export function fetchStockPrice(ticker: string) {
    return stockStore.fetchResource(ticker, () => fetchStockData(ticker));
}