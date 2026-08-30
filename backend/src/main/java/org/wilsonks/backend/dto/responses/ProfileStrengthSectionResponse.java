package org.wilsonks.backend.dto.responses;

public record ProfileStrengthSectionResponse(
        String key,
        String label,
        int weight,
        boolean completed
) {
}