package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.wilsonks.backend.domain.VerificationCode;
import org.wilsonks.backend.domain.enums.VerificationChannel;
import org.wilsonks.backend.domain.enums.VerificationPurpose;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CodesRepository extends JpaRepository<VerificationCode, UUID> {
    Optional<VerificationCode> findFirstByUserUserIdAndChannelAndPurposeAndConsumedAtIsNullOrderByCreatedAtDesc(UUID id, VerificationChannel c, VerificationPurpose p);
}
