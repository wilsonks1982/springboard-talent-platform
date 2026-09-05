package org.wilsonks.backend.dto.responses;

import java.time.LocalDate;

public record EmploymentGapResponse(
        LocalDate startDate,
        LocalDate endDate,
        long months,
        boolean explanationRequired
) {
}