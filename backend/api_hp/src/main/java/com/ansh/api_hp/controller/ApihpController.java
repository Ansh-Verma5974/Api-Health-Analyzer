package com.ansh.api_hp.controller;

import com.ansh.api_hp.entity.Apihp;
import com.ansh.api_hp.entity.HealthAnalysis;
import com.ansh.api_hp.entity.HealthCheck;
import com.ansh.api_hp.service.ApihpService;
import com.ansh.api_hp.service.HpChckrService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monitors")
public class ApihpController {

    private final ApihpService apihpService;
    private final HpChckrService hpChckrService;

    public ApihpController(ApihpService apihpService,
                           HpChckrService hpChckrService) {

        this.apihpService = apihpService;
        this.hpChckrService = hpChckrService;
    }

    @PostMapping
    public Apihp addApi(@Valid @RequestBody Apihp apihp) {
        return apihpService.saveApi(apihp);
    }
    @DeleteMapping("/{id}")
    public String deleteApi(@PathVariable Long id) {

        apihpService.deleteApi(id);

        return "API deleted successfully";
    }
    @GetMapping
    public List<Apihp> getAllApis() {
        return apihpService.getAllApis();
    }
    @GetMapping("/{id}")
    public Apihp getApiById(@PathVariable Long id) {
        return apihpService.getApiById(id);
    }
    @GetMapping("/{id}/check")
    public HealthCheck checkApi(@PathVariable Long id) {

        Apihp apihp = apihpService.getApiById(id);

        return hpChckrService.checkApi(
                apihp.getId(),
                apihp.getUrl()
        );    }
    @GetMapping("/{id}/history")
    public List<HealthCheck> getHistory(@PathVariable Long id) {

        return hpChckrService.getHistory(id);
    }
    @GetMapping("/{id}/uptime")
    public double getUptime(@PathVariable Long id) {

        return hpChckrService.calculateUptime(id);
    }
    @GetMapping("/{id}/analysis")
    public HealthAnalysis getAnalysis(@PathVariable Long id) {

        return hpChckrService.getHealthAnalysis(id);
    }
    @GetMapping("/{id}/recent")
    public List<HealthCheck> getRecentChecks(@PathVariable Long id) {

        return hpChckrService.getRecentChecks(id);
    }
}