package org.wilsonks.backend.dto.responses;

import java.time.LocalDate;
import java.util.UUID;

public record CandidateExperienceResponse(
        UUID id,
        String companyName,
        String jobTitle,
        LocalDate startDate,
        LocalDate endDate,
        boolean current,
        String description,
        int displayOrder
) {
    public static CandidateExperienceResponse of(
            org.wilsonks.backend.domain.CandidateExperience experience
    ) {
        return new CandidateExperienceResponse(
                experience.getId(),
                experience.getCompanyName(),
                experience.getJobTitle(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.isCurrent(),
                experience.getDescription(),
                experience.getDisplayOrder()
        );
    }
}
