package com.ansh.api_hp.service;

import com.ansh.api_hp.entity.Apihp;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AutomateScheduler {

    private final ApihpService apihpService;
    private final HpChckrService hpChckrService;

    public AutomateScheduler(
            ApihpService apihpService,
            HpChckrService hpChckrService) {

        this.apihpService = apihpService;
        this.hpChckrService = hpChckrService;
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
}