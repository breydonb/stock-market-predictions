package com.example.spring_boot_api.entity;

import java.time.OffsetDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "stock_prices")
public class StockPrice {
    @EmbeddedId
    private StockPriceId id;

    @Column(name="closing_price")
    private Double closingPrice;

    @Column(name="volume")
    private Integer volume;

    @Column(name = "open_price")
    private Double openPrice;

    @Column(name = "high_price")
    private Double highPrice;

    @Column(name = "low_price")
    private Double lowPrice;

    public StockPrice() {}

    public StockPriceId getId() { return id; }
    public void setId(StockPriceId id) { this.id = id; }

    public Double getClosingPrice() { return closingPrice; }
    public void setClosingPrice(Double closingPrice) { this.closingPrice = closingPrice; }

    public Integer getVolume() { return volume; }
    public void setVolume(Integer volume) { this.volume = volume; }

    public Double getOpenPrice() { return openPrice; }
    public void setOpenPrice(Double openPrice) { this.openPrice = openPrice; }

    public Double getHighPrice() { return highPrice; }
    public void setHighPrice(Double highPrice) { this.highPrice = highPrice; }

    public Double getLowPrice() { return lowPrice; }
    public void setLowPrice(Double lowPrice) { this.lowPrice = lowPrice; }

    public String getTicker() {
        return id != null ? id.getTicker() : null;
    }

    public OffsetDateTime getTimestamp() {
        return id != null ? id.getTimestamp() : null;
    }

}
