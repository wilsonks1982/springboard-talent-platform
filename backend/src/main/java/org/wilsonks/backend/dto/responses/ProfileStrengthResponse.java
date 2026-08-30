package org.wilsonks.backend.dto.responses;
import java.util.List;

public record ProfileStrengthResponse(
        int score,
        String level,
        String message,
        List<ProfileStrengthSectionResponse> sections
) {
}
