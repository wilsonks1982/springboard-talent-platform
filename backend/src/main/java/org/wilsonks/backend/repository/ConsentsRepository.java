package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wilsonks.backend.domain.Consent;
import org.wilsonks.backend.domain.enums.ConsentType;

import java.util.UUID;

@Repository
public interface ConsentsRepository extends JpaRepository<Consent,UUID>{
    boolean existsByUserUserIdAndDocumentType(UUID id, ConsentType type);
    boolean existsByUserUserIdAndDocumentTypeAndDocumentVersion(UUID id, ConsentType type, String version);
}