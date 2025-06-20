package com.example.spring_boot_api.services;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.spring_boot_api.entity.StockPrice;
import com.example.spring_boot_api.repository.StockPriceRepository;

@Service
public class StockPriceServiceImpl implements StockPriceService{

    public final StockPriceRepository stockPriceRepository;

    // Pull the stock price repository to use globally defined operations
    public StockPriceServiceImpl(StockPriceRepository stockPriceRepository) {
        this.stockPriceRepository = stockPriceRepository;
    }

    @Override
    public List<StockPrice> findAll() {
        return stockPriceRepository.findAll();
    }

    @Override
    public List<StockPrice> findByTicker(String ticker) {
        return stockPriceRepository.findByIdTicker(ticker);
    }

    @Override
    public List<StockPrice> findByTickerAndDateRange(String ticker, OffsetDateTime start, OffsetDateTime end) {
        return stockPriceRepository.findByIdTickerAndIdTimestampBetween(ticker, start, end);
    }

}
