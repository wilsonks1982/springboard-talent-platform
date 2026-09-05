package org.wilsonks.backend.dto.responses;

import org.wilsonks.backend.domain.CandidateExperience;
import org.wilsonks.backend.domain.enums.ManagementType;

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
        String reportedToTitle,
        ManagementType managementType,
        Integer teamSize,
        String reasonForLeaving,
        int displayOrder
) {

    public static CandidateExperienceResponse of(
            CandidateExperience experience) {

        return new CandidateExperienceResponse(
                experience.getId(),
                experience.getCompanyName(),
                experience.getJobTitle(),
                experience.getStartDate(),
                experience.getEndDate(),
                experience.getEndDate() == null,
                experience.getDescription(),
                experience.getReportedToTitle(),
                experience.getManagementType(),
                experience.getTeamSize(),
                experience.getReasonForLeaving(),
                experience.getDisplayOrder()
        );
    }
}