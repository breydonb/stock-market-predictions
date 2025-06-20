package com.example.spring_boot_api.services;

import java.util.function.Supplier;

import org.springframework.stereotype.Service;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.DistributionSummary;
import io.micrometer.core.instrument.Gauge;
import io.micrometer.core.instrument.Timer;
import io.micrometer.prometheusmetrics.PrometheusMeterRegistry;

@Service
public class MetricsServiceImpl implements MetricsService {
    private final Timer dbQueryTimer;
    private final Counter apiCallCounter;
    private final DistributionSummary payloadSizeSummary;
    private volatile int activeUsers;
    private volatile long payloadSize;

    public MetricsServiceImpl(PrometheusMeterRegistry prometheusMeterRegistry) {
        this.dbQueryTimer = prometheusMeterRegistry.timer("db.query.time");
        this.apiCallCounter = prometheusMeterRegistry.counter("api.call.counter");
        this.activeUsers = 0;
        this.payloadSize = 0;
        this.payloadSizeSummary = DistributionSummary.builder("payload.size.histogram")
            .description("Histogram of payload sizes")
            .baseUnit("bytes")
            .publishPercentileHistogram(true)
            .register(prometheusMeterRegistry);
        Gauge.builder("active.users", this, MetricsServiceImpl::getActiveUsers)
            .register(prometheusMeterRegistry);
        Gauge.builder("payload.size", this, MetricsServiceImpl::getPayloadSize)
            .register(prometheusMeterRegistry);
    }

    public <T> T recordDbQueryTime(Supplier<T> query) {
        return dbQueryTimer.record(query::get);
    }

    @Override
    public void incrementApiCall() {
        this.apiCallCounter.increment();
    }

    @Override
    public void setActiveUsers(int counter) {
        this.activeUsers = counter;
    }

    @Override
    public void recordPayloadSize(long size) {
        this.payloadSize = size;
        payloadSizeSummary.record(size);
    }

    @Override
    public int getActiveUsers() {
        return this.activeUsers;
    }

    @Override
    public long getPayloadSize() {
        return this.payloadSize;
    }
}
