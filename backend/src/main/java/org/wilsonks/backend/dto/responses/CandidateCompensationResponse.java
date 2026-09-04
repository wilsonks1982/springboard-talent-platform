package org.wilsonks.backend.dto.responses;

import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.enums.CompensationVisibility;

import java.math.BigDecimal;

public record CandidateCompensationResponse(
        BigDecimal currentCtc,
        String currentCtcBand,
        BigDecimal expectedCtc,
        String expectedCtcBand,
        CompensationVisibility compensationVisibility
) {

    public static CandidateCompensationResponse of(Candidate candidate) {
        return new CandidateCompensationResponse(
                candidate.getCurrentCtc(),
                candidate.getCurrentCtcBand(),
                candidate.getExpectedCtc(),
                candidate.getExpectedCtcBand(),
                candidate.getCompensationVisibility()
        );
    }
}