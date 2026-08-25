package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.enums.EmploymentSituation;
import org.wilsonks.backend.domain.enums.RelocationPreference;
import org.wilsonks.backend.domain.enums.WorkModePreference;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.UUID;

public record OnboardingResponse(

        UUID userId,
        String fullName,
        String email,

        EmploymentSituation employmentSituation,

        String currentCompany,
        String currentRole,
        String yearsExperience,

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

) {}
