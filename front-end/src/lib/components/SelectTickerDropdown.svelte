<script lang="ts">
    export let loading: boolean = false;
    export let selected: string = "";
    export let onChange: ((event: Event) => void) = () => {};
</script>

<div class="flex items-center gap-4 px-4 py-4">
    <label for="tickerDropdown" >Select a Ticker:</label>
    <select 
        name="tickers" 
        id="ticker" 
        on:change={onChange} 
        disabled={loading}
        class="border rounded-lg px-2 py-1 bg-white text-black"
        bind:value={selected}
    >
        <option value="">Select</option>
        <option value="AAPL">Apple</option>
        <option value="TMUS">T-Mobile</option>
    </select>
</div>