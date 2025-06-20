package com.example.spring_boot_api.services;

import java.util.function.Supplier;

public interface MetricsService {
    public <T> T recordDbQueryTime(Supplier<T> query);
    public void incrementApiCall();

    public void recordPayloadSize(long size);
    public long getPayloadSize();

    public int getActiveUsers();
    public void setActiveUsers(int counter);
    
}
