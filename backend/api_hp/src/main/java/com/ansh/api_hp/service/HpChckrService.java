package com.ansh.api_hp.service;

import com.ansh.api_hp.entity.HealthAnalysis;
import com.ansh.api_hp.entity.HealthCheck;
import com.ansh.api_hp.repository.HealthCheckRepository;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class HpChckrService {

    private final HealthCheckRepository healthCheckRepository;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    public HpChckrService(HealthCheckRepository healthCheckRepository) {
        this.healthCheckRepository = healthCheckRepository;
    }

    public HealthCheck checkApi(Long apiId, String url) {

        HealthCheck healthCheck = new HealthCheck();

        healthCheck.setApiId(apiId);
        healthCheck.setCheckedAt(LocalDateTime.now());

        try {

            long startTime = System.currentTimeMillis();

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            long endTime = System.currentTimeMillis();

            long responseTime = endTime - startTime;

            healthCheck.setHttpStatus(response.statusCode());
            healthCheck.setResponseTime(responseTime);

            if (response.statusCode() >= 200 &&
                    response.statusCode() < 400) {

                healthCheck.setStatus("UP");

            } else {

                healthCheck.setStatus("DOWN");
            }

        } catch (Exception e) {

            healthCheck.setStatus("DOWN");
            healthCheck.setHttpStatus(0);
            healthCheck.setResponseTime(0);
        }

        return healthCheckRepository.save(healthCheck);
    }
    public List<HealthCheck> getHistory(Long apiId) {

        return healthCheckRepository.findByApiIdOrderByCheckedAtAsc(apiId);
    }
    public double calculateUptime(Long apiId) {

        List<HealthCheck> history =
                healthCheckRepository.findByApiIdOrderByCheckedAtAsc(apiId);

        if (history.isEmpty()) {
            return 0.0;
        }

        long successfulChecks = history.stream()
                .filter(check -> "UP".equalsIgnoreCase(check.getStatus()))
                .count();

        return (successfulChecks * 100.0) / history.size();
    }
    public HealthAnalysis getHealthAnalysis(Long apiId) {

        List<HealthCheck> history =
                healthCheckRepository.findByApiIdOrderByCheckedAtAsc(apiId);

        long totalChecks = history.size();

        long successfulChecks = history.stream()
                .filter(check -> "UP".equalsIgnoreCase(check.getStatus()))
                .count();

        long failedChecks = totalChecks - successfulChecks;

//UPTIME PERCENTAGE
        double uptimePercentage = 0.0;

        if (totalChecks > 0) {
            uptimePercentage =
                    (successfulChecks * 100.0) / totalChecks;
        }
//RESPONSE TIME
        double averageResponseTime = 0.0;
        long fastestResponseTime = 0;
        long slowestResponseTime = 0;

        if (!history.isEmpty()) {

            averageResponseTime = history.stream()
                    .mapToLong(HealthCheck::getResponseTime)
                    .average()
                    .orElse(0.0);

            fastestResponseTime = history.stream()
                    .mapToLong(HealthCheck::getResponseTime)
                    .min()
                    .orElse(0);

            slowestResponseTime = history.stream()
                    .mapToLong(HealthCheck::getResponseTime)
                    .max()
                    .orElse(0);
        }
//LAST OR RECENT STATUS
        HealthCheck lastCheck = null;

        if (!history.isEmpty()) {
            lastCheck = history.get(history.size() - 1);
        }
        String lastStatus = "N/A";
        int lastHttpStatus = 0;
        long lastResponseTime = 0;

        if (lastCheck != null) {
            lastStatus = lastCheck.getStatus();
            lastHttpStatus = lastCheck.getHttpStatus();
            lastResponseTime = lastCheck.getResponseTime();
        }
//FAILURES
        int consecutiveFailures = 0;

        for (int i = history.size() - 1; i >= 0; i--) {

            HealthCheck check = history.get(i);

            if ("DOWN".equalsIgnoreCase(check.getStatus())) {
                consecutiveFailures++;
            } else {
                break;
            }
        }
//TIME TRENDS
        double recentAverageResponseTime = 0.0;
        double previousAverageResponseTime = 0.0;

        if (history.size() >= 10) {

            int size = history.size();

            recentAverageResponseTime = history.subList(size - 5, size)
                    .stream()
                    .mapToLong(HealthCheck::getResponseTime)
                    .average()
                    .orElse(0.0);

            previousAverageResponseTime = history.subList(size - 10, size - 5)
                    .stream()
                    .mapToLong(HealthCheck::getResponseTime)
                    .average()
                    .orElse(0.0);
        }
        String responseTimeTrend = "NOT_ENOUGH_DATA";

        if (history.size() >= 10) {

            if (recentAverageResponseTime >
                    previousAverageResponseTime * 1.10) {

                responseTimeTrend = "SLOWER";

            } else if (recentAverageResponseTime <
                    previousAverageResponseTime * 0.90) {

                responseTimeTrend = "FASTER";

            } else {

                responseTimeTrend = "STABLE";
            }
        }
//HEALTH STATUS
        String healthStatus;

        if (totalChecks == 0) {
            healthStatus = "UNKNOWN";
        } else if (uptimePercentage == 0 || consecutiveFailures >= 3) {
            healthStatus = "DOWN";
        } else if (uptimePercentage < 95.0 || averageResponseTime > 1000) {
            healthStatus = "DEGRADED";
        } else {
            healthStatus = "HEALTHY";
        }

// ALERTS
        boolean alert = false;
        String alertMessage = "No issues detected";

        if ("DOWN".equalsIgnoreCase(healthStatus)) {

            alert = true;
            alertMessage = "API is DOWN";

        } else if (consecutiveFailures >= 3) {

            alert = true;
            alertMessage = "API has multiple consecutive failures";

        } else if (averageResponseTime > 1000) {

            alert = true;
            alertMessage = "API response time is too high";

        } else if ("SLOWER".equalsIgnoreCase(responseTimeTrend)) {

            alert = true;
            alertMessage = "API response time is getting slower";
        }
        return new HealthAnalysis(
                apiId,
                totalChecks,
                successfulChecks,
                failedChecks,
                uptimePercentage,
                averageResponseTime,
                fastestResponseTime,
                slowestResponseTime,
                healthStatus,
                lastStatus,
                lastHttpStatus,
                lastResponseTime,
                consecutiveFailures,
                recentAverageResponseTime,
                previousAverageResponseTime,
                responseTimeTrend,
                alert,
                alertMessage
        );
    }
    public List<HealthCheck> getRecentChecks(Long apiId) {

        return healthCheckRepository
                .findTop10ByApiIdOrderByCheckedAtDesc(apiId);
    }
}