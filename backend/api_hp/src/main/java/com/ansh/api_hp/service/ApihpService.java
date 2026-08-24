package com.ansh.api_hp.service;

import com.ansh.api_hp.entity.Apihp;
import com.ansh.api_hp.exception.ApiNotFoundException;
import com.ansh.api_hp.repository.ApihpRepository;
import com.ansh.api_hp.repository.HealthCheckRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ApihpService {

    private final ApihpRepository apihpRepository;
    private final HealthCheckRepository healthCheckRepository;

    public ApihpService(
            ApihpRepository apihpRepository,
            HealthCheckRepository healthCheckRepository) {

        this.apihpRepository = apihpRepository;
        this.healthCheckRepository = healthCheckRepository;
    }

    public Apihp saveApi(Apihp apihp) {
        return apihpRepository.save(apihp);
    }

    public List<Apihp> getAllApis() {
        return apihpRepository.findAll();
    }

    public Apihp getApiById(Long id) {
        return apihpRepository.findById(id)
                .orElseThrow(() ->
                        new ApiNotFoundException(id));
    }
    @Transactional
    public void deleteApi(Long id) {

        if (!apihpRepository.existsById(id)) {
            throw new RuntimeException("API not found with id: " + id);
        }

        healthCheckRepository.deleteByApiId(id);
        apihpRepository.deleteById(id);
    }
}