package org.wilsonks.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CareerSummary;

import java.util.Optional;
import java.util.UUID;

public interface CareerSummaryRepository
        extends JpaRepository<CareerSummary, UUID> {

    Optional<CareerSummary>
    findByCandidateUserId(UUID userId);
}