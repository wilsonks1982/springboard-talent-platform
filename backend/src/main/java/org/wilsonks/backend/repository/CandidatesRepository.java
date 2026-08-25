package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.Candidate;

import java.util.UUID;

public interface CandidatesRepository extends JpaRepository<Candidate, UUID> {
    boolean existsByUserUserId(UUID id);
    Candidate findByUserUserId(UUID id);
}