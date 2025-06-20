import { SPRING_API_URL } from "$lib";
import type { StockPrice } from "$lib/types/StockPrice";

export async function fetchStockPrice(ticker: string): Promise<StockPrice[] | null> {
    try {
        const res = await fetch(`${SPRING_API_URL}/${ticker}`);
        if (!res.ok) {
            console.error(`Error fetching data: ${res.status} ${res.statusText}`);
            return null;
        }
        const data = await res.json();
        return data as StockPrice[];

    } catch (e) {
        console.error('Fetch failed: ', e);
        return null;
    }
}

