package com.example.spring_boot_api.services;

import java.time.OffsetDateTime;
import java.util.List;

import com.example.spring_boot_api.entity.StockPrice;

public interface StockPriceService {
    List<StockPrice> findAll();
    List<StockPrice> findByTicker(String ticker);
    List<StockPrice> findByTickerAndDateRange(String ticker, OffsetDateTime start, OffsetDateTime end);
}
