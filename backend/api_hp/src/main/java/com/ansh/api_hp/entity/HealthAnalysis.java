package com.ansh.api_hp.entity;

public class HealthAnalysis {

    private Long apiId;
    private long totalChecks;
    private long successfulChecks;
    private long failedChecks;
    private double uptimePercentage;
    private double averageResponseTime;
    private long fastestResponseTime;
    private long slowestResponseTime;
    private String healthStatus;

    private String lastStatus;
    private int lastHttpStatus;
    private long lastResponseTime;
    private int consecutiveFailures;
    private double recentAverageResponseTime;
    private double previousAverageResponseTime;
    private String responseTimeTrend;

    private boolean alert;
    private String alertMessage;

    public HealthAnalysis() {
    }

    public HealthAnalysis(
            Long apiId,
            long totalChecks,
            long successfulChecks,
            long failedChecks,
            double uptimePercentage,
            double averageResponseTime,
            long fastestResponseTime,
            long slowestResponseTime,
            String healthStatus,
            String lastStatus,
            int lastHttpStatus,
            long lastResponseTime,
            int consecutiveFailures,
            double recentAverageResponseTime,
            double previousAverageResponseTime,
            String responseTimeTrend,
            boolean alert,
            String alertMessage) {

        this.apiId = apiId;
        this.totalChecks = totalChecks;
        this.successfulChecks = successfulChecks;
        this.failedChecks = failedChecks;
        this.uptimePercentage = uptimePercentage;
        this.averageResponseTime = averageResponseTime;
        this.fastestResponseTime = fastestResponseTime;
        this.slowestResponseTime = slowestResponseTime;
        this.healthStatus = healthStatus;
        this.lastStatus = lastStatus;
        this.lastHttpStatus = lastHttpStatus;
        this.lastResponseTime = lastResponseTime;
        this.consecutiveFailures = consecutiveFailures;
        this.recentAverageResponseTime = recentAverageResponseTime;
        this.previousAverageResponseTime = previousAverageResponseTime;
        this.responseTimeTrend = responseTimeTrend;
        this.alert = alert;
        this.alertMessage = alertMessage;
    }

    public Long getApiId() {
        return apiId;
    }

    public void setApiId(Long apiId) {
        this.apiId = apiId;
    }

    public long getTotalChecks() {
        return totalChecks;
    }

    public void setTotalChecks(long totalChecks) {
        this.totalChecks = totalChecks;
    }

    public long getSuccessfulChecks() {
        return successfulChecks;
    }

    public void setSuccessfulChecks(long successfulChecks) {
        this.successfulChecks = successfulChecks;
    }

    public long getFailedChecks() {
        return failedChecks;
    }

    public void setFailedChecks(long failedChecks) {
        this.failedChecks = failedChecks;
    }

    public double getUptimePercentage() {
        return uptimePercentage;
    }

    public void setUptimePercentage(double uptimePercentage) {
        this.uptimePercentage = uptimePercentage;
    }

    public double getAverageResponseTime() {
        return averageResponseTime;
    }

    public void setAverageResponseTime(double averageResponseTime) {
        this.averageResponseTime = averageResponseTime;
    }

    public long getFastestResponseTime() {
        return fastestResponseTime;
    }

    public void setFastestResponseTime(long fastestResponseTime) {
        this.fastestResponseTime = fastestResponseTime;
    }

    public String getHealthStatus() {
        return healthStatus;
    }

    public void setHealthStatus(String healthStatus) {
        this.healthStatus = healthStatus;
    }

    public long getSlowestResponseTime() {
        return slowestResponseTime;
    }

    public void setSlowestResponseTime(long slowestResponseTime) {
        this.slowestResponseTime = slowestResponseTime;
    }

    public String getLastStatus() {
        return lastStatus;
    }

    public void setLastStatus(String lastStatus) {
        this.lastStatus = lastStatus;
    }

    public int getLastHttpStatus() {
        return lastHttpStatus;
    }

    public void setLastHttpStatus(int lastHttpStatus) {
        this.lastHttpStatus = lastHttpStatus;
    }

    public long getLastResponseTime() {
        return lastResponseTime;
    }

    public void setLastResponseTime(long lastResponseTime) {
        this.lastResponseTime = lastResponseTime;
    }

    public int getConsecutiveFailures() {
        return consecutiveFailures;
    }

    public void setConsecutiveFailures(int consecutiveFailures) {
        this.consecutiveFailures = consecutiveFailures;
    }

    public double getRecentAverageResponseTime() {
        return recentAverageResponseTime;
    }

    public void setRecentAverageResponseTime(double recentAverageResponseTime) {
        this.recentAverageResponseTime = recentAverageResponseTime;
    }

    public double getPreviousAverageResponseTime() {
        return previousAverageResponseTime;
    }

    public void setPreviousAverageResponseTime(double previousAverageResponseTime) {
        this.previousAverageResponseTime = previousAverageResponseTime;
    }

    public String getResponseTimeTrend() {
        return responseTimeTrend;
    }

    public void setResponseTimeTrend(String responseTimeTrend) {
        this.responseTimeTrend = responseTimeTrend;
    }

    public boolean isAlert() {
        return alert;
    }

    public void setAlert(boolean alert) {
        this.alert = alert;
    }

    public String getAlertMessage() {
        return alertMessage;
    }

    public void setAlertMessage(String alertMessage) {
        this.alertMessage = alertMessage;
    }
}