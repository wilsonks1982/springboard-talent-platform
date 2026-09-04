package org.wilsonks.backend.dto.requests;

import jakarta.validation.constraints.AssertTrue;

public record CandidateEmploymentVerificationRequest(

        String lastIncrementLetterUrl,

        String variablePayLetterUrl,

        String relievingLetterUrl,

        String otherSupportingDocumentUrl,

        String reportingManagerName,

        String reportingManagerPhone,

        String reportingManagerEmail,

        String hrContactName,

        String hrContactPhone,

        String hrContactEmail,

        Boolean hrContactBdDisclosureAcknowledged
) {

    @AssertTrue(
            message = "HR/manager disclosure acknowledgement is required when verification contacts are provided"
    )
    public boolean isDisclosureValid() {

        boolean contactProvided =
                hasText(reportingManagerName)
                        || hasText(reportingManagerPhone)
                        || hasText(reportingManagerEmail)
                        || hasText(hrContactName)
                        || hasText(hrContactPhone)
                        || hasText(hrContactEmail);

        if (!contactProvided) {
            return true;
        }

        return Boolean.TRUE.equals(hrContactBdDisclosureAcknowledged);
    }

    private static boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}