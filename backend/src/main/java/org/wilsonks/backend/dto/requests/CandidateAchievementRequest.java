package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.NotBlank;

public record CandidateAchievementRequest(

        @NotBlank(message = "Achievement title is required")
        String title,

        String description

) {
}