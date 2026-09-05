package org.wilsonks.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.wilsonks.backend.domain.NotableAchievement;

import java.util.List;
import java.util.UUID;

public interface NotableAchievementRepository
        extends JpaRepository<NotableAchievement, UUID> {

    List<NotableAchievement>
    findAllByCandidateUserIdOrderByDisplayOrderAsc(
            UUID userId
    );

    void deleteAllByCandidateUserId(UUID userId);
}