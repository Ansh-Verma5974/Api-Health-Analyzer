package com.ansh.api_hp.repository;

import com.ansh.api_hp.entity.HealthCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface HealthCheckRepository extends JpaRepository<HealthCheck, Long> {

    List<HealthCheck> findByApiIdOrderByCheckedAtAsc(Long apiId);
    @Modifying
    @Transactional
    void deleteByApiId(Long apiId);
    @Modifying
    @Query("DELETE FROM HealthCheck h WHERE h.checkedAt < :cutoff")
    void deleteOlderThan(@Param("cutoff") LocalDateTime cutoff);
    List<HealthCheck> findTop10ByApiIdOrderByCheckedAtDesc(Long apiId);
}