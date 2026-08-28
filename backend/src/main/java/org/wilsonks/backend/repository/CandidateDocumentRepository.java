package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateDocument;

import java.util.Optional;
import java.util.UUID;

public interface CandidateDocumentRepository extends JpaRepository<CandidateDocument, UUID> {
    Optional<CandidateDocument> findByCandidateUserId(UUID userId);
}