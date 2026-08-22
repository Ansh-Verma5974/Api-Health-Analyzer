package com.ansh.api_hp.service;

import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class HpChckrService {

    private final HttpClient httpClient = HttpClient.newHttpClient();

    public String checkApi(String url) {

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

            return "Status: " + response.statusCode()
                    + ", Response Time: " + responseTime + " ms";

        } catch (Exception e) {

            return "API DOWN - " + e.getMessage();
        }
    }
}