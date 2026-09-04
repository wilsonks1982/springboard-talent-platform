package org.wilsonks.backend.dto.requests;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import org.wilsonks.backend.domain.enums.CompensationVisibility;

import java.math.BigDecimal;

public record CandidateCompensationRequest(

        @DecimalMin(
                value = "0.0",
                inclusive = true,
                message = "Current CTC cannot be negative"
        )
        BigDecimal currentCtc,

        @DecimalMin(
                value = "0.0",
                inclusive = true,
                message = "Expected CTC cannot be negative"
        )
        BigDecimal expectedCtc,

        @NotNull(message = "Compensation visibility is required")
        CompensationVisibility compensationVisibility

) {
}