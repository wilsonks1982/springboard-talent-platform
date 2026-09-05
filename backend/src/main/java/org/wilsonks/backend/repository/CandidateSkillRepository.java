package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateSkill;

import java.util.List;
import java.util.UUID;

public interface CandidateSkillRepository
        extends JpaRepository<CandidateSkill, UUID> {

    List<CandidateSkill>
    findAllByCandidateUserId(UUID userId);

    void deleteAllByCandidateUserId(UUID userId);
}