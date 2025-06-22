<script lang="ts">
    import { springApiClient, fastApiClient } from "$lib/api";
    import type { PredictionResponse } from "$lib/types/PredictionResponse";
    import type { StockPrice } from "$lib/types/StockPrice";
    import DarkModeButton from "$lib/components/DarkModeButton.svelte";
    import PredictionTable from "$lib/components/PredictionTable.svelte";
    import StockTable from "$lib/components/StockTable.svelte";
    import SelectTickerDropdown from "$lib/components/SelectTickerDropdown.svelte";
    import Navigation from "$lib/components/Navigation.svelte";

    let ticker = "";
    let loading = false;
    let data: StockPrice[] | null = null;
    let predictionData: PredictionResponse | null = null;

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

<Navigation
    links = {[
        { name: "Home", href: "/"},
        { name: "Predictions", href: "/predictions"},
        { name: "About", href: "/about"}
    ]}
>
<DarkModeButton slot="dark-mode-button" />
</Navigation>

<div class="flex flex-column items-center justify-center w-full px-2">
    <div>
        <SelectTickerDropdown
            loading = { loading }
            selected = { ticker }
            onChange = { handleChange }
        />
    </div>
</div>

<h1 class="text-center text-2xl ">{ ticker ? `Stock Data For ${ticker}` : ``}</h1>
<div class="text-primary">
    test
</div>
{#if loading}
    <p>Loading...</p>
{:else if !data || !predictedValues.length}
    <p class="p-4">Please select a stock by ticker on select menu</p>
{:else}
    <StockTable { data } />
    <PredictionTable res={ predictionData } />
{/if}

