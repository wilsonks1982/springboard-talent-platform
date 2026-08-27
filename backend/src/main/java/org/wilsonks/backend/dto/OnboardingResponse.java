package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.enums.EmploymentSituation;
import org.wilsonks.backend.domain.enums.RelocationPreference;
import org.wilsonks.backend.domain.enums.WorkModePreference;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

public record OnboardingResponse(

        UUID userId,
        String fullName,
        String email,

        EmploymentSituation employmentSituation,

        List<ExperienceResponse> experiences,
        List<EducationResponse> education,
        List<CertificationResponse> certifications,

        String currentChallenge,
        String growthAspiration,
        String plainLanguagePitch,

        String functionalArea,

        WorkModePreference workModePreference,
        RelocationPreference relocationPreference,

        String noticePeriod,

        String compensationRange,
        boolean compensationVisibleToRecruiters,

        String linkedinUrl,

        OffsetDateTime onboardingCompletedAt

) {
    public record ExperienceResponse(
            UUID id,
            String companyName,
            String jobTitle,
            LocalDate startDate,
            LocalDate endDate,
            boolean current,
            String description,
            int displayOrder
    ) {}

    public record EducationResponse(
            UUID id,
            String degree,
            String institution,
            String fieldOfStudy,
            Integer yearOfPassing,
            String educationLevel,
            int displayOrder
    ) {}

    public record CertificationResponse(
            UUID id,
            String name,
            String issuingOrganization,
            LocalDate issueDate,
            LocalDate expiryDate,
            String description,
            int displayOrder
    ) {}
}
