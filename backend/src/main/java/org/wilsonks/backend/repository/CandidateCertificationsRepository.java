package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateCertification;

import java.util.List;
import java.util.UUID;

public interface CandidateCertificationsRepository extends JpaRepository<CandidateCertification, UUID> {
    List<CandidateCertification> findAllByCandidateUserIdOrderByDisplayOrderAsc(UUID userId);
}