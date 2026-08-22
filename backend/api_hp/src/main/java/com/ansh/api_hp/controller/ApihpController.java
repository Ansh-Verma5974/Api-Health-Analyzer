package com.ansh.api_hp.controller;

import com.ansh.api_hp.entity.Apihp;
import com.ansh.api_hp.service.ApihpService;
import com.ansh.api_hp.service.HpChckrService;
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
    public Apihp addApi(@RequestBody Apihp apihp) {
        return apihpService.saveApi(apihp);
    }

    @GetMapping("/{id}/check")
    public String checkApi(@PathVariable Long id) {

        Apihp apihp = apihpService.getApiById(id);

        return hpChckrService.checkApi(apihp.getUrl());
    }
}