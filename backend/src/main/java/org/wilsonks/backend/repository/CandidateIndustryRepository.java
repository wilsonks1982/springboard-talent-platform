package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateIndustry;

import java.util.List;
import java.util.UUID;

public interface CandidateIndustryRepository
        extends JpaRepository<CandidateIndustry, UUID> {

    List<CandidateIndustry>
    findAllByCandidateUserId(UUID userId);

    void deleteAllByCandidateUserId(UUID userId);
}