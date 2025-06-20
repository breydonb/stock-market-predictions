package com.example.spring_boot_api.entity;

import java.io.Serializable;
import java.time.OffsetDateTime;
import java.util.Objects;

public class StockPriceId implements Serializable {
    private String ticker;

    private OffsetDateTime timestamp;

    public StockPriceId() {
        System.out.println("Not enough arguments were provided");
    }

    public StockPriceId(String ticker, OffsetDateTime timestamp) {
        this.ticker = ticker;
        this.timestamp = timestamp;
    }

    public String getTicker() { return ticker; }
    public void setTicker(String ticker) { this.ticker = ticker; }

    public OffsetDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(OffsetDateTime timestamp) { this.timestamp = timestamp; }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if(!(o instanceof StockPriceId)) return false;
        StockPriceId that = (StockPriceId) o;
        return Objects.equals(ticker, that.ticker) && Objects.equals(timestamp, that.timestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ticker, timestamp);
    }
}
