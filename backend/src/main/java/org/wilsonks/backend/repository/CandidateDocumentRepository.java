package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateDocument;
import org.wilsonks.backend.domain.enums.DocumentType;

import java.util.Optional;
import java.util.UUID;

public interface CandidateDocumentRepository extends JpaRepository<CandidateDocument, UUID> {
    Optional<CandidateDocument> findByCandidateUserIdAndDocumentType(
            UUID candidateUserId,
            DocumentType documentType
    );

    Optional<CandidateDocument> findByCandidateUserId(UUID candidateUserId);

    void deleteByCandidateUserIdAndDocumentType(
            UUID candidateUserId,
            DocumentType documentType
    );
}