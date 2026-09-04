package org.wilsonks.backend.service;

import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.dto.requests.CandidateEmploymentVerificationRequest;
import org.wilsonks.backend.dto.responses.CandidateEmploymentVerificationResponse;

import java.util.UUID;

public interface CandidateEmploymentVerificationService {

    Candidate getCandidate(UUID userId);
    CandidateEmploymentVerificationResponse get(Candidate candidate);

    CandidateEmploymentVerificationResponse update(
            Candidate candidate,
            CandidateEmploymentVerificationRequest request
    );

    CandidateEmploymentVerificationResponse triggerVerification(
            Candidate candidate
    );
}