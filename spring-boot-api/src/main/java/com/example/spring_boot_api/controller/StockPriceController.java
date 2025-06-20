package com.example.spring_boot_api.controller;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.spring_boot_api.entity.StockPrice;
import com.example.spring_boot_api.services.StockPriceService;

@RestController
@RequestMapping("/api/stock_data")
public class StockPriceController{

    private final StockPriceService stockPriceService;
    public StockPriceController(StockPriceService stockPriceService) {
        this.stockPriceService = stockPriceService;
    }

    @GetMapping
    public List<StockPrice> getAllStockPrices() {
        return stockPriceService.findAll();
    }

    @GetMapping("/{ticker}")
    public List<StockPrice> getStockPricesByTicker(@PathVariable String ticker) { return stockPriceService.findByTicker(ticker); }
    @GetMapping("/{ticker}/range")
    public List<StockPrice> getStockPriceByTicketAndDateRange(
        @PathVariable String ticker, 
        @RequestParam String startDateString, 
        @RequestParam String endDateString
    )  {
        OffsetDateTime startDate = OffsetDateTime.parse(startDateString);
        OffsetDateTime endDate = OffsetDateTime.parse(endDateString);
        return stockPriceService.findByTickerAndDateRange(endDateString, startDate, endDate);
    }
}