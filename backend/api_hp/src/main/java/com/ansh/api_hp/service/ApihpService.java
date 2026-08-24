package com.ansh.api_hp.service;

import com.ansh.api_hp.entity.Apihp;
import com.ansh.api_hp.exception.ApiNotFoundException;
import com.ansh.api_hp.repository.ApihpRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApihpService {

    private final ApihpRepository apihpRepository;

    public ApihpService(ApihpRepository apihpRepository) {
        this.apihpRepository = apihpRepository;
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
}