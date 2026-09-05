package org.wilsonks.backend.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.enums.DocumentType;
import org.wilsonks.backend.domain.enums.EmploymentVerificationStatus;
import org.wilsonks.backend.dto.CandidateDocumentResponse;
import org.wilsonks.backend.dto.requests.CandidateEmploymentVerificationRequest;
import org.wilsonks.backend.dto.responses.CandidateEmploymentVerificationResponse;
import org.wilsonks.backend.repository.CandidateDocumentRepository;
import org.wilsonks.backend.repository.CandidatesRepository;
import org.wilsonks.backend.service.CandidateEmploymentVerificationService;

import java.time.OffsetDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateEmploymentVerificationServiceImpl implements CandidateEmploymentVerificationService {

    private final CandidatesRepository candidateRepository;
    private final CandidateDocumentRepository documentsRepo;

    @Transactional(readOnly = true)
    public Candidate getCandidate(UUID userId) {
        return candidateRepository.findByUserUserId(userId);
    }


    @Override
    @Transactional(readOnly = true)
    public CandidateEmploymentVerificationResponse get(Candidate candidate) {
        UUID candidateId = candidate.getUser().getUserId();

        CandidateDocumentResponse lastIncrementLetter =
                documentsRepo
                        .findByCandidateUserIdAndDocumentType(
                                candidateId,
                                DocumentType.LAST_INCREMENT_LETTER
                        )
                        .map(CandidateDocumentResponse::of)
                        .orElse(null);

        CandidateDocumentResponse relievingLetter =
                documentsRepo
                        .findByCandidateUserIdAndDocumentType(
                                candidateId,
                                DocumentType.RELIEVING_LETTER
                        )
                        .map(CandidateDocumentResponse::of)
                        .orElse(null);

        return CandidateEmploymentVerificationResponse.of(candidate, lastIncrementLetter, relievingLetter);
    }

    @Override
    public CandidateEmploymentVerificationResponse update(Candidate candidate, CandidateEmploymentVerificationRequest request) {


        candidate.setReportingManagerName(request.reportingManagerName());

        candidate.setReportingManagerPhone(request.reportingManagerPhone());

        candidate.setReportingManagerEmail(request.reportingManagerEmail());

        candidate.setHrContactName(request.hrContactName());

        candidate.setHrContactPhone(request.hrContactPhone());

        candidate.setHrContactEmail(request.hrContactEmail());

        updateDisclosure(candidate, request);

        if (candidate.getEmploymentVerificationStatus() == null) {
            candidate.setEmploymentVerificationStatus(EmploymentVerificationStatus.NOT_VERIFIED);
        }

        Candidate saved = candidateRepository.save(candidate);

        CandidateDocumentResponse lastIncrementLetter =
                documentsRepo
                        .findByCandidateUserIdAndDocumentType(
                                candidate.getUser().getUserId(),
                                DocumentType.LAST_INCREMENT_LETTER
                        )
                        .map(CandidateDocumentResponse::of)
                        .orElse(null);

        CandidateDocumentResponse relievingLetter =
                documentsRepo
                        .findByCandidateUserIdAndDocumentType(
                                candidate.getUser().getUserId(),
                                DocumentType.RELIEVING_LETTER
                        )
                        .map(CandidateDocumentResponse::of)
                        .orElse(null);

        return CandidateEmploymentVerificationResponse.of(
                saved,
                lastIncrementLetter,
                relievingLetter
        );

    }

    @Override
    public CandidateEmploymentVerificationResponse triggerVerification(Candidate candidate) {

        /*
         * Verification can only be triggered once.
         */
        if (candidate.getVerificationTriggeredAt() == null) {

            candidate.setVerificationTriggeredAt(OffsetDateTime.now());

            candidate.setEmploymentVerificationStatus(EmploymentVerificationStatus.PENDING);

            candidateRepository.save(candidate);
        }

        return get(candidate);
    }

    private void updateDisclosure(Candidate candidate, CandidateEmploymentVerificationRequest request) {

        boolean contactProvided = hasText(request.reportingManagerName()) || hasText(request.reportingManagerPhone()) || hasText(request.reportingManagerEmail()) || hasText(request.hrContactName()) || hasText(request.hrContactPhone()) || hasText(request.hrContactEmail());

        if (!contactProvided) {
            candidate.setHrContactBdDisclosureAcknowledged(null);
            candidate.setHrContactBdDisclosureAcknowledgedAt(null);
            return;
        }

        candidate.setHrContactBdDisclosureAcknowledged(true);

        if (candidate.getHrContactBdDisclosureAcknowledgedAt() == null) {
            candidate.setHrContactBdDisclosureAcknowledgedAt(OffsetDateTime.now());
        }
    }

    private boolean hasText(String value) {
        return value != null && !value.isBlank();
    }
}