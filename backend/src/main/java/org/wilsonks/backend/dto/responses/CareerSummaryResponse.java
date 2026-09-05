package org.wilsonks.backend.dto.responses;

import org.wilsonks.backend.domain.CareerSummary;

import java.util.UUID;

public record CareerSummaryResponse(
        UUID id,
        String summary
) {

    public static CareerSummaryResponse of(
            CareerSummary careerSummary) {

        return new CareerSummaryResponse(
                careerSummary.getId(),
                careerSummary.getSummary()
        );
    }
}