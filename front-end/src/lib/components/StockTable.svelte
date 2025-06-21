<script lang="ts">
    import type { StockPrice } from "$lib/types/StockPrice";

    export let data: StockPrice[] | null = null;
</script>


{#if data}
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
            {#each data as stock (stock.timestamp)}
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
{:else}
    <p class="error">No stock data available</p>
{/if}
