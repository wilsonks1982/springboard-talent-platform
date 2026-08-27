package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateEducation;

import java.util.List;
import java.util.UUID;

public interface CandidateEducationsRepository extends JpaRepository<CandidateEducation, UUID> {
    List<CandidateEducation> findAllByCandidateUserIdOrderByDisplayOrderAsc(UUID userId);
}