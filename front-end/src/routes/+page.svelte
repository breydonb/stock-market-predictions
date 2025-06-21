<script lang="ts">
    import { springApiClient, fastApiClient } from "$lib/api";
    import type { PredictionResponse } from "$lib/types/PredictionResponse";
    import type { StockPrice } from "$lib/types/StockPrice";
    import DarkModeButton from "$lib/components/DarkModeButton.svelte";
    import PredictionTable from "$lib/components/PredictionTable.svelte";
    import StockTable from "$lib/components/StockTable.svelte";
    // import { Logger } from "$lib/utils/Logger";

    let ticker = "";
    let loading = false;
    let data: StockPrice[] | null = null;
    let predictionData: PredictionResponse | null = null;

    // const logger = new Logger();

    async function handleChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        ticker = target.value;
        if (!ticker) {
            data = null;
            predictionData = null;
            return;
        }
        loading = true;
        [data, predictionData] = await Promise.all([
                fetchTableByTicker(),
                fetchPredictionByTicker()
            ]); 
        loading = false;
    }

    async function fetchTableByTicker() {
        loading = true;
        data = await springApiClient.fetchStockByTicker(ticker)
        loading = false;
        return data;
    }

    async function fetchPredictionByTicker() {
        loading = true;
        predictionData = await fastApiClient.getPredictionsByTicker(ticker);
        loading = false;
        return predictionData;
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
    <DarkModeButton />
</div>

{#if loading}
    <p>Loading...</p>
{:else if !data || !predictedValues.length}
    <p class="error">Please select a stock by ticker on select menu</p>
{:else}
    <StockTable { data } />
    <PredictionTable res={ predictionData } />
{/if}

