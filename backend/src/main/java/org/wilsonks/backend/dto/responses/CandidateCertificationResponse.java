package org.wilsonks.backend.dto.responses;

import java.time.LocalDate;
import java.util.UUID;

public record CandidateCertificationResponse(
        UUID id,
        String name,
        String issuingOrganization,
        LocalDate issueDate,
        LocalDate expiryDate,
        String description,
        int displayOrder
) {
    public static CandidateCertificationResponse of(
            org.wilsonks.backend.domain.CandidateCertification certification
    ) {
        return new CandidateCertificationResponse(
                certification.getId(),
                certification.getName(),
                certification.getIssuingOrganization(),
                certification.getIssueDate(),
                certification.getExpiryDate(),
                certification.getDescription(),
                certification.getDisplayOrder()
        );
    }
}