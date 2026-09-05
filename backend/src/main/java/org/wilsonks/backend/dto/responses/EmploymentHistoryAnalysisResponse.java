package org.wilsonks.backend.dto.responses;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record EmploymentHistoryAnalysisResponse(
        BigDecimal yearsExperience,
        String currentTitle,
        String currentCompany,
        List<EmploymentGapResponse> employmentGaps
) {
}