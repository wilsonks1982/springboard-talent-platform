package org.wilsonks.backend.dto.responses;

import org.wilsonks.backend.domain.NotableAchievement;

import java.util.UUID;

public record NotableAchievementResponse(
        UUID id,
        String achievement,
        int displayOrder
) {

    public static NotableAchievementResponse of(
            NotableAchievement achievement) {

        return new NotableAchievementResponse(
                achievement.getId(),
                achievement.getAchievement(),
                achievement.getDisplayOrder()
        );
    }
}