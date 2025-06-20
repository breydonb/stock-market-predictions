package com.example.spring_boot_api.repository;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.spring_boot_api.entity.StockPrice;
import com.example.spring_boot_api.entity.StockPriceId;

@Repository
public interface StockPriceRepository extends JpaRepository<StockPrice, StockPriceId>{
    List<StockPrice> findByIdTicker(String ticker);

    List<StockPrice> findByIdTickerAndIdTimestampBetween(String ticker, OffsetDateTime start, OffsetDateTime end);

    List<StockPrice> findByIdTimestamp(OffsetDateTime timestamp);

    StockPrice findFirstByIdTickerOrderByIdTimestampDesc(String ticker);

    List<StockPrice> findByVolumeGreaterThan(Integer volume);
    
}
