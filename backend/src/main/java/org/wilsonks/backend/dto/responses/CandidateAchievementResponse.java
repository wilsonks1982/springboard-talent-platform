package org.wilsonks.backend.dto.responses;

import java.util.UUID;

public record CandidateAchievementResponse(
        UUID id,
        String title,
        String description,
        int displayOrder
) {
    public static CandidateAchievementResponse of(
            org.wilsonks.backend.domain.CandidateAchievement achievement
    ) {
        return new CandidateAchievementResponse(
                achievement.getId(),
                achievement.getTitle(),
                achievement.getDescription(),
                achievement.getDisplayOrder()
        );
    }
}
