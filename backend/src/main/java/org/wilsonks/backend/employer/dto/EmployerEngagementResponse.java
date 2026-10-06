package org.wilsonks.backend.employer.dto;

import org.wilsonks.backend.employer.domain.enums.EmployerEngagementStatus;
import org.wilsonks.backend.employer.domain.enums.EmployerEngagementType;

import java.util.UUID;

public record EmployerEngagementResponse(
        UUID engagementId,
        UUID companyId,
        EmployerEngagementType engagementType,
        String context,
        boolean feeTierAgreementAccepted,
        boolean firstPlacementUsed,
        EmployerEngagementStatus engagementStatus
) {
}
