package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.wilsonks.backend.domain.enums.ManagementType;

import java.time.LocalDate;

public record CandidateExperienceRequest(

        @NotBlank(message = "Company is required.")
        @Size(max = 200, message = "Company must not exceed 200 characters.")
        String companyName,

        @NotBlank(message = "Job title is required.")
        @Size(max = 200, message = "Job title must not exceed 200 characters.")
        String jobTitle,

        @NotNull(message = "Start date is required.")
        LocalDate startDate,

        LocalDate endDate,

        @NotBlank(message = "Role description is required.")
        @Size(
                min = 20,
                max = 2000,
                message = "Role description must be between 20 and 2000 characters."
        )
        String description,

        @Size(max = 200, message = "Reporting title must not exceed 200 characters.")
        String reportedToTitle,

        @NotNull(message = "Management type is required.")
        ManagementType managementType,

        @Min(value = 1, message = "Team size must be at least 1.")
        @Max(value = 100000, message = "Team size is too large.")
        Integer teamSize,

        @Size(max = 500, message = "Reason for leaving must not exceed 500 characters.")
        String reasonForLeaving

) {

    @AssertTrue(message = "End date must be on or after start date.")
    public boolean isDateRangeValid() {
        if (startDate == null || endDate == null) {
            return true;
        }

        return !endDate.isBefore(startDate);
    }

    @AssertTrue(message = "Team size is required for People Manager roles.")
    public boolean isTeamSizePresentForManager() {
        if (managementType != ManagementType.PEOPLE_MANAGER) {
            return true;
        }

        return teamSize != null;
    }

    @AssertTrue(message = "Team size must be empty for Individual Contributor roles.")
    public boolean isTeamSizeAbsentForIndividualContributor() {
        if (managementType != ManagementType.INDIVIDUAL_CONTRIBUTOR) {
            return true;
        }

        return teamSize == null;
    }
}