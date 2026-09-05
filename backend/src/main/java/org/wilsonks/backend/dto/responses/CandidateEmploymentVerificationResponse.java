package org.wilsonks.backend.dto.responses;


import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.enums.EmploymentVerificationStatus;
import org.wilsonks.backend.dto.CandidateDocumentResponse;

import java.time.OffsetDateTime;

public record CandidateEmploymentVerificationResponse(

        CandidateDocumentResponse lastIncrementLetter,
        CandidateDocumentResponse relievingLetter,

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
            Candidate candidate,
            CandidateDocumentResponse lastIncrementLetter,
            CandidateDocumentResponse relievingLetter
    ) {

        EmploymentVerificationStatus status =
                candidate.getEmploymentVerificationStatus() != null
                        ? candidate.getEmploymentVerificationStatus()
                        : EmploymentVerificationStatus.NOT_VERIFIED;

        return new CandidateEmploymentVerificationResponse(
                lastIncrementLetter,
                relievingLetter,
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