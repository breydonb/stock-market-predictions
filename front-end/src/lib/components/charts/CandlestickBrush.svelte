<script lang="ts">
    import { onMount, onDestroy, afterUpdate } from 'svelte';

    import * as echarts from 'echarts/core';
    import {
        ToolboxComponent,
        ToolboxComponentOption,
        TooltipComponent,
        TooltipComponentOption,
        GridComponent,
        GridComponentOption,
        VisualMapComponent,
        VisualMapComponentOption,
        LegendComponent,
        LegendComponentOption,
        BrushComponent,
        BrushComponentOption,
        DataZoomComponent,
        DataZoomComponentOption
        } from 'echarts/components';
    import {
        CandlestickChart,
        CandlestickSeriesOption,
        LineChart,
        LineSeriesOption,
        BarChart,
        BarSeriesOption
    } from 'echarts/charts';
    import { UniversalTransition } from 'echarts/features';
    import { CanvasRenderer } from 'echarts/renderers';
    import type { StockPrice } from '$lib/types/StockPrice';
    import { springApiClient } from '$lib/api';
    export let ticker: string;

    let chartEl: HTMLDivElement;

    let chart: echarts.ECharts;

    echarts.use([
        ToolboxComponent,
        TooltipComponent,
        GridComponent,
        VisualMapComponent,
        LegendComponent,
        BrushComponent,
        DataZoomComponent,
        CandlestickChart,
        LineChart,
        BarChart,
        CanvasRenderer,
        UniversalTransition
    ]);

    type EChartsOption = echarts.ComposeOption<
        | ToolboxComponentOption
        | TooltipComponentOption
        | GridComponentOption
        | VisualMapComponentOption
        | LegendComponentOption
        | BrushComponentOption
        | DataZoomComponentOption
        | CandlestickSeriesOption
        | LineSeriesOption
        | BarSeriesOption
    >

    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    const upColor = '#00da3c';
    const downColor = '#ec0000';

    async function drawChart() {
        const data: StockPrice[] | null = await springApiClient.fetchStockByTicker(ticker);
        if(!data) return;

        

        option = {
            animation: false,
            brush: [

            ],
            legend: {
                bottom: 10,
                left: 'center',
                data: [ticker, "MA5", "MA10", "MA20", "MA30"]
            },
            series: [
                {
                    name: ticker,
                    type: 'candlestick',
                    data: data.map(stock => [stock.openPrice, stock.closingPrice, stock.lowPrice, stock.highPrice])
                }
            ]
        }

        myChart.setOption(option);
    }


    $: if (data) {
        drawChart
    }
</script>