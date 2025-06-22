<script lang="ts">
    import * as echarts from 'echarts/core';
    import { GridComponent, type GridComponentOption } from 'echarts/components';
    import { CandlestickChart, type CandlestickSeriesOption } from 'echarts/charts';
    import { CanvasRenderer } from 'echarts/renderers';
    import { fetchStockPrice } from '$lib/store/stockStore';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type { StockPrice } from '$lib/types/StockPrice';

    echarts.use([GridComponent, CandlestickChart, CanvasRenderer]);

    type EChartsOption = echarts.ComposeOption<
        GridComponentOption | CandlestickSeriesOption
    >;

    let chartDom: HTMLElement;
    let myChart: echarts.ECharts;

    export let ticker: string;

    const stockData = writable<{ loading: boolean, data: StockPrice[] | null, error: string | null}>({
        loading: false,
        error: null,
        data: null
    });

    const upColor = '#00da3c';
    const downColor = '#ec0000';

    onMount(async () => {
        chartDom = document.getElementById('main')!;
        myChart = echarts.init(chartDom);

        await loadDataAndDraw();
    });

    async function loadDataAndDraw(){
        stockData.set({ loading: true, error: null, data: null})
        try {
            const state = await fetchStockPrice(ticker);
            stockData.set({ loading: false, error: null, data: state.data});
            if (state.data) drawChart(state.data);
        } catch (e) {
            stockData.set({ loading: false, error: String(e), data: null});
        }
    }

    function drawChart(data: StockPrice[]){
        const formattedData = data.map(item => [
            item.openPrice,
            item.closingPrice,
            item.lowPrice,
            item.highPrice
        ]);
        const options: EChartsOption = {
            xAxis: {
                type: 'category',
                data: data.map((_, i) => i.toString())
            },
            yAxis: {
                scale: true,
                type: "value",
            },
            series: [
                {
                    type:"candlestick",
                    data: formattedData,
                    itemStyle: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upColor,
                        borderColor0: downColor
                    }
                }]
            };
        myChart.setOption(options);
    }
</script>

<div id='main' class="w-full h-[400px]"></div>