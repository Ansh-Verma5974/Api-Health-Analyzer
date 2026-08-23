package com.ansh.api_hp.service;

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

        return healthCheckRepository.findByApiId(apiId);
    }
    public double calculateUptime(Long apiId) {

        List<HealthCheck> history =
                healthCheckRepository.findByApiId(apiId);

        if (history.isEmpty()) {
            return 0.0;
        }

        long successfulChecks = history.stream()
                .filter(check -> "UP".equalsIgnoreCase(check.getStatus()))
                .count();

        return (successfulChecks * 100.0) / history.size();
    }
}