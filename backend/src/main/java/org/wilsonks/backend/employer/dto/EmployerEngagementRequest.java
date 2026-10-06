package org.wilsonks.backend.employer.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.wilsonks.backend.employer.domain.enums.EmployerEngagementType;

public record EmployerEngagementRequest(
        @NotNull(message = "Engagement type is required")
        EmployerEngagementType engagementType,

        @Size(max = 2000, message = "Context must not exceed 2000 characters")
        String context
) {
}
