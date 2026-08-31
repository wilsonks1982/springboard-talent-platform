package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateReference;

import java.util.List;
import java.util.UUID;

public interface CandidateReferencesRepository extends JpaRepository<CandidateReference, UUID> {
    List<CandidateReference> findByCandidateUserIdOrderByDisplayOrderAsc(UUID userId);
}