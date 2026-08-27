package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateReference;

import java.util.List;
import java.util.UUID;

public interface CandidateReferenceRepository extends JpaRepository<CandidateReference, UUID> {
    List<CandidateReference> findAllByCandidateUserIdOrderByDisplayOrderAsc(UUID userId);
}