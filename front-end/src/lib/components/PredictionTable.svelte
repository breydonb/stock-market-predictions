<script lang="ts">
    import type { PredictionResponse } from "$lib/types/PredictionResponse";

    export let res: PredictionResponse | null = null;
</script>

{#if res}
        <table>
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Timestamp</th>
                    <th>Closing Price Prediction Value</th>
                </tr>
            </thead>
            <tbody>
                {#each res.predictions as data (data.timestamp)}
                    <tr>
                        <td>{data.ticker}</td>
                        <td>{data.timestamp}</td>
                        <td class="p-3">${data.predicted_value.toFixed(2)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <p>R^2 Coefficient: {res.r_squared}</p>
{:else}
    <p class="error">No prediction data available</p>
{/if}