package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.KeyStrength;

import java.util.List;
import java.util.UUID;

public interface KeyStrengthRepository
        extends JpaRepository<KeyStrength, UUID> {

    List<KeyStrength>
    findAllByCandidateUserIdOrderByDisplayOrderAsc(
            UUID userId
    );

    void deleteAllByCandidateUserId(UUID userId);
}