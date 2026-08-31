package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.CandidateAchievement;

import java.util.List;
import java.util.UUID;

public interface CandidateAchievementsRepository extends JpaRepository<CandidateAchievement, UUID> {
    List<CandidateAchievement> findByCandidateUserIdOrderByDisplayOrderAsc(UUID userId);
}