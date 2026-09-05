package org.wilsonks.backend.dto.responses;

import org.wilsonks.backend.domain.CandidateIndustry;

import java.util.UUID;

public record CandidateIndustryResponse(
        UUID id,
        UUID industryTagId,
        String name,
        String code
) {

    public static CandidateIndustryResponse of(
            CandidateIndustry candidateIndustry) {

        return new CandidateIndustryResponse(
                candidateIndustry.getId(),
                candidateIndustry.getIndustryTag().getId(),
                candidateIndustry.getIndustryTag().getName(),
                candidateIndustry.getIndustryTag().getCode()
        );
    }
}