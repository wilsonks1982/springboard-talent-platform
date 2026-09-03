package org.wilsonks.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.wilsonks.backend.domain.Candidate;
import org.wilsonks.backend.domain.enums.JobSearchStatus;
import org.wilsonks.backend.dto.requests.CandidateBasicProfileRequest;
import org.wilsonks.backend.repository.CandidatesRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidateBasicProfileService {

    private final CandidatesRepository candidatesRepository;

    @Transactional(readOnly = true)
    public Candidate getCandidate(UUID userId) {
        return candidatesRepository.findByUserUserId(userId);
    }

    public Candidate update(UUID userId, CandidateBasicProfileRequest request) {
        validateEmploymentStatus(request);

        Candidate candidate = candidatesRepository.findByUserUserId(userId);

        candidate.setFullName(request.fullName().trim());
        candidate.setPhone(request.phone().trim());
        candidate.setCity(request.city().trim());
        candidate.setStateCountry(request.stateCountry().trim());
        candidate.setLinkedinUrl(clean(request.linkedinUrl()));
        candidate.setCurrentlyEmployed(request.currentlyEmployed());

        if (Boolean.TRUE.equals(request.currentlyEmployed())) {
            candidate.setJobSearchStatus(request.jobSearchStatus());
            candidate.setNonEmploymentReason(null);
        } else {
            candidate.setNonEmploymentReason(request.nonEmploymentReason());
            candidate.setJobSearchStatus(null);
        }

        return candidatesRepository.save(candidate);
    }

    private void validateEmploymentStatus(CandidateBasicProfileRequest request) {
        if (Boolean.TRUE.equals(request.currentlyEmployed()) && request.jobSearchStatus() == null) {
            throw new IllegalArgumentException("Job search status is required when currently employed.");
        }

        if (Boolean.FALSE.equals(request.currentlyEmployed()) && request.nonEmploymentReason() == null) {
            throw new IllegalArgumentException("Non-employment reason is required when not currently employed.");
        }
    }

    private String clean(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isBlank() ? null : trimmed;
    }
}