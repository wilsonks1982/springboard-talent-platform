package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateExperience;

import java.util.List;
import java.util.UUID;

public interface CandidateExperiencesRepository
        extends JpaRepository<CandidateExperience, UUID> {

    List<CandidateExperience>
    findAllByCandidateUserIdOrderByStartDateDesc(UUID userId);

    boolean existsByCandidateUserIdAndEndDateIsNull(UUID userId);

    boolean existsByCandidateUserIdAndIdNotAndEndDateIsNull(
            UUID userId,
            UUID experienceId);
}