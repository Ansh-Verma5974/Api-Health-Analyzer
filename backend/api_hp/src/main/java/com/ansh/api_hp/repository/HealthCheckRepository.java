package com.ansh.api_hp.repository;

import com.ansh.api_hp.entity.HealthCheck;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HealthCheckRepository extends JpaRepository<HealthCheck, Long> {

    List<HealthCheck> findByApiId(Long apiId);
}