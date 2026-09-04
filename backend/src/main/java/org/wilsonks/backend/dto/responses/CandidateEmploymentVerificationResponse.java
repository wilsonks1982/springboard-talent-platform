package org.wilsonks.backend.dto.responses;


import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.enums.EmploymentVerificationStatus;

import java.time.OffsetDateTime;

public record CandidateEmploymentVerificationResponse(

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

        Boolean hrContactBdDisclosureAcknowledged,

        OffsetDateTime hrContactBdDisclosureAcknowledgedAt,

        EmploymentVerificationStatus employmentVerificationStatus,

        OffsetDateTime verificationTriggeredAt

) {

    public static CandidateEmploymentVerificationResponse of(
            Candidate candidate
    ) {

        EmploymentVerificationStatus status =
                candidate.getEmploymentVerificationStatus() != null
                        ? candidate.getEmploymentVerificationStatus()
                        : EmploymentVerificationStatus.NOT_VERIFIED;

        return new CandidateEmploymentVerificationResponse(
                candidate.getLastIncrementLetterUrl(),
                candidate.getVariablePayLetterUrl(),
                candidate.getRelievingLetterUrl(),
                candidate.getOtherSupportingDocumentUrl(),

                candidate.getReportingManagerName(),
                candidate.getReportingManagerPhone(),
                candidate.getReportingManagerEmail(),

                candidate.getHrContactName(),
                candidate.getHrContactPhone(),
                candidate.getHrContactEmail(),

                candidate.getHrContactBdDisclosureAcknowledged(),
                candidate.getHrContactBdDisclosureAcknowledgedAt(),

                status,
                candidate.getVerificationTriggeredAt()
        );
    }
}