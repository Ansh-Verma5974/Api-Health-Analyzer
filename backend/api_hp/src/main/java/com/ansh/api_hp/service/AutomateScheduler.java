package com.ansh.api_hp.service;

import com.ansh.api_hp.entity.Apihp;
import com.ansh.api_hp.repository.HealthCheckRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class AutomateScheduler {

    private final ApihpService apihpService;
    private final HpChckrService hpChckrService;
    private final HealthCheckRepository healthCheckRepository;
    public AutomateScheduler(
            ApihpService apihpService,
            HpChckrService hpChckrService,
            HealthCheckRepository healthCheckRepository) {

        this.apihpService = apihpService;
        this.hpChckrService = hpChckrService;
        this.healthCheckRepository = healthCheckRepository;
    }

    @Scheduled(fixedRate = 60000)
    public void checkAllApis() {

        System.out.println("Automatic API health check running...");

        List<Apihp> apis = apihpService.getAllApis();

        for (Apihp api : apis) {

            if (api.isActive()) {

                hpChckrService.checkApi(
                        api.getId(),
                        api.getUrl()
                );
            }
        }
    }
    @Scheduled(cron = "0 0 3 * * *")
    @Transactional
    public void cleanupOldHealthChecks() {

        LocalDateTime cutoff =
                LocalDateTime.now().minusMinutes(10);

        healthCheckRepository.deleteOlderThan(cutoff);

        System.out.println("Old health checks cleaned up.");
    }
}