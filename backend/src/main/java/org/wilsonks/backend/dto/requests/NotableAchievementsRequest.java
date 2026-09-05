package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record NotableAchievementsRequest(

        @NotNull(message = "Achievements are required.")
        List<String> achievements

) {
}