package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record CandidateCertificationRequest(

        @NotBlank(message = "Certification name is required")
        String name,

        String issuingOrganization,

        LocalDate issueDate,

        LocalDate expiryDate,

        String description

) {
}