package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateDocument;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CandidateDocumentRepository extends JpaRepository<CandidateDocument, UUID> {
    List<CandidateDocument> findAllByCandidateUserIdOrderByUploadedAtDesc(UUID userId);
    Optional<CandidateDocument> findFirstByCandidateUserIdAndPrimaryTrue(UUID userId);
}