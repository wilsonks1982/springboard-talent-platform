package org.wilsonks.backend.dto;

import org.wilsonks.backend.domain.enums.EmploymentSituation;

import java.util.UUID;

public record RegistrationStatusResponse(
        UUID userId,
        String currentStep,
        boolean ndaAccepted,
        boolean privacyAccepted,
        boolean emailVerified,
        boolean phoneVerified,
        EmploymentSituation employmentSituation
){}
