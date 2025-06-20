<script lang="ts">
    import { springApiClient, fastApiClient } from "$lib/api";
    import type { PredictionResponse } from "$lib/types/PredictionResponse";
    import type { StockPrice } from "$lib/types/StockPrice";
    // import { Logger } from "$lib/utils/Logger";

    let ticker = "";
    let loading = false;
    let data: StockPrice[] | null = null;
    let predictionData: PredictionResponse | null = null;

    // const logger = new Logger();

    async function handleChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        ticker = target.value;
        if (ticker) {
            await Promise.all([
                fetchTableByTicker(),
                fetchPredictionByTicker()
            ]);
        } else {
            data = null;
            predictionData = null;
        }
    }

    async function fetchTableByTicker() {
        loading = true;
        data = await springApiClient.fetchStockByTicker(ticker)
        loading = false;
    }

    async function fetchPredictionByTicker() {
        loading = true;
        predictionData = await fastApiClient.getPredictionsByTicker(ticker);
        loading = false;
    }

    $: predictedValues = predictionData?.predictions ?? [];
</script>

<div>
    <label for="tickerDropdown">Select a Ticker:</label>
    <select name="tickers" id="ticker" on:change={handleChange} disabled={loading}>
        <option value="">Select</option>
        <option value="AAPL">Apple</option>
        <option value="TMUS">T-Mobile</option>
    </select>
</div>

{#if loading}
    <p>Loading...</p>
{:else if !data || !predictedValues}
    <p class="error">Please select a stock by ticker on select menu</p>
{:else}
    <div>
        <table>
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Closing Price</th>
                    <th>Volume</th>
                    <th>Opening Price</th>
                    <th>High Price</th>
                    <th>Low Price</th>
                    <th>Time Stamp</th>
                </tr>
            </thead>
            <tbody>
                {#each data as stock}
                    <tr class="p-3">
                        <td>{stock.ticker}</td>
                        <td>${stock.closingPrice.toFixed(2)}</td>
                        <td>{stock.volume}</td>
                        <td>${stock.openPrice.toFixed(2)}</td>
                        <td>${stock.highPrice.toFixed(2)}</td>
                        <td>${stock.lowPrice.toFixed(2)}</td>
                        <td>{stock.timestamp}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Ticker</th>
                        <th>Timestamp</th>
                        <th>Closing Price Prediction Value</th>
                    </tr>
                </thead>
                <tbody>
                    {#each predictedValues as item}
                        <tr>
                            <td>{item.ticker}</td>
                            <td>{item.timestamp}</td>
                            <td class="p-3">${item.predicted_value.toFixed(2)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <p>R^2 Coefficient: {predictionData?.r_squared}</p>
        </div>
{/if}
